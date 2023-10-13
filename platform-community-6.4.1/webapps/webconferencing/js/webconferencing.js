/**
 * Web Conferencing integration for eXo Platform.
 */
(function($, cCometD) {
	"use strict";

	// ******** Utils ********

	var getRandomArbitrary = function(min, max) {
	  return Math.floor((Math.random() * (max - min - 1) + min) + 1);
	};

	/**
	 * Universal client ID for use in logging, services connectivity and related cases.
	 */
	var clientId = "" + getRandomArbitrary(100000, 999998);
	
	var errorText = function(err) {
		if (err) {
			if (err.message) {
				return err.message;
			} else if (err.name) {
				return err.name;
			} else if (err.toString && typeof err.toString === "function") {
				try {
					return err.toString();
				} catch(e) {
					// ignore this
				}
			}			
		}
		return err;
	};
	
	var tryParseJson = function(message) {
		var src = message.data ? message.data : (message.error ? message.error : message.failure); 
		if (src) {
			try {
				if (typeof src === "string" && (src.startsWith("{") || src.startsWith("["))) {
					return JSON.parse(src);					
				}
			} catch(e) {
				log.debug("Error parsing '" + src + "' as JSON: " + e, e);
			}				
		}
		return src;
	};
	
	var cometdError = function(response) {
		var msg = "[" + response.id + "] ";
		if (response.channel) {
			msg += response.channel + " ";
		} else if (response.failure && response.failure.message && response.failure.message.channel) {
			msg += response.failure.message.channel + " ";
		}
		if (response.error) {
			msg += response.error + " ";
		}
		if (response.failure) {
			msg += response.failure.reason + " ";
		}
		if (response.data) {
			msg += response.data;
		}
		return msg;
	};
	
	// CometD transport bus
	var cometd, cometdContext;
	
	var cometdParams = function(params) {
		return $.extend(params, cCometD.eXoSecret, cometdContext);
	};
	
	/**
	 * Spools buffered logs to CometD channel.
	 */
	function LogSpooler() {
		var lastMessage;
		var buff = [];
		
		var flush = function() {
			if (buff.length > 0) {
				if (cometd) {
					var bucket = buff; 
					buff = [];
					// spool in CometD batch
					try {
						cometd.batch(function() {
							for (var i=0; i<bucket.length; i++) {
								var msg = bucket[i];
								cometd.remoteCall("/webconferencing/logs", msg, function(response) {
									var result = tryParseJson(response);
									if (!response.successful) {
										log.trace("ERROR: Failed to send log message to remote spooler", cometdError(response));
									}
								});
							}
						});
					} catch(err) {
						log.trace("ERROR: Failed to send log messages to remote spooler (in CometD batch of " + bucket.length + " logs)", err);
					}
				} else if (buff.length > 100) {
					log.trace("WARNING: CometD not available. Log cannot be spooled remotely and will be cut to avoid memory leak");
					buff = buff.slice(20);
				}
			}
		};
		
		var spoolerJob;
		var activate = function() {
			if (buff.length > 10) {
				flush();
			}
			if (!spoolerJob) {
				spoolerJob = setInterval(function() { 
					flush();
				}, 10000);
				setTimeout(function() { 
					clearInterval(spoolerJob);
					spoolerJob = null;
					flush();
				}, 150000);				
			}
		};
		
		var windowListener = function(e) {
			flush();
		};
		
		// We attempt to save all logs on page close
		$(window).bind("beforeunload", windowListener);
		$(window).bind("unload", windowListener);
		
		this.add = function(msg) {
			lastMessage = msg;
			buff.push(msg);
			activate();
		};
		
		this.getLastMessage = function() {
			return lastMessage;
		};
	}
	
	/**
	 * Singleton spooler used by all loggers.
	 */
	var logSpooler = new LogSpooler();
	
	/**
	 * Logging to browser console and optionally (if enabled) spool the log to remote server.
	 */
	function Logger() {
		
		var providerType = null;
		var prefix = null;
		var remote = false;
		
		// Private methods
		var setPrefix = function(newVal) {
			prefix = newVal ? newVal : null;
		};
		
		var logRemote = function(level, message, date) {
			if (remote) {
				var data;
				if (typeof message === "function") {
					data = message();
					if (typeof data === "string") {
						data = {
							message : msg
						};
					}
				} else if (typeof message === "string") {
					data = {
						message : message
					};
				} else {
					data = message;
				}
				var msg = cometdParams({
					data : data,
					level : level,
					prefix : prefix,
					provider : providerType,
					timestamp : date
				});
				logSpooler.add(msg);
			} // else, remote spooler not set			
		};
		
		var toLog = function(level, msg, err, localOnly) {
			// Log to browser console and remotely when remote service become available.
			// If err is null it means no error given, otherwise we try extract a message from it 
			var msgLine = msg;
			if (err) {
				msgLine += ". Error: ";
				if (err.name || err.message) {
					if (err.name) {
						msgLine += "[" + err.name + "] ";
					}
					if (err.message) {
						msgLine += err.message;
					}
				} else {
					msgLine += (typeof err === "string" ? err : JSON.stringify(err) 
								+ (err.toString && typeof err.toString === "function" ? "; " + err.toString() : ""));
				}
			} else if (err !== null && typeof err !== "undefined") {
				msgLine += ". Error: '" + err + "'";
			}
			var msgDate = new Date().toISOString();
			if (typeof console !== "undefined" && typeof console.log === "function") {
				var levelPad = (level.toUpperCase() + "     ").slice(0, 5);
				var localPrefix = "[";
				if (providerType) {
					localPrefix += providerType; 
				}
				if (prefix) {
					if (localPrefix.length > 1) {
						localPrefix += ".";
					}
					localPrefix += prefix; 
				}
				if (localPrefix.length == 1) {
					localPrefix += "???";
				}
				localPrefix += "_" + clientId + "]";
				console.log("| " + levelPad + " | " + localPrefix + " " + msgLine + " -- " + msgDate);
				if (err && err.stack) {
					console.log(err.stack);
				}
			}
			if (!localOnly) {
				logRemote(level, msgLine, msgDate);
			}
		};
		
		var buildMessageRef = function(msg, user) {
			return (user ? user.id + "-" : "???-") + clientId + "-" + msg.timestamp;
		};
		
		// It's a logger that will be returned to user code (public methods).
		function Client() {
			
			/**
			 * Return last message reference in remote log or null if nothing available.
			 */
			this.lastMessageRef = function() {
				var msg = logSpooler.getLastMessage();
				if (msg && webConferencing) {
					return buildMessageRef(msg, webConferencing.getUser());
				}
				return null;
			};
			
			/**
			 * Sets text to use as a prefix (e.g. provider prefix).
			 */
			this.prefix = function(thePrefix) {
				setPrefix(thePrefix);
				return this;
			};
			
			/**
			 * Add info level message to user log.
			 */
			this.info = function(message, err) {
				toLog("info", message, err);
			};
			
			/**
			 * Add debug level message to user log.
			 */
			this.debug = function(message, err) {
				toLog("debug", message, err);
			};
			
			/**
			 * Add trace level message to user log.
			 */
			this.trace = function(message, err) {
				toLog("trace", message, err, true); // traces go to browser console only
			};
			
			/**
			 * Add warn level message to user log.
			 */
			this.warn = function(message, err) {
				toLog("warn", message, err);
			};
			
			/**
			 * Add error level message to user log. 
			 * If after-log callback present and it's a function, then it will be invoked with this message reference.
			 * A message reference useful to show it to end user and make the message quickly searchable in client logs
			 * by support/admin person.
			 */
			this.error = function(message, err, afterCallback) {
				toLog("error", message, err);
				if (typeof err === "function") {
					afterCallback = err;
				}
				var msg = logSpooler.getLastMessage();
				if (msg && webConferencing && typeof afterCallback === "function") {
					afterCallback(buildMessageRef(msg, webConferencing.getUser()));
				}
			};
			
			/**
			 * Add error level message to user log and show a popup to an user.
			 * The popup will show given title, message if given or extract it from the error, and logged error reference.
			 * A message reference useful to show it to end user and make the message quickly searchable in client logs
			 * by support/admin person.
			 */
			this.showError = function(logMessage, err, showTitle, showMessage) {
				toLog("error", logMessage, err);
				if (!showMessage && err) {
					showMessage = errorText(err);
				}
				var msgRef;
				var msg = logSpooler.getLastMessage();
				if (msg && webConferencing) {
					msgRef = buildMessageRef(msg, webConferencing.getUser());
				}
				showError(showTitle, showMessage, msgRef);
			};
		}
		
		var log;
		this.get = function() {
			if (!log) {
				log = new Client();
			}
			return log;
		};
		
		this.remoteLog = function(value) {
			remote = value;
			return this;
		};
		
		this.prefix = function(thePrefix) {
			// FYI such method also exists on Client (as setSpoller()), but it doesn't returns a 'this' object for chaining
			setPrefix(thePrefix);
			return this;
		};
		
		this.provider = function(theProvider) {
			// provider type will be used as a prefix or precede a user prefix if an one set.
			providerType = theProvider ? theProvider : null;
			return this;
		};
	}
	
	// core log not enabled for remote spooling until some provider will do this, see init()
	var log = new Logger().prefix("webconferencing").get();
	
	/** 
	 * Polyfill ECMAScript 2015's String.startsWith().
	 * */
	if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
	  };
	}
	
	var pageBaseUrl = function(theLocation) {
		if (!theLocation) {
			theLocation = window.location;
		}

		var theHostName = theLocation.hostname;
		var theQueryString = theLocation.search;

		if (theLocation.port) {
			theHostName += ":" + theLocation.port;
		}

		return theLocation.protocol + "//" + theHostName;
	};
  
	// ******** UI utils **********

	var messages; // will be initialized by WebConferencing.init()

	var message = function(key) {
		return messages ? messages["webconferencing." + key] : "";
	};
	
	// UI messages
	// Used to show immediate notifications in top right corner.
	// This functionality requires pnotifyJQuery and jqueryui CSS.
	var NOTICE_WIDTH = "380px";
  
  var isIOS = /iPhone|iPod|iPad/.test(navigator.userAgent);
  var isAndroid = /Android/.test(navigator.userAgent);
  var isWindowsMobile = /IEmobile|WPDesktop|Windows Phone/i.test(navigator.userAgent) || /WM\s*\d.*.Edge\/\d./i.test(navigator.userAgent);
  
	/**
	 * Show notice to user. Options support "icon" class, "hide", "closer" and "nonblock" features.
	 */
	var notice = function(type, title, text, options) {
		var noticeOptions = {
			title : title,
			text : text,
			type : type,
			icon : "picon " + ( options ? options.icon : ""),
			hide : options && typeof options.hide != "undefined" ? options.hide : false,
			delay : options && typeof options.delay != "undefined" ? options.delay : undefined,
			closer : options && typeof options.closer != "undefined" ? options.closer : true,
			sticker : false,
			opacity : .85,
			shadow : true,
			width : options && options.width ? options.width : NOTICE_WIDTH,
			nonblock : options && typeof options.nonblock != "undefined" ? options.nonblock : false,
			nonblock_opacity : .45,
			addclass : options && options.addclass ? options.addclass : "",
			cornerclass : options && options.cornerclass ? options.cornerclass : "",
			after_init : function(pnotify) {
				if (options && typeof options.onInit == "function") {
					options.onInit(pnotify);
				}
			}
		};
		return $.pnotify(noticeOptions);
	};

	/**
	 * Show error notice to user. Error will stick until an user close it.
	 */
	var noticeError = function(title, text, onInit) {
		return notice("error", title, text, {
			icon : "picon-dialog-error",
			hide : false,
			delay : 0,
			onInit : onInit
		});
	};

	/**
	 * Show info notice to user. Info will be shown for 8sec and hidden then.
	 */
	var noticeInfo = function(title, text, onInit) {
		return notice("info", title, text, {
			hide : true,
			delay : 8000,
			icon : "picon-dialog-information",
			onInit : onInit
		});
	};

	/**
	 * Show warning notice to user. Info will be shown for 8sec and hidden then.
	 */
	var noticeWarn = function(title, text, onInit) {
		return notice("exclamation", title, text, {
			hide : true,
			delay : 30000,
			icon : "picon-dialog-warning",
			onInit : onInit
		});
	};
	
	/**
	 * Show warning notice bar to user. Info will be shown for 8sec and hidden then.
	 */
	var noticeWarnBar = function(title, text, onInit) {
		return notice("exclamation", title, text, {
			hide : false,
			delay : 30000,
			icon : "picon-dialog-warning",
			width : "100%",
			addclass : "stack-bar-top",
      cornerclass : "",
			onInit : onInit
		});
	};
	
	var htmlRegx = /<[a-z][\s\S]*>/i;
	var appendContent = function($target, content) {
		if (typeof content === "object" || typeof content === "function") {
			$target.append(content); // assuming supported by jQuery object or function 
		} else if (typeof content === "string") {
			if (htmlRegx.test(content)) {
				$target.html(content);
			} else {
				$target.text(content);
			}
		} else if (content) {
			$target.text(content);
		} // else nothing can append
		return $target.children();
	};
	
	var dialog = function(title, messageText, type, messageRef) {
		var loader = $.Deferred();
		var $dialog = $("#webconferencing-dialog");
		if ($dialog.length == 0) {
			$dialog = $("<div class='uiPopupWrapper' id='webconferencing-dialog' style='display: none;'><div>");
			$(document.body).append($dialog);
			$dialog.load("/webconferencing/ui/dialog.html", function(content, textStatus) {
				if (textStatus == "success" || textStatus == "notmodified") {
					loader.resolve($dialog);
				} else {
					loader.reject(content);
				}
			});
		} else {
			loader.resolve($dialog);
		}
		var process = $.Deferred();
		loader.done(function($dialog) {
			process.progress($dialog);
			if (title) {
				appendContent($dialog.find(".popupTitle"), title);
			}
			if (messageText) {
				appendContent($dialog.find(".contentMessage"), messageText);
			}
			var $ref = $dialog.find(".contentReference");
			if (messageRef) {
				$ref.text(messageRef); // replace everything 
				$ref.show();
			} else {
				$ref.hide();
			}
			var $actions = $dialog.find(".popupActions");
			var $okButton = $actions.find(".okButton");
			var $cancelButton = $actions.find(".cancelButton");
			var $icon = $dialog.find(".popupIcon");
			if (typeof type === "string") {
				// Clean previous classes
				$icon.find("i").attr("class", "").addClass("uiIcon" + type.charAt(0).toUpperCase() + type.slice(1));
				if (type.indexOf("Error") > 0 || type.indexOf("Warn") > 0 || type.indexOf("Info") > 0) {
					$cancelButton.hide();
				}
			} else {
				// otherwise don't show any icon
				$icon.hide();
			}
			$okButton.text(message("ok"));
			$okButton.click(function() {
				process.resolve("ok");
			});
			$cancelButton.text(message("cancel"));
			$cancelButton.click(function() {
				process.resolve("cancel");
			});
			process.always(function() {
				$dialog.hide();
			});
			//
			$dialog.show();
		}).fail(function(err) {
			process.reject(err);
		});
		return process.promise();
	};
	
	var showError = function(title, text, errorRef) {
		return dialog(title, text, "ColorError", errorRef ? message("errorReference") + " " + errorRef : null);
	};
	
	var showWarn = function(title, text) {
		return dialog(title, text, "ColorWarning");
	};
	
	var showInfo = function(title, text) {
		return dialog(title, text, "Information");
	};
	
	var showConfirm = function(title, text) {
		return dialog(title, text, "Question");
	};

	// ******** REST services ********
	var prefixUrl = pageBaseUrl(location);

	var initRequest = function(request) {
		var process = $.Deferred();

		// stuff in textStatus is less interesting: it can be "timeout",
		// "error", "abort", and "parsererror",
		// "success" or smth like that
		request.fail(function(jqXHR, textStatus, err) {
			if (jqXHR.status != 309) {
				// check if response isn't JSON
				var data;
				try {
					data = $.parseJSON(jqXHR.responseText);
					if ( typeof data == "string") {
						// not JSON
						data = jqXHR.responseText;
					}
				} catch(e) {
					// not JSON
					data = jqXHR.responseText;
				}
				// in err - textual portion of the HTTP status, such as "Not
				// Found" or "Internal Server Error."
				process.reject(data, jqXHR.status, err, jqXHR);
			}
		});
		// hacking jQuery for statusCode handling
		var jQueryStatusCode = request.statusCode;
		request.statusCode = function(map) {
			var user502 = map[502];
			if (!user502) {
				map[502] = function() {
					// treat 502 as request error also
					process.reject("Bad gateway", 502, "error");
				};
			}
			return jQueryStatusCode(map);
		};

		request.done(function(data, textStatus, jqXHR) {
			process.resolve(data, jqXHR.status, textStatus, jqXHR);
		});

		// custom Promise target to provide an access to jqXHR object
		var processTarget = {
			request : request
		};
		return process.promise(processTarget);
	};
	
	var getUserInfoReq = function(userId) {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/webconferencing/user/" + userId
		});
		return initRequest(request);
	};

	var getSpaceInfoReq = function(spaceId) {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/webconferencing/space/" + spaceId
		});
		return initRequest(request);
	};

  var getSpaceEventInfoReq = function(spaceId, participants, spaces) {
    var q = "";
    if (participants) {
      q += "participants=" + encodeURIComponent(participants);
    }
    if (spaces) {
      if (q.length == 0) {
        q += "?";
      } else {
        q += "&";
      }
      q += "?spaces=" + encodeURIComponent(spaces);
    }
    var request = $.ajax({
      async : true,
      type : "GET",
      url : prefixUrl + "/portal/rest/webconferencing/space-event/" + spaceId + q
    });
    return initRequest(request);
  };
	
	var getRoomInfoReq = function(roomId, title, members) {
		var q = "";
		if (title) {
			q += "?title=" + encodeURIComponent(title); 
		}
		if (members && members.length > 0) {
			if (q.length == 0) {
				q += "?";
			} else {
				q += "&";
			}
			q += "members=" + encodeURIComponent(members.join(";"));
		}
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/webconferencing/room/" + roomId + q
		});
		return initRequest(request);
	};
	
	var getProvidersConfig = function() {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/webconferencing/providers/configuration"
		});
		return initRequest(request);
	};
	
	var getProviderConfig = function(type) {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/webconferencing/provider/" + type + "/configuration"
		});
		return initRequest(request);
	};
	
	var postProviderConfig = function(type, active) {
		var request = $.ajax({
			async : true,
			type : "POST",
			url : prefixUrl + "/portal/rest/webconferencing/provider/" + type + "/configuration",
			data : {
				active : active
			}
		});
		return initRequest(request);
	};
	
	var getUserStatus = function(userId) {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : prefixUrl + "/portal/rest/state/status/" + userId
		});
		return initRequest(request);
	};
	
	var serviceGet = function(url, data, headers) {
		var request = $.ajax({
			async : true,
			type : "GET",
			url : url,
			dataType : "json",
			data : data ? data : undefined,
			headers : headers ? headers : undefined
		});
		return initRequest(request);
	};
	
	var prepareUser = function(user) {
		user.title = user.firstName + " " + user.lastName;
	};	
	
	/**
	 * WebConferencing core class.
	 */
	function WebConferencing() {

		var self = this;
		
		// ******** Context ********
		var contextInitializer = $.Deferred();

		var currentUser, currentSpaceId, currentRoomTitle;

		// Providers
		var providers = []; // loaded providers
		var providersConfig; // will be assigned in init()
		var providersInitializer = {}; // map managed by getProvider() and initProvider()
		
		this.errorText = errorText;
		
		var contextId = function(context) {
			return context.userId ? context.userId : (context.spaceId ? context.spaceId : context.roomName);
		};
		this.contextId = contextId;
		
		var initContext = function() {
			var context = {
				currentUser : currentUser,
				isIOS : isIOS,
				isAndroid : isAndroid,
				isWindowsMobile : isWindowsMobile,
				details : function() {
					// this method should not be used in this context, thus keep it for unification only
					var data = $.Deferred();
					data.resolve([], context.space.id, context.space.title);
					return data.promise();
				}
			};
			if (currentSpaceId) {
				context.spaceId = currentSpaceId; 
				context.isSpace = true;
				context.isGroup = true;
			} else {
				context.spaceId = null;
				context.isSpace = false;
				context.isGroup = false;
			}
			if (currentRoomTitle) {
				context.roomTitle = currentRoomTitle;
				context.isRoom = true; 
			} else {
				context.roomTitle = null;
				context.isRoom = false;
			}
			return context;
		};

		var providerConfig = function(type) {
			for (var i=0; i<providersConfig.length; i++) {
				var conf = providersConfig[i];
				if (conf && conf.type == type) {
					return conf;
				}
			}
			return null;
		};
		
		var initProvider = function(provider) {
			// Returned promise will be resolved with a provider instance and boolean flag indicating was the provider 
			// successfully initialized or not. The promise will be rejected if provider not configured (should not happen).
			var initializer = providersInitializer[provider.getType()]; // deferred may be added by getProvider()
			if (!initializer) {
				initializer = providersInitializer[provider.getType()] = $.Deferred();
			}
			var conf = providerConfig(provider.getType());
			if (conf) {
				provider.isInitialized = false;
				initializer.progress(provider); // here is a provider that has a configuration
				if (conf.active) {
					if (provider.init && provider.hasOwnProperty("init")) {
						provider.init(initContext()).done(function() {
							provider.isInitialized = true;
							log.debug("Initialized call provider: " + provider.getType());
							initializer.resolve(provider, true);
						}).fail(function() {
							log.debug("Skipped or cannot initialize call provider: " + provider.getType());
							initializer.resolve(provider, false);
						});
					} else {
						log.debug("Marked call provider as Initialized: " + provider.getType());
						provider.isInitialized = true;
						initializer.resolve(provider, true);
					}
				} else {
					log.debug("CANCELED initialization of not active call provider '" + provider.getType() + "'");
					initializer.resolve(provider, false);
				}
			} else {
				log.warn("CANCELED initialization of not configured call provider '" + provider.getType() + "'");
				initializer.reject(provider.getType() + " " + message("notConfigured"));
			}
			return initializer.promise();
		};
		
    /** 
     * Returns the context details function in accordance with context.
     */
    var contextDetails = function(context) {
      return function() {
        var details = $.Deferred();
        if (context.isGroup) {
          if (context.isSpace) {
            getSpaceInfoReq(context.spaceId).done(function(space) {
              details.resolve(space);
            }).fail(function(err) {
              log.trace("Error getting space info " + context.spaceId + " for chat context", err);
              details.reject(err);
            });
          } else if (context.isRoom) {
            let roomUsers = context.roomParticipants();
            if (roomUsers.length > 0) {
              getRoomInfoReq(context.roomId, context.roomTitle, roomUsers).done(function(info) {
                details.resolve(info);
              }).fail(function(err) {
                log.trace("Error getting Chat room info " + context.roomName + "/" + context.roomId + " for chat context", err);
                details.reject(err);
              });
            } else {
              const msg = "Error getting Chat room users for " + context.roomId + " - empty room in the context";
              log.trace(msg + " roomUsers: " + roomUsers);
              details.reject(msg);
            }
          } else {
            details.reject("Unexpected context chat type for " + context.roomTitle);
          }
        } else {
          // roomId is an user name for P2P chats
          getUserInfoReq(context.roomId).done(function(user) {
            details.resolve(user);
          }).fail(function(err) {
            log.trace("Error getting user info " + context.roomId + " for chat context", err);
            details.reject(err);
          });
        }
        return details.promise();
      }
    };

    var chatContext = function(chat) {
      var context;
      if (chat.selectedContact) {
        var roomTitle = chat.selectedContact.fullName;
        var isUser = chat.selectedContact.type === "u"; // roomId is an user name in system;
        var isSpace = chat.selectedContact.type === "s"; // roomId && roomId.startsWith("space-");
        var isRoom = chat.selectedContact.type === "t"; // roomId && roomId.startsWith("team-");
        var isGroup = isSpace || isRoom;
        // roomName from its title - it is a logic used in Chat, so reuse it here:
        var roomName = isSpace ? chat.selectedContact.prettyName : roomTitle.toLowerCase().split(" ").join("_");
        context = {
          currentUser: currentUser,
          roomId: chat.selectedContact.user,
          roomName: roomName, // has no sense for team rooms, but for spaces it's pretty_name
          roomTitle: roomTitle,
          isGroup: isGroup,
          isSpace: isSpace,
          isRoom: isRoom,
          isUser: isUser,
          isIOS: isIOS,
          isAndroid: isAndroid,
          isWindowsMobile: isWindowsMobile,
          roomParticipants: () => {
            return chatRoomParticipants(chat.selectedContact.participants, chat.userSettings.username);
          }
        };
        if (isSpace) {
          context.spaceId = roomName;
        }
        if (isUser) {
          context.userId = chat.selectedContact.user;
        }
        context.details = contextDetails(context);
      } else {
        // If no room, then resolve with 'empty' context
        context = {
          currentUser: currentUser,
          isIOS: isIOS,
          isAndroid: isAndroid,
          isWindowsMobile: isWindowsMobile
        };
      }
      return context;
    };
    
    /** 
     * Build an array of chat room all members (including the current user). 
     */
    var chatRoomParticipants = function(chatParticipants, chatUsername) {
      const unames = [];
      let addUser = true;
      if (!chatUsername && eXo.chat.userSettings) {
        chatUsername = eXo.chat.userSettings.username; // this will work only on Chat pages (incl. mini chat).
      }
      if (chatParticipants) {
        chatParticipants.forEach(p => {
          if (p && p.name && p.name != "null") {
            unames.push(p.name);
            if (chatUsername && p.name === chatUsername) {
              addUser = false;
            }
          }
        });
      }
      if (chatUsername && addUser) {
        unames.push(chatUsername);
      }
      return unames;  
    };

    /** 
     * Create the chat context from events target (selected room data)
     * target - the data from the exo-chat-selected-contact-changed event
     */
    var chatContextForRoom = function(target, chatUsername) {
      var context;
      if (target) {
        if (target.detail) {
          var roomTitle = target.detail.fullName;
          var isUser = target.detail.type === "u"; // roomId is an user name in system;
          var isSpace = target.detail.type === "s"; // roomId && roomId.startsWith("space-");
          var isRoom = target.detail.type === "t"; // roomId && roomId.startsWith("team-");
          var isGroup = isSpace || isRoom;
          // roomName from its title - it is a logic used in Chat, so reuse it here:
          var roomName = roomTitle.toLowerCase().split(" ").join("_");
          context = {
            currentUser: currentUser,
            roomId: target.detail.user,
            roomName: roomName, // has no sense for team rooms, but for spaces it's pretty_name
            roomTitle: roomTitle,
            isGroup: isGroup,
            isSpace: isSpace,
            isRoom: isRoom,
            isUser: isUser,
            isIOS: isIOS,
            isAndroid: isAndroid,
            isWindowsMobile: isWindowsMobile,
            roomParticipants: () => {
              return chatRoomParticipants(target.detail.participants, chatUsername);
            }
          };
          if (isSpace) {
            context.spaceId = roomName;
          }
          if (isUser) {
            context.userId = target.detail.user;
          }
          context.details = contextDetails(context);
        } else {
          log.warn("No details provided for the selected contact in chat room");
        }
      } else {
        log.warn("No target provided for chat room");
      }
      if (!context) {
        // If no room or its details, then resolve with 'empty' context
        context = {
          currentUser: currentUser,
          isIOS: isIOS,
          isAndroid: isAndroid,
          isWindowsMobile: isWindowsMobile
        };
      }
      return context;
    };
		
		var userContext = function(userId) {
			var context = {
				currentUser : currentUser,
				userId : userId,
				isGroup : false,
				isSpace : false,
				isRoom : false,
				isUser : true,
				isIOS : isIOS,
				isAndroid : isAndroid,
				isWindowsMobile : isWindowsMobile,
				details : function() {
					const user = getUserInfoReq(userId);
					user.fail(function(err) {
						log.trace("Error getting user info " + userId + " for user context", err);
					});
					return user;
				}
			};
			return context;
		};

		var spaceContext = function(spaceId) {
			var context = {
				currentUser : currentUser,
				spaceId : spaceId,
				isGroup : true,
				isSpace : true,
				isRoom : false,
				isUser : false,
				isIOS : isIOS,
				isAndroid : isAndroid,
				isWindowsMobile : isWindowsMobile,
				details : function() {
					const	space = getSpaceInfoReq(spaceId);
			  	space.fail(function(err) {
			  		log.trace("Error getting space info " + spaceId + " for space context", err);
					});	
					return space;
				}
			};
			return context;
		};

    var spaceEventContext = function(spaceId, participants, spaces) {
      var context = {
        currentUser : currentUser,
        spaceId : spaceId,
        isSpaceEvent : true,
        isGroup : true,
        isSpace : false,
        isRoom : false,
        isUser : false,
        isIOS : isIOS,
        isAndroid : isAndroid,
        isWindowsMobile : isWindowsMobile,
        details : function() {
          const	space = getSpaceEventInfoReq(spaceId, participants, spaces);
          space.fail(function(err) {
            log.trace("Error getting space event info " + spaceId + " for space event context", err);
          });
          return space;
        }
      };
      return context;
    };
		
    /**
     * Format start/end dates in the call info from Date instance to String in ISO 8601.
     */
    var formatCallDates = function(callInfo) {
      // Fortmat dates to ISO 8601
      if (isDate(callInfo.startDate)) {
        callInfo.startDate = callInfo.startDate.toISOString();
      } else {
        callInfo.startDate = undefined;
      }
      if (isDate(callInfo.endDate)) {
        callInfo.endDate = callInfo.endDate.toISOString();
      } else {
        callInfo.endDate = undefined;
      }
    };
		
    /**
     * DEPRECATED method. It's referd by the documentaiton and samples - need clean in a next release.
     */
		this.update = function() {
			// Do nothing
		};

		/**
		 * Initialize context
		 */
		this.init = function(user, context) {
			if (context) {
				messages = context.messages;
				if (user) {
					currentUser = user;
					currentUser.clientId = clientId;
					providersConfig = context.providersConfig;
					prepareUser(currentUser);
					if (context.spaceId) {
						currentSpaceId = context.spaceId;
					} else {
						currentSpaceId = null;
					}
					if (context.roomTitle) {
						currentRoomTitle = context.roomTitle;
					} else {
						currentRoomTitle = null; 
					}
					
					// init CometD connectivity
					if (context.cometdPath) {
						cCometD.configure({
							"url": prefixUrl  + context.cometdPath,
							"exoId": currentUser.id,
							"exoToken": context.cometdToken,
							"maxNetworkDelay" : 30000,
							"connectTimeout": 60000
						});
						cometd = cCometD;
						cometdContext = {
							"exoContainerName" : context.containerName,
							"exoClientId" : currentUser.clientId
						};
						cometd.onListenerException = function(exception, subscriptionHandle, isListener, message) {
					    // Uh-oh, something went wrong, disable this listener/subscriber
					    // Object "this" points to the CometD object
							log.error("CometD listener exception: " + exception + " (" + subscriptionHandle + ") isListener:" + isListener + " message:" + message);
					    if (isListener) {
					        this.removeListener(subscriptionHandle);
					    } else {
					        this.unsubscribe(subscriptionHandle);
					    }
						}
						
						// Check if need core log remote spooling. Cometd required also for remote logger.
						if (providersConfig && cometd) {
							for (var i=0; i<providersConfig.length; i++) {
								var conf = providersConfig[i];
								if (conf && conf.logEnabled) {
									// core log also should be spooled remotely from this moment, it contains info important for 
									// monitoring a provider functionality
									log = new Logger().prefix("webconferencing").remoteLog(true).get();
									break;
								}
							}
						}

						log.debug("User initialized in Web Conferencing: " + currentUser.id + ". Lang: " + (navigator.language || navigator.userLanguage || navigator.browserLanguage) 
									+ ". Local date: " + new Date().toLocaleString() + ". Browser: " + navigator.userAgent);
					} else {
						log.warn("CometD not found in context settings");
					}
				
					contextInitializer.resolve();
					// also init registered providers
					for (var i = 0; i < providers.length; i++) {
						var p = providers[i];
						if (!p.isInitialized) {
							initProvider(p);
						}
					}
				}
			}
		};
	
		/**
		 * eXo user running current session.
		 */
		this.getUser = function() {
			return currentUser;
		};
		
		/**
		 * A space currently open in a page that runs this script. 
		 * It is not a space of the context (call button etc.) - use contextual spaceId instead.
		 */
		this.getCurrentSpaceId = function() {
			return currentSpaceId;
		};
		
		/**
		 * A room currently open in a page that runs this script. 
		 * It is not a room of the context (call button etc.) - use contextual roomTitle or roomName instead.
		 * Note that this value will be initialized on Chat app page, but may not set in mini chat or any other Platform page.  
		 */
		this.getCurrentRoomTitle = function() {
			return currentRoomTitle;
		};
		
		this.getBaseUrl = function() {
			return pageBaseUrl();
		};
		
		/**
		 * Add provider to the scope.
		 */
		this.addProvider = function(provider) {
			// A Provider should support set of API methods:
			// * getType() - major call type name
			// * getSupportedTypes() - all supported call types
			// * getTitle() - human-readable title for UI
			// * callButton(context) - provider should offer an implementation of a Call button and call invoker in it, 
			// it returns a promise, when it resolved there will be a JQuery element of a button(s) container. 
			//
			// A provider may support following of API methods:
			// * init() - will be called when web conferencing user will be initialized in this.init(), this method returns a promise
			
			// TODO avoid duplicates, use map like?
			if (provider.getSupportedTypes && provider.hasOwnProperty("getSupportedTypes") && provider.getTitle && provider.hasOwnProperty("getTitle")) {
				if (provider.callButton && provider.hasOwnProperty("callButton")) {
					// we'll also care about providers added after Web Conferencing initialization, see this.init()
					providers.push(provider);
					log.trace("Added call provider: " + provider.getType() + " (" + provider.getTitle() + ")");
					if (currentUser) {
						if (!provider.isInitialized) {
							initProvider(provider);
						} else {
							log.trace("Already initialized provider: " + provider.getType());
						}
					} else {
						log.trace("Current user not set, later will try initialized provider: " + provider.getType());
					}
				} else {
					log.warn("Not compartible provider object (method callButton() required): " + provider.getTitle());
				}
			} else {
				log.warn("Not a provider object: " + JSON.stringify(provider));
			}
		};
		
		/**
		 * Return a provider registered by the type. This method doesn't check if provider was successfully configured and initialized.
		 */
		this.findProvider = function(type) {
			for (var i = 0; i < providers.length; i++) {
				var p = providers[i];
				var ptypes = p.getSupportedTypes();
				for (var ti = 0; ti < ptypes.length; ti++) {
					if (ptypes[ti] === type) {
						return p;
					}					
				}
			}
			return null;
		};
		
		/**
		 * Return a promise that will be resolved when a provider will be loaded (may be never if wrong name).
		 */
		this.getProvider = function(type) {
			var initializer = providersInitializer[type]; // deferred may be added by initProvider()
			if (!initializer) {
				initializer = providersInitializer[type] = $.Deferred();
			}			
			return initializer.promise();
		};
		
		/**
		 * Helper method to show call popup according the Web Conferencing spec.
		 */
		this.showCallPopup = function(url, name) {
			// FYI Core adopted from Video Calls v1 notif.js
			var aw = window.screen.availWidth; // screen.width
			var ah = window.screen.availHeight; // screen.height
			var w, h, top, left;
			if (aw > 760) {
				w = Math.floor(aw * 0.8);
			  h = Math.floor(ah * 0.8);
			  left = (aw/2)-(w/2);
			  top = (ah/2)-(h/2);	
			} else {
				w = aw;
			  h = ah;
			  left = 0;
			  top = 0;
			}
		  var callWindow = window.open(url, name, "toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,"
		  			+ "width=" + w + ",height=" + h + ",top=" + top + ",left=" + left);
		  if (callWindow) {
		  	callWindow.focus();
		  }
		  return callWindow;
		};
    
    /**
     * Helper method to show call window (standard window or tab of the browser by default).
     */
    this.showCallWindow = function(url, name) {
      var callWindow = window.open(url, name);
      if (callWindow) {
        callWindow.focus();
      }
      return callWindow;
    };
		
		/** 
		 * Helper method to obtain the user IM account of given type.
		 */
		this.imAccount = function(user, type) {
			var ims = user.imAccounts[type];
			if (ims && ims.length > 0) {
				// TODO work with multiple IMs of same type
				return ims[0]; 
			} else {
				return null;
			}
		};
		
		// TODO move these calls to CometD
		this.getUserInfo = getUserInfoReq; 
		this.getSpaceInfo = getSpaceInfoReq;
		this.getRoomInfo = getRoomInfoReq;
		
		/**
		 * Get registered call from server side database.
		 */
		this.getCall = function(id) {
			if (cometd) {
				var process = $.Deferred();
				var callProps = cometdParams({
					command : "get",
					id : id
				});
				cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
					var result = tryParseJson(response);
					if (response.successful) {
					  process.resolve(result);
					} else {
						process.reject(result);
					}
				});
				return process.promise();
			} else {
				log.trace("Getting call requires CometD. Was call: " + id);
				return $.Deferred().reject("CometD required").promise();
			}
		};
    
    /**
     * Find a call ID by given call link (URL) and a provider. 
     * If no provider given, this method will go over all providers to find a first matching call.
     */
    this.findCallId = function(link, providerName) {
      var process = $.Deferred();
      function findProviderCallId(link, provider) {
        if (provider.isInitialized && provider.linkSupported && provider.findCallId && provider.hasOwnProperty("findCallId")) {
          return provider.findCallId(link);
        }
        return null;
      }
      if (providerName && typeof providerName === "string") {
        self.getProvider(providerName).then(provider => {
          const callId = findProviderCallId(link, provider);
          if (callId) {
            process.resolve(callId);
          } else {
            process.reject("Cannot find call ID for link: " + link + " and provider: " + providerName);
          }
        }).catch(err => process.fail(err));
      } else {
        self.getAllProviders().then(providers => {
          let callId = null; 
          for (const provider of providers) {
            callId = findProviderCallId(link, provider);
            if (callId) {
              process.resolve(callId);
              break;
            }
          }
          if (!callId) {
            process.reject("Cannot find call ID for link: " + link);
          }
        }).catch(err => process.fail(err));        
      }
      return process.promise();
    };
		
		/**
		 * Find identities by name in org service. Includes groups and users.
		 */
	  this.findIdentities = function(id, name) {
      if (cometd) {
        var process = $.Deferred();
        var callProps = cometdParams({
          id: id,
          name : name,
          command : "get_org_identities"
        });
        cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
          var result = tryParseJson(response);
          if (response.successful) {
            process.resolve(result);
          } else {
            process.reject(result);
          }
        });
        return process.promise();
      } else {
        log.trace("Finding identities requires CometD");
        return $.Deferred().reject("CometD required").promise();
      }
    };
		
    /**
     * Check if user is invited to the call by provided inviteId.
     * Retuns JSON {"allowed" : true} or {"allowed" : false}
     */
    this.checkInvite = function(id, inviteId, userId) {
      if (cometd) {
        var process = $.Deferred();
        var callProps = cometdParams({
          command : "check_invite",
          id : id,
          inviteId : inviteId
        });
        cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
          var result = tryParseJson(response);
          if (response.successful) {
            process.resolve(result);
          } else {
            process.reject(result);
          }
        });
        return process.promise();
      } else {
        log.trace("Check invite requires CometD. Was call: " + id);
        return $.Deferred().reject("CometD required").promise();
      }
    };
		
    /**
     * Update invites for the call.
     * Accepts array of invited users or groups in form of
     * [ {"id": "john", "type": "user"}, {"id" : "/platform/administrators", "type": "group"}]
     */
    this.updateInvites = function(id, invites) {
      if (cometd) {
        var process = $.Deferred();
        var callProps = cometdParams({
          command : "update_invites",
          id : id,
          invites : invites
        });
        cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
          var result = tryParseJson(response);
          if (response.successful) {
            process.resolve(result);
          } else {
            process.reject(result);
          }
        });
        return process.promise();
      } else {
        log.trace("Updating invites for the call requires CometD. Was call: " + id);
        return $.Deferred().reject("CometD required").promise();
      }
    };
		
    /**
     * Add guest to call.
     */
    this.addGuest = function(id, guestId) {
      if (cometd) {
        var process = $.Deferred();
        var callProps = cometdParams({
          command : "add_guest",
          id : id,
          guestId : guestId
        });
        cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
          var result = tryParseJson(response);
          if (response.successful) {
            process.resolve(result);
          } else {
            process.reject(result);
          }
        });
        return process.promise();
      } else {
        log.trace("Adding guests to the call requires CometD. Was call: " + id);
        return $.Deferred().reject("CometD required").promise();
      }
    };
		
	  /**
     * Update call participants in server side database.
     */
    this.updateParticipants = function(id, participants) {
      if (cometd) {
        var process = $.Deferred();
        var callProps = cometdParams({
          command : "update",
          id : id,
          participants : participants
        });
        cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
          var result = tryParseJson(response);
          if (response.successful) {
            process.resolve(result);
          } else {
            process.reject(result);
          }
        });
        return process.promise();
      } else {
        log.trace("Updating call requires CometD. Was call: " + id);
        return $.Deferred().reject("CometD required").promise();
      }
    };
		
		/**
		 * Update call state or its all information in the backend.
		 */
		this.updateCall = function(id, stateInfo) {
      let process = $.Deferred();
			if (cometd) {
        function processUpdateCall(id, state, info) {
          let callProps;
          if (info) {
            // Format dates to ISO 8601
            formatCallDates(info);
            callProps = cometdParams({
              command : "update",
              id : id,
              info : info
            });
          } else {
            callProps = cometdParams({
              command : "update",
              id : id,
              state : state
            });            
          }
          cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
            var result = tryParseJson(response);
            if (response.successful) {
              self.getProvider(result.providerType)
                .then(provider => {
                  if (provider.getCallUrl) {
                    result.url = provider.getCallUrl(id);
                  }
                  process.resolve(result);
                });
            } else {
              process.reject(result);
            }
          });
        }
				// Recognize method params: differentiate second param as a state string (to update only the call state) 
        // or a callInfo object to update the whole call
        if (stateInfo) {
          if (typeof stateInfo === "object") {
            processUpdateCall(id, null, stateInfo);
          } else if (typeof stateInfo === "string") {
            processUpdateCall(id, stateInfo, null);
          } else {
            stateInfo = null;   
          }
        } 
        if (!stateInfo) {
          log.trace("Updating call requires a state string or callInfo object");
          process.reject("Call update requires a state or information");
        }
      } else {
        log.trace("Updating call requires CometD");
        process.reject("CometD required");
      }
      return process.promise();
		};
		
		/**
		 * Remove call in server side database.
		 */
		this.deleteCall = function(id) {
			if (cometd) {
				var process = $.Deferred();
				var callProps = cometdParams({
					command : "delete",
					id : id
				});
				cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
					var result = tryParseJson(response);
					if (response.successful) {
					  process.resolve(result);
					} else {
						process.reject(result);
					}
				});
				return process.promise();
			} else {
				log.trace("Deleting call requires CometD. Was call: " + id);
				return $.Deferred().reject("CometD required").promise();
			}
		};

    /**
     * Check is the date correct.
     */
    function isDate(date) {
      return date && date instanceof Date && date.getTime() > 0;
    }
		
		/**
		 * Register call in server side database.
		 */
		this.addCall = function(id, callInfo) {
			let process = $.Deferred();
			if (cometd) {
        // Note: this function should be invoked once per addCall execution!
        function processAddCall(id, callInfo, start, callUrl) {
          // Format dates to ISO 8601
          formatCallDates(callInfo);
          let callProps = cometdParams($.extend(callInfo, {
            command : "create",
            start : start,
            id : id
          }));
          cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
            var result = tryParseJson(response);
            if (response.successful) {
              if (callUrl && !result.url) {
                result.url = callUrl; 
              }
              process.resolve(result);
            } else {
              process.reject(result);
            }
          });
        }
        // Recognize method params: if only a callInfo given as a first param, then generate a call ID by the provider
        if (id && typeof id === "object" && !callInfo) {
          callInfo = id;
          id = null;
        }
        if (!id && callInfo) {
          // If call ID not provided, we try to get it from the provider
          if (callInfo.provider) {
            self.getProvider(callInfo.provider).then(provider => {
              let context = null;
              if (callInfo.ownerType === "user") {
                context = userContext(callInfo.owner);
              } else if (callInfo.ownerType === "space") {
                context = spaceContext(callInfo.owner);
              } else if (callInfo.ownerType === "space_event") {
                context = spaceEventContext(callInfo.owner, callInfo.participants, callInfo.spaces);
              } else if (callInfo.ownerType === "chat_room") {
                if (callInfo.chatContact && typeof chatContact === "object" && callInfo.chatUser && typeof chatUser === "object") {
                  context = chatContextForRoom(callInfo.chatContact, callInfo.chatUser);
                } else {
                  log.error("Cannot add call for chat room without callInfo.chatContact details");
                  log.trace("> Got call info for chat room without callInfo.chatContact: " + JSON.stringify(callInfo));
                }
              }
              if (context && provider.getCallId && provider.hasOwnProperty("getCallId") && provider.getCallUrl && provider.hasOwnProperty("getCallUrl")) {
                provider.getCallId(context).then(id => {
                  self.getCall(id).then(call => {
                    call.url = provider.getCallUrl(id);
                    process.resolve(call);
                    // TODO - cleanup. Check if call does not exist already and update it
                    //  // Update the call
                    //  self.updateCall(id, callInfo).then(call => {
                    //    process.resolve(call);
                    //  }).catch(err => {
                    //    process.reject(err);
                    //  });
                  }).catch(err => {
                    if (err && err.code === "NOT_FOUND_ERROR") {
                      processAddCall(id, callInfo, false, provider.getCallUrl(id));
                    } else {
                      process.reject(err);
                    }
                  });
                });
              } else {
                log.trace("Adding a call without an ID requires a provider to implement a method getCallId(): " + callInfo.provider);
                process.reject("Provider does not support generating a call ID by a context");
              }
            });
          } else {
            log.trace("Adding a call without an ID requires a provider in callInfo: " + JSON.stringify(callInfo));
            process.reject("Provider required in callInfo");
          }
        } else {
          processAddCall(id, callInfo, true);
        }
			} else {
				log.trace("Adding call requires CometD");
				process.reject("CometD required");
			}
      return process.promise();
		};
				
		this.getUserGroupCalls = function() {
			if (cometd) {
				var process = $.Deferred();
				var callProps = cometdParams({
					id : currentUser.id,
					command : "get_calls_state"
				});
				cometd.remoteCall("/webconferencing/calls", callProps, function(response) {
					var result = tryParseJson(response);
					if (response.successful) {
					  process.resolve(result);
					} else {
						process.reject(result);
					}
				});
				return process.promise();
			} else {
				log.trace("Reading of user group calls requires CometD");
				return $.Deferred().reject("CometD required").promise();
			}
		};
		
		/* TODO Deprecated since 1.1.1, use updateCall() instead. */
		this.updateUserCall = function(id, state) {
			if (cometd) {
				// It's the same channel to call in CometD
				return self.updateCall(id, state);
			} else {
				log.trace("User call update requires CometD. Was call: " + id);
				return $.Deferred().reject("CometD required").promise();
			}
		};
		
		this.onUserUpdate = function(userId, onUpdate, onError, onReady) {
			if (cometd) {
				// /service/webconferencing/calls
				var subscription = cometd.subscribe("/eXo/Application/WebConferencing/user/" + userId, function(message) {
					// Channel message handler
					var result = tryParseJson(message);
					if (message.data.error) {
						if (typeof onError == "function") {
							onError(result);
						}
					} else {
						if (typeof onUpdate == "function") {
							onUpdate(result);
						}							
					}
				}, cometdContext, function(subscribeReply) {
					// Subscription status callback
					if (subscribeReply.successful) {
		        // The server successfully subscribed this client to the channel.
						log.trace("User updates subscribed successfully: " + JSON.stringify(subscribeReply));
						if (typeof onReady == "function") {
							onReady(subscribeReply);
						}
					} else {
						var err = subscribeReply.error ? subscribeReply.error : (subscribeReply.failure ? subscribeReply.failure.reason : "Undefined");
						log.debug("User updates subscription failed for " + userId, err);
						if (typeof onError == "function") {
							onError("User updates subscription failed (" + err + ")");								
						}
					}
				});
				return {
					off : function(callback) {
						cometd.unsubscribe(subscription, callback);
					}
				};
			} else {
				log.trace("User updates require CometD. Was user: " + userId);
				if (typeof onError == "function") {
					onError("CometD required");								
				}
				return {
					off : function(callback) {}
				};
			}
		};
		
		this.onCallUpdate = function(callId, onUpdate, onError, onReady) {
			if (cometd) {
				var subscription = cometd.subscribe("/eXo/Application/WebConferencing/call/" + callId, function(message) {
					// Channel message handler
					var result = tryParseJson(message);
					if (message.data.error) {
						if (typeof onError == "function") {
							onError(result);
						}
					} else {
						if (typeof onUpdate == "function") {
							onUpdate(result);
						}							
					}
				}, cometdContext, function(subscribeReply) {
					// Subscription status callback
					if (subscribeReply.successful) {
		        // The server successfully subscribed this client to the channel.
						log.trace("Call updates subscribed successfully: " + JSON.stringify(subscribeReply));
						if (typeof onReady == "function") {
							onReady(subscribeReply);
						}
					} else {
						var err = subscribeReply.error ? subscribeReply.error : (subscribeReply.failure ? subscribeReply.failure.reason : "Undefined");
						log.trace("Call updates subscription failed for " + callId, err);
						if (typeof onError == "function") {
							onError("Call updates subscription failed (" + err + ")");								
						}
					}
				});
				return {
					off : function(callback) {
						cometd.unsubscribe(subscription, callback);
					}
				};
			} else {
				log.trace("Call updates require CometD. Was call: " + callId);
				if (typeof onError == "function") {
					onError("Call updates require CometD");								
				}
				return {
					off : function() {}
				}
			}
		};
				
		this.toCallUpdate = function(callId, data) {
			var process = $.Deferred();
			if (cometd) {
				cometd.publish("/eXo/Application/WebConferencing/call/" + callId, cometdParams(data), function(publishAck) {
			    if (publishAck.successful) {
			    	process.resolve("successful");
			    } else {
			    	process.reject(publishAck.failure ? publishAck.failure.reason : publishAck.error);
			    }
				});
			} else {
				log.trace("Call updates require CometD. Was call: " + callId);
				process.reject("CometD required");
			}
			return process.promise();
		};
		
		this.getProvidersConfig = function(forceUpdate) {
			var process;
			if (!forceUpdate && providersConfig) {
				process = $.Deferred();
				process.resolve(providersConfig);
			} else {
				process = getProvidersConfig();
				process.done(function(configs) {
					providersConfig = configs;
				}).fail(function(err) {
					log.error("Loading providers configuration failed", err);
				});
			}
			return process.promise();
		}
		this.getProviderConfig = getProviderConfig; // this will ask server
		this.postProviderConfig = postProviderConfig;
		
		this.getUserStatus = getUserStatus;
		
		// common utilities
		this.getLog = function(providerType) {
			if (providerType) {
        if (providerType === "webconferencing") {
          return log;
        }
				if (providersConfig) {
					var conf = providerConfig(providerType);
					if (conf) {
						if (!conf.log) {
							conf.log = new Logger().provider(providerType).remoteLog(conf.logEnabled && cometd).get();
						}
						return conf.log;
					} else {
						log.warn("Asked logger for not registerd provider: " + providerType);
					}
				} else {
					// If no provider config yet, we create log but with asterisk suffix and not remote
					var logger = new Logger().provider(providerType + "*");
					contextInitializer.done(function() {
						var conf = providerConfig(providerType);
						if (conf) {
							// When provider configured (via init()), we set real type and, if required, a remote spooler
							logger.provider(providerType).remoteLog(conf.logEnabled && cometd);
							conf.log = logger.get();
						} else {
							log.warn("Using logger for not registerd provider: " + providerType);
						}
					});
					return logger.get();
				}				
			}
			return new Logger().get(); // default logger: without prefix and remote not enabled  
		};
    
		this.getRandom = getRandomArbitrary;
		this.message = message;
		this.showWarn = showWarn;
		this.noticeWarn = noticeWarn;
		this.showError = showError;
		this.noticeError = noticeError;
		this.showInfo = showInfo;
		this.noticeInfo = noticeInfo;
		this.showConfirm = showConfirm
		
		/**
		 * Add style to current document (to the end of head).
		 */
		this.loadStyle = function(cssUrl) {
			if (document.createStyleSheet) {
				document.createStyleSheet(cssUrl); // IE way
			} else {
        if ($("head").find("link[href='"+cssUrl+"'][rel!='preload']").length == 0) {
					var headElems = document.getElementsByTagName("head");
					var style = document.createElement("link");
					style.type = "text/css";
					style.rel = "stylesheet";
					style.href = cssUrl;
					headElems[headElems.length - 1].appendChild(style);
				} // else, already added
			}
		};
		
		this.initRequest = initRequest; // for use in other modules (providers, portlets etc)

    // target (optional) - the data from the exo-chat-selected-contact-changed event
    // (target can be absent; it's needed to create the context for selected contact from event).
    this.createChatContext = async function(chat, target) {
      const localContext = $.Deferred();
      contextInitializer.then(() => {
        if (target) {
          localContext.resolve(chatContextForRoom(target, chat.userSettings.username));
        } else if (chat) {
          localContext.resolve(chatContext(chat));
        } else {
          log.warn("Failed to create the chat context: no required data");
          localContext.reject("Failed to create the chat context: no required data");
        }
      });
      return localContext.promise();
    };

    this.createSpaceContext = async function(spaceId) {
      const localContext = $.Deferred();
      contextInitializer.then(() => {
        localContext.resolve(spaceContext(spaceId));
      });
      return localContext.promise();
    };

    // Can be used for single user profile and user popover
    this.createUserContext = async function(userId) {
      const localContext = $.Deferred();
      contextInitializer.then(() => {
        localContext.resolve(userContext(userId));
      });
      return localContext.promise();
    };

    this.createSpaceEventContext = async function(spaceId, participants, spaces) {
      const localContext = $.Deferred();
      contextInitializer.then(() => {
        localContext.resolve(spaceEventContext(spaceId, participants, spaces));
      });
      return localContext.promise();
    }

    this.getAllProviders = async function() {
      const webConferencing = this;
      const allProviders = $.Deferred();
      contextInitializer.then(() => {
        webConferencing.getProvidersConfig().then((providersConfig) => {
          const providersTypes = providersConfig.map(provider => provider.type);
          Promise.all(
            providersTypes.map(type => webConferencing.getProvider(type))
          ).then(providers => {
            allProviders.resolve(providers);
          });
        });
      });
      return allProviders.promise();
    };
	}
	
	var webConferencing = new WebConferencing();
	
	// Register webConferencing in global eXo namespace (for non AMD uses)
	if (typeof window.eXo === "undefined" || !eXo) {
		window.eXo = {};
	}
	if (typeof eXo.webConferencing === "undefined" || !eXo.webConferencing) {
		eXo.webConferencing = webConferencing;
	} else {
		log.trace("eXo.webConferencing already defined");
	}
	
	$(function() {
		try {
			// Init notification styles
			// configure Pnotify: use jQuery UI css
			$.pnotify.defaults.styling = "jqueryui";
			// no history roller in the right corner
			$.pnotify.defaults.history = false;
		} catch(err) {
			log.error("Error configuring Web Conferencing notifications.", err);
		}
	});

	log.trace("< Loaded at " + location.origin + location.pathname);
	
	return webConferencing;
})($, cCometD);
