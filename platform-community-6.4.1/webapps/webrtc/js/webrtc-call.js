/**
 * WebRTC call application (web page). This script initializes an UI of a page that will handle a particular call.
 */
if (eXo.webConferencing) {
	(function(webConferencing) {
		"use strict";
		
		/** For debug logging. */
		var log = webConferencing.getLog("webrtc").prefix("call");
		// log.trace("> Loading at " + location.origin + location.pathname);
		
		var isEdge = /Edge/.test(navigator.userAgent);
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isChrome = /Chrom(e|ium)/.test(navigator.userAgent);

		function alignLoader() {
			var $throber = $("#webrtc-call-starting>.waitThrobber");
			if ($throber.length > 0) {
				var newHeight = $(window).height() - 30; // 15px for margins top/bottom
				var oldHeight = $throber.height();
				if (newHeight > 0) {
					$throber.height(newHeight);
				}
			}
		}
		
		function addToContainer($content) {
			var $container = $("div.webrtc-call-container");
			if ($container.length == 0) {
				$container = $("<div class='webrtc-call-container' style='display: none;'></div>");
				var newHeight = $(window).height() - 30; // 15px for margins top/bottom
				var oldHeight = $container.height();
				if (newHeight > 0) {
					$container.height(newHeight);
				}
				$(document.body).append($container);
			}
			$container.append($content);
			$container.show();
		}

		function decodeMessage(msg) {
			var dmsg = decodeURIComponent(msg);
			return dmsg.replace(/\+/g, " ");
		}

		function showError(title, message, ref) {
			$("#webrtc-call-conversation, #webrtc-call-title, #webrtc-call-starting").hide();
			$("#webrtc-call-container").css("pointer-events", "none");
			var $error = $("#webrtc-call-error");
			if ($error.length == 0) {
				$error = $("<div id='webrtc-call-error'></div>");
				addToContainer($error);
			}

			// Append errors (for history)
			var $title = $("<h1 class='error-title'></h1>");
			$title.text(title);
			$error.append($title);
			var $description = $("<div class='error-description'></div>");
			$description.text(message);
			$error.append($description);
			if (ref) {
				var $ref = $("<div class='error-ref'></div>");
				$ref.text(webConferencing.message("errorReference") + ref);
				$error.append($ref);				
			}
		}
		
		function showStopped(message) {
			$("#webrtc-call-starting, #controls").hide();
			$("#webrtc-call-container").css("pointer-events", "none");
			if ($("#webrtc-call-error").length == 0) {
				// Show the message only if no error shown already
				var $stopped = $("#webrtc-call-stopped");
				$stopped.empty();
				var $info = $(".stopInfo");
				if ($info.length == 0) {
					$info = $("<div class='stopInfo'></div>");
					$stopped.append($info);
				}
				$info.text(message);
				$stopped.show();
			}
		}
		
		function objectUrl(obj) {
			if (window.URL) {
		  	return window.URL.createObjectURL(obj);
		  } else {
		  	return obj;
		  }
		}
		
		$(function() {
			alignLoader();
		});
		
		eXo.webConferencing.startCall = function(call) {
			var process = $.Deferred();
			$(function() {
				$("#webrtc-call-container").css("pointer-events", "auto");
				webConferencing.getProvider("webrtc").done(function(webrtc, initialized) {
					if (initialized) {
						if (webrtc.isSupportedPlatform()) {
							log.debug("Call page: " + location.origin + location.pathname);
							var callId = call.id;
							var isGroup = callId.startsWith("g/");
							if (isGroup) {
								log.warn("Group calls not supported: " + callId);
								showError("Warning", "Group calls not supported by WebRTC connector");
								setTimeout(function() {
									window.close();
								}, 7000);
								process.reject("Group calls not supported");
							} else {
								log.trace("Preparing call: " + callId);
								var currentUserId = webConferencing.getUser().id;
								var isOwner = currentUserId == call.owner.id;
								// TODO Use this for avatar when no video stream available
								//var callerLink = call.owner.profileLink;
								//var callerAvatar = call.owner.avatarLink;
								
								$("#webrtc-call-starting").hide();
								$("#webrtc-call-container").show();
								var $convo = $("#webrtc-call-conversation");
								var $title = $("#webrtc-call-title > h1");
								$title.text(call.title);
								
								var $videos = $convo.find("#videos");
								var $remoteVideo = $videos.find("#remote-video");
								var remoteVideo = $remoteVideo.get(0);
								var $localVideo = $videos.find("#local-video");
								var localVideo = $localVideo.get(0);
								var $miniVideo = $videos.find("#mini-video");
								var miniVideo = $miniVideo.get(0);
								
								var $controls = $convo.find("#controls");
								$controls.addClass("active");
								$controls.show(); // TODO apply show/hide on timeout 
								var $hangupButton = $controls.find("#hangup");
								
								// Page closing should end a call properly
								var pc;
								var $outgoingRing;
								var stopStream = function(stream) {
									var videoTracks = stream.getVideoTracks();
									for (var i = 0; i < videoTracks.length; ++i) {
										videoTracks[i].stop();
								  }
									var audioTracks = stream.getAudioTracks();
									for (var i = 0; i < audioTracks.length; ++i) {
										audioTracks[i].stop();
								  }
								};
								var stopLocal = function() {
									if ($outgoingRing) {
										$outgoingRing.remove();
									}

									showStopped(webrtc.message("callStopped"));
									
									var localStream = localVideo.srcObject;
									localVideo.srcObject = null;
									if (localStream) {
										stopStream(localStream);
									}
									
									if (pc) {
										try {
											// TODO in FF it warns:
											// RTCPeerConnection.getLocalStreams/getRemoteStreams are deprecated. Use RTCPeerConnection.getSenders/getReceivers instead.
											// But for Chrome it's seems a single working solution
											var localStreams = pc.getLocalStreams();
											for (var i = 0; i < localStreams.length; ++i) {
												stopStream(localStreams[i]);
										  }
											var remoteStreams = pc.getRemoteStreams();
											for (var i = 0; i < remoteStreams.length; ++i) {
												stopStream(remoteStreams[i]);
										  }
										} catch(e) {
											log.warn("Failed to stop peer streams", e);
										}
										try {
											pc.close();
										} catch(e) {
											log.warn("Failed to close peer connection", e);
										}											
									}
									window.removeEventListener("beforeunload", beforeunloadListener);
									window.removeEventListener("unload", unloadListener);
								};
								
								var stopping = false;
								var stopCall = function(localOnly) {
									// TODO Here we also could send 'bye' message - it will work for 'Hang Up' button, 
									// but in case of page close it may not be sent to others, thus we delete the call here.
									if (!stopping) {
										stopping = true;
										// Play complete ringtone
										var $complete = $("<audio autoplay style='display: none;'>" 
													+ "<source src='/webrtc/audio/complete.mp3' type='audio/mpeg'>"  
													+ "Your browser does not support the audio element.</audio>");
										$(document.body).append($complete);
										if (localOnly) {
											stopLocal();
										} else {
											// No sense to send 'leaved' for P2P, it is already should be stopped
											webrtc.deleteCall(callId).always(function() {
												stopLocal();
											});
										}									
									}
								};
								var beforeunloadListener = function(e) {
									stopCall();
								};
								var unloadListener = function(e) {
									stopCall();
								};
								window.addEventListener("beforeunload", beforeunloadListener);
								window.addEventListener("unload", unloadListener);
								
								var stopCallWaitClose = function(localOnly) {
									stopCall(localOnly);
									setTimeout(function() {
										window.close();
									}, 1500);
								};
								
								// Subscribe to user calls to know if this call updated/stopped remotely
							  webConferencing.onUserUpdate(currentUserId, function(update) {
									if (update.eventType == "call_state") {
										if (update.owner.type == "user") {
											if (update.callState == "stopped" && update.callId == callId) {
												var msg = "Call stopped remotely: " + update.callId;
												if (stopping) {
													log.trace(msg);	// it's already logged remotely by this client
												} else {
													log.info(msg);
												}
												// don't close the window - we let user see that call was stopped (remotely)
												stopCall(true);
											}
										}
									}
								}, function(err) {
									// Otherwise, in case of error subscribing user updates and remote call stopping
									// this window will stay open.
									log.error("User calls subscription failure: " + callId, err, function(ref) {
										webConferencing.showError(webrtc.message("errorStartingCall"), 
													webrtc.message("errorSubscribeUser") + ". " + webrtc.message("refreshTryAgainContactAdmin"), ref);
									});
									// we don't reject the progress promise as the call still may run successfully
								});
								
								// WebRTC connection to establish a call connection
								log.trace("Creating RTC peer connection for " + callId);
								try {
									var rtcConfig = webrtc.getRtcConfiguration();
									// Clean to keep only meaningful fields
									if (!rtcConfig.bundlePolicy) {
										delete rtcConfig.bundlePolicy;
									}
									if (!rtcConfig.iceTransportPolicy) {
										delete rtcConfig.iceTransportPolicy;
									}
									if (rtcConfig.iceCandidatePoolSize <= 0) {
										delete rtcConfig.iceCandidatePoolSize;
									}
									if (rtcConfig.logEnabled !== undefined) {
                    delete rtcConfig.logEnabled;
                  }
									if (isEdge) {
									  // XXX Apr22 2020: The Edge browser does not support TCP and TLS TURN - we skip it
									  // https://documentation.avaya.com/bundle/AdministratorGuideforAvayaEquinoxManagement_r91/page/Configuring_WebRTC_Calls_for_Edge_Browser.html
                    // But STUN actually supported as for this date.
									  var validServers = [];
										for (var i=0; i<rtcConfig.iceServers.length; i++) {
											var server = rtcConfig.iceServers[i];
											var validUrls = [];
											for (var ui=0; ui<server.urls.length; ui++) {
												var url = server.urls[ui];
												if (!url.startsWith("turns")) {
												  validUrls.push(url);
												} else {
												  log.warn("Skipped ICE server URL for Edge browser: " + url);
												}
											}
											if (validUrls.length > 0) {
												server.urls = validUrls;
												validServers.push(server);
											}
										}
										rtcConfig.iceServers = validServers;
									}
									// Also clean not actually meaningful fields (remove our own fields)
									for (var i=0; i<rtcConfig.iceServers.length; i++) {
										var server = rtcConfig.iceServers[i];
										delete server.enabled;
										delete server["default"];
										// username and credential can be empty strings
										if (typeof server.username != "string") {
											delete server.username;
										}
										if (typeof server.credential != "string") {
											delete server.credential;
										}
									}
									
									//log.trace("WebRTC configuration: " + JSON.stringify(rtcConfig));
									log.trace("Creating RTCPeerConnection");
									pc = new RTCPeerConnection(rtcConfig);
									var subscribed = $.Deferred();
									var negotiation = $.Deferred();
									var connection = $.Deferred();
									
									var handleConnectionError = function(logMessage, err) {
										log.error(logMessage, err, function(ref) {
											showError(webrtc.message("errorStartingConnection"), webConferencing.errorText(err), ref);	
										});
										// Release a peer connection (and media devices) and delete a call 
										stopCall();
										// TODO we also could send a fact of error to other peer(s) to inform them about this peer state,
										// then others could stop calling (for P2P) or mark a participant disconnected (in group calls).
									};
									
									// Play incoming ringtone for the call owner until complete negotiation
									if (isOwner) {
										$outgoingRing = $("<audio loop autoplay style='display: none;'>" 
													+ "<source src='/webrtc/audio/echo.mp3' type='audio/mpeg'>"  
													+ "Your browser does not support the audio element.</audio>");
										$(document.body).append($outgoingRing);
										negotiation.then(function() {
											$outgoingRing.remove();
										});
									}
									
									var sendMessage = function(message) {
										return webConferencing.toCallUpdate(callId, $.extend({
							    		"provider" : webrtc.getType(),
							    		"sender" : currentUserId,
							    		"host" : isOwner
							      }, message));
									};
									var sendHello = function() {
										// It is a first message send on the call channel by a peer, 
										// it tells that the end is ready to exchange other information (i.e. accepted the call)
										// If it will be required to change a host in future, then this message should be send
										// by a new host with '__all__' content, others should understand this and update their 
										// owner ID to this sender ID.
										return sendMessage({
							    		"hello": isOwner ? "__all__" : call.owner.id
							      }).done(function() {
							      	log.debug("Sent Hello (by " + (isOwner ? "owner" : "participant") + ") for " + callId);
							      }).fail(function(err) {
											handleConnectionError("Failed to send Hello for " + callId, err);
										});
									};
									var sendBye = function() {
										// TODO not used
										// It is a last message send on the call channel by a peer, 
										// other side should treat is as call successfully ended and no further action required (don't need delete the call)
										return sendMessage({
							    		"bye": isOwner ? "__all__" : call.owner.id
							      }).done(function() {
							      	log.debug("Sent Bye (by " + (isOwner ? "owner" : "participant") + ") for " + callId);
							      }).fail(function(err) {
											log.error("Failed to send Bye (by " + (isOwner ? "owner" : "participant") + ") for " + callId, err);
										});
									};
									var sendOffer = function(localDescription) {
										return sendMessage({
							    		"offer": JSON.stringify(localDescription)
							      }).done(function() {
							      	log.debug("Published offer for " + callId + ": " + JSON.stringify(localDescription));
										}).fail(function(err) {
											// TODO May be to retry?
											handleConnectionError("Failed to send offer for " + callId, err);
										});
									};
									var sendAnswer = function(localDescription) {
										return sendMessage({
							    		"answer": JSON.stringify(localDescription)
							      }).done(function() {
							      	log.debug("Published answer for " + callId + ": " + JSON.stringify(localDescription));
										}).fail(function(err) {
											handleConnectionError("Failed to send answer for " + callId, err);
										});
									};
									var sendCandidate = function(candidate, number) {
										return sendMessage({
							        "candidate" : candidate
							      }).done(function() {
							      	log.debug("Published candidate (" + number + ") for " + callId + ": " + JSON.stringify(candidate));
										}).fail(function(err) {
											handleConnectionError("Failed to send candidate (" + number + ") for " + callId, err);
										});
									};
									
									// 'Hang Up' also ends call properly
									$hangupButton.click(function() {
										stopCallWaitClose();
									});
									
									// Save user state for audio/video mute in local storage
									var preferenceKey = function(name) {
										return currentUserId + "@exo.webconferencing.webrtc." + name;
									};
									var savePreference = function(name, value) {
										try {
											localStorage.setItem(preferenceKey(name), value);
										} catch(err) {
											log.error("Error saving call preference for " + callId, err);
										}
									};
									var getPreference = function(name) {
										return localStorage.getItem(preferenceKey(name));
									};
									
									// Add peer listeners for connection flow
									// For debug purpose: count local candidates to logs readability
								  var localCandidateCnt = 0;
									pc.onicecandidate = function (event) {
										// This will happen when browser will be ready to exchange peers setup
										var candidateNumb = ++localCandidateCnt;
										log.debug("ICE candidate (" + candidateNumb + ") ready for " + callId);
										connection.then(function() {
									    if (event.candidate) {
									    	sendCandidate(event.candidate, candidateNumb);
									    } else {
									      // else All ICE candidates have been sent. ICE gathering has finished.
									    	// Send empty candidate as a sign of finished ICE gathering.
									    	sendCandidate({}, candidateNumb).done(function() {
									    		log.debug("All ICE candidates (" + candidateNumb + ") have been sent");
									    	});
									    }
										});
								  };
								  var sdpConstraints = {
						  			"offerToReceiveAudio": true, 
					  				"offerToReceiveVideo": false/*,
						  			"mandatory": { 
						  				"OfferToReceiveAudio": true, 
						  				"OfferToReceiveVideo": true
						  			}*/
								  };
								  if (isEdge) {
								  	sdpConstraints = {}; // XXX in fact even undefined doesn't fit, need call without a parameter
								  }
							  	// let the 'negotiationneeded' event trigger offer generation
									var canNegotiate = true;
								  pc.onnegotiationneeded = function () {
								  	// XXX Jun 4 2018: it's a workaround for Chrome (v66+) which produces several onnegotiationneeded events for single 
								  	// added stream (seems an event per a track in the stream):
								  	// See https://bugs.chromium.org/p/chromium/issues/detail?id=740501
								  	// TODO we also would postpone next event handling until the current one will be done and release it in always() 
								  	// handlers below, but this way we need implement 1) real reetrancy locking in JS 2) adapt RTC flow to apply several
								  	// offers/answers durinbg a single call.
								  	if (canNegotiate) {
								  		canNegotiate = false;
								  		// This will be fired after adding a local media stream and browser readiness
									  	// Ready to join the call: say hello to each other
								  		log.debug("Negotiation starting (by " + (isOwner ? "owner" : "participant") + ") for " + callId);
									  	subscribed.then(function() {
									  		sendHello().then(function() {
									  			if (isOwner) {
									  				// Hello sent by the owner will not be answered by anyone, but it may be used by the server-side and for logging purposes
								  					// Owner will send the offer when negotiation will be resolved (received Hello from others)
									  				negotiation.then(function() {
									  					log.trace("Creating offer for " + callId);
													    pc.createOffer().then(function(desc) { // sdpConstraints
													    	log.trace("Setting local description for " + callId);
													    	pc.setLocalDescription(desc).then(function() {
													    		log.trace("Sending offer for " + callId);
													    		sendOffer(pc.localDescription).always(function() {
													    			canNegotiate = true;
													    		});
													      }).catch(function(err) {
													      	handleConnectionError("Failed to set local description for " + callId, err);
														    });
													    }).catch(function(err) {
													    	handleConnectionError("Failed to create an offer for " + callId, err);
													    });
									  				});
											  	} else {
											  		// TODO do we need to re-run the participant part of negotiation here if some stream added/removed?
											  		// Participant sends Hello to the other end to initiate a negotiation there,
									  				// a peer (owner) on the other end is ready for negotiation and waits for an offer message.
											  		negotiation.resolve().then(function() {
															log.debug("Started exchange (participant) media information for " + callId);
														}).always(function() {
															canNegotiate = true;
										    		});
											  	}
									  		});
									  	});
								  	} // skip otherwise the event
								  };			  	
								  // once remote stream arrives, show it in the remote video element
								  // TODO it's modern way of WebRTC stream addition, but it doesn't work in Chrome
								  //pc.ontrack = function(event) {
								  //	log.trace(">> ontrack for " + callId);
								  	//$remoteVideo.get(0).srcObject = event.streams[0];
								  //};
									pc.onaddstream = function (event) { 
										// Remote video added: switch local to a mini and show the remote as main
										log.debug("Added stream for " + callId);
										// Stop local
										localVideo.pause();
										$localVideo.removeClass("active");
										$localVideo.hide();
										
										// Show remote
										remoteVideo.srcObject = event.stream;
										$remoteVideo.addClass("active");
										$remoteVideo.show();
										
										// Show local in mini
										miniVideo.srcObject = localVideo.srcObject;
										localVideo.srcObject = null;
										$miniVideo.addClass("active");
										$miniVideo.show();
										
										//
										$videos.addClass("active");
									};
								  pc.onremovestream = function(event) {
								  	// TODO check the event stream URL before removal?
								  	log.debug("Removed stream for " + callId);
								  	// Stop remote
								  	remoteVideo.pause();
										$remoteVideo.removeClass("active");
										$remoteVideo.hide();
										remoteVideo.srcObject = null;
										
										// Show local
										localVideo.srcObject = miniVideo.srcObject;
										$localVideo.addClass("active");
										
										// Hide mini
										miniVideo.srcObject = null;
										$miniVideo.removeClass("active");
										$miniVideo.hide();
										
										$videos.removeClass("active");
								  };
									
								  // For debug purpose: count remote candidates to logs readability
								  var remoteCandidateCnt = 0;
									// Subscribe to the call updates
									var listener = webConferencing.onCallUpdate(callId, function(message) {
										if (message.provider == webrtc.getType()) {
											if (message.sender != currentUserId) {
												if (message.candidate) {
													// ICE candidate of remote party (can happen several times)
													var candidateNumb = ++remoteCandidateCnt;
													var candidateStr = JSON.stringify(message.candidate);
													log.debug("Received candidate (" + candidateNumb + ") for " + callId + ": " + candidateStr);
													var hasCandidate = Object.getOwnPropertyNames(message.candidate).length > 0;
													if (hasCandidate) {
														connection.then(function() {
															log.trace("Creating candidate (" + candidateNumb + ") for " + callId);
															var candidate;
															// Check if the end of a generation of candidates indicated:
															// https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/icecandidate_event
															// When an ICE negotiation session runs out of candidates to propose for a given RTCIceTransport, 
															// it has completed gathering for a generation of candidates. 
															// That this has occurred is indicated by an icecandidate event whose candidate string is empty ("").
															// Peter's note: But this empty string will be send only by Firefox as for Apr 14, 2020. Tested on FF 75, Chrome 81, Edge 44/18.
															// And Edge (44/18) will fail if add such candidate - we need add null instead, see below.
															// We send all candidates to the peers and *here* we make a decision:
															if (isEdge && typeof(message.candidate.candidate) === "string" && message.candidate.candidate.length === 0) {
															  // XXX MS Edge requires special way of end-of-candidates informing 
															  // https://stackoverflow.com/questions/57340034/webrtc-adapter-js-giving-addremotecandidate-error-while-connecting-audio-call
															  // https://stackoverflow.com/questions/51641174/how-do-i-indicate-the-end-of-remote-candidates
															  candidate = new RTCIceCandidate(null);
															} else {
															  // In other cases we let the browser to handle the candidate AS IS
															  candidate = new RTCIceCandidate(message.candidate);															  
															}
															log.trace("Adding candidate (" + candidateNumb + ") for " + callId);
															pc.addIceCandidate(candidate).then(function() {
															  log.debug("Added candidate (" + candidateNumb + ") for " + callId);
															}).catch(function(err) {
																handleConnectionError("Failed to add candidate (" + candidateNumb + ") for " + callId, err);
															});														
														});
													}
													if (!hasCandidate) {
														log.info("Call connected (added " + (candidateNumb - 1) + " ICE candidates): " + callId);
													}
												} else if (message.offer) {
													log.debug("Received offer for " + callId + ": " + JSON.stringify(message.offer));
													// Offer of a caller on callee side
													if (isOwner) {
														log.warn("Unexpected offer received on owner side for " + callId);
													} else {
														try {
															var offer = JSON.parse(message.offer);
															if (isEdge) {
																offer = new RTCSessionDescription(offer);
															}
															negotiation.then(function(localStream) {
																log.trace("Setting remote description (offer) for " + callId);
																pc.setRemoteDescription(offer).then(function() {
														      // if we received an offer, we need to answer
														      if (pc.remoteDescription.type == "offer") {	
														      	log.trace("Creating answer for " + callId);
														      	pc.createAnswer().then(function(desc) { // sdpConstraints?
														      		log.trace("Setting local description for " + callId);
														      		pc.setLocalDescription(desc).then(function() {
														      			log.trace("Sending answer for " + callId);
														      			sendAnswer(pc.localDescription).then(function() {
														      				connection.resolve().then(function() {
														      					// Participant ready to exchange ICE candidates
																						log.debug("Started exchange network information with peers for " + callId);
																					});
														      			});
														      		}).catch(function(err) {
															      		handleConnectionError("Failed to set local description (answer) for " + callId, err);
														      		});
														      	}).catch(function(err) {
														      		handleConnectionError("Failed to create an answer for " + callId, err);
														      	});
														      } else {
														      	// TODO need show something to an user or it's normal behaviour (part of a flow)?
														      	log.error("Remote description type IS NOT 'offer' BUT '" + pc.remoteDescription.type 
														      				+ "'. Call state not defined for " + callId);
														      }
														    }).catch(function(err) {
														    	handleConnectionError("Failed to set remote description (offer) for " + callId, err);
														    });
															});
														} catch(err) {
															handleConnectionError("Error processing offer for " + callId, err);
														}
													}
												} else if (message.answer) {
													log.debug("Received answer for " + callId + ": " + JSON.stringify(message.answer));
													if (isOwner) {
														// Answer of a callee to the caller: it's final stage of the parties discovery
														try {
															var answer = JSON.parse(message.answer);
															if (isEdge) {
																answer = new RTCSessionDescription(answer);
															}
															negotiation.then(function() {
																log.trace("Setting answer (remote description) for " + callId);
																pc.setRemoteDescription(answer).then(function() {
														      log.trace("Apllied answer (remote description) for " + callId);
														      // Resolve connection (network) exchange only from here
														      connection.resolve().then(function() {
														      	// Owner ready to exchange ICE candidates
																		log.debug("Started exchange network information with peers for " + callId);
																	});
														    }).catch(function(err) {
														    	handleConnectionError("Failed to set answer (remote description) for " + callId, err);
														    });
															});
														} catch(err) {
															handleConnectionError("Error processing answer for " + callId, err);
														}
													} else {
														// FYI this could be OK to receive for group call
														log.warn("Unexpected answer received on participant side of " + callId);
													}
												} else if (message.hello) {
													// To start the call send "hello" - first message in the flow for each client
													log.debug("Received Hello for " + callId + ": " + JSON.stringify(message.hello));
													if (message.hello == currentUserId) {
														// We assume it's a hello to the call owner: start sending offer and candidates
														// This will work once (for group calls, need re-initialize the process)
														negotiation.resolve().then(function() {
															if (isOwner) {
																log.debug("Started exchange (owner) media information for " + callId);
															} else {
																// This should not happen until group calls will be supported
																log.warn("Started exchange (participant) media information for " + callId);
															}
														});
													} else {
														log.debug("Hello was not to me (but to " + message.hello + ")");
													}
												} else if (message.bye && false) {
													// TODO not used
													// Remote part leaved the call: stop listen the call
													log.debug("Received Bye for " + callId + ": " + JSON.stringify(message.bye));
													if (message.bye == currentUserId || message.bye == "__all__") {
														// We assume it's a Bye from the call owner or other party to us: ends the call locally and close the window
														stopCall(true);
														listener.off();											
													} else {
														log.debug("Bye was not to me (but to " + message.bye + ")");
													}
												} else {
													log.warn("Received unexpected message for " + callId + ": " + JSON.stringify(message));
												}
											} // otherwise: skip own update 
										}
									}, function(err) {
										var userMsg = webrtc.message("errorSubscribeCall") + ". " + webrtc.message("refreshTryAgainContactAdmin");
										log.error("Call subscribtion failed for " + callId, err, function(ref) {
											showError(webrtc.message("errorStartingCall"), userMsg, ref);	
										});
										process.reject(userMsg);
									}, function() {
										subscribed.resolve();
									});
									
									// Show current user camera in the video,
									var inputsReady = $.Deferred();
									try {
										navigator.mediaDevices.enumerateDevices().then(function(devices) {
											// device it's MediaDeviceInfo
											var cams = devices.filter(function(device) { 
												return device.kind == "videoinput";
											});
											var mics = devices.filter(function(device) { 
												return device.kind == "audioinput";
											});
									    
											var constraints = {};
									    if (mics.length > 0) {
									    	constraints.audio = true;
									    	if (cams.length > 0) {
									    		// TODO use optimal camera res and video quality
									    		// 720p (1280x720) is an optimal for all cases
									    		// then 960x720, 640x480 and 320x240, 160x120
									    		var vw, vh, vwmin, vhmin; 
									    		var isPortrait = screen.width < screen.height; 
									    		/*if (screen.width >= 1280) {
									    			vw = 1280;
									    			vh = 720;
									    		} else */if (screen.width >= 640) {
									    			vw = 640;
									    			vh = 480;
									    		} else {
									    			vw = 320;
									    			vh = 240;
									    		}
									    		var videoSettings = {
												  	width: { min: isPortrait ? vh : vw, ideal: isPortrait ? 720 : 1280 }
												  	//height: { min: 480, ideal: vh } // 360? it's small mobile like Galaxy S7
												  };
									    		//constraints.video = true; // it's simple way
										    	constraints.video = videoSettings;
									    		if (typeof constraints.video === "object") {
									    			try {
															var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
															if (supportedConstraints.hasOwnProperty("facingMode")) {
																constraints.video.facingMode = "user";
															}
														} catch(e) {
															log.warn("MediaDevices.getSupportedConstraints() failed", e);
														}							    			
									    		}
										    } else {
										    	constraints.video = false;
										    }
									    	inputsReady.resolve(constraints, "Found audio" + (constraints.video ? " and video" : ""));
									    } else {
									    	inputsReady.reject(webrtc.message("noAudioFound") + "." + (cams.length > 0 ? " " + webrtc.message("butVideoFound") + "." : ""));
									    }
										});
									} catch(e) {
										log.warn("MediaDevices.enumerateDevices() failed", e);
										inputsReady.resolve({
											audio : true,
											video : true
										}, "Unable read devices, go with default audio and video.");
									}
									log.info("Starting call " + callId);
									inputsReady.done(function(constraints, comment) {
										log.info("Media constraints: " + JSON.stringify(constraints) + " " + comment);
										navigator.mediaDevices.getUserMedia(constraints).then(function(localStream) {
											// successCallback: show local camera output
											localVideo.srcObject = localStream;
											$localVideo.addClass("active");
											
											var enableAudio = function(newValue) {
												var enabled;
												var audioTracks = localStream.getAudioTracks();
												if (audioTracks.length > 0) {
													for (var i = 0; i < audioTracks.length; ++i) {
														audioTracks[i].enabled = typeof newValue == "boolean" ? newValue : !audioTracks[i].enabled;
												  }
													enabled = typeof newValue == "boolean" ? newValue : audioTracks[0].enabled;
												} else {
													enabled = typeof newValue == "boolean" ? newValue : true;
												}
												log.info("Audio " + (enabled ? "un" : "") + "muted for " + callId);
												return enabled;
											};
											var $muteAudio = $controls.find("#mute-audio");
											$muteAudio.click(function() {
												savePreference("audio.disable", new String(!enableAudio()));
												$muteAudio.toggleClass("on");
											});
											var enableVideo = function(newValue) {
												var enabled;
												var videoTracks = localStream.getVideoTracks();
												if (videoTracks.length > 0) {
													for (var i = 0; i < videoTracks.length; ++i) {
														videoTracks[i].enabled = typeof newValue == "boolean" ? newValue : !videoTracks[i].enabled;
												  }
													enabled = typeof newValue == "boolean" ? newValue : videoTracks[0].enabled;
												} else {
													enabled = typeof newValue == "boolean" ? newValue : true;
												}
												log.info("Video " + (enabled ? "un" : "") + "muted for " + callId);
												return enabled;
											};
											var $muteVideo = $controls.find("#mute-video");
											$muteVideo.click(function() {
												savePreference("video.disable", new String(!enableVideo()));
												$muteVideo.toggleClass("on");
											});
										  // add local stream right now
											log.debug("Adding local (" + (isOwner ? "owner" : "participant") + ") stream for " + callId);
										  pc.addStream(localStream); // this will cause onnegotiationneeded event
										  // XXX It's deprecated way but Chrome (prior ~ v66) works using it
										  //localStream.getTracks().forEach(function(track) {
										  //  pc.addTrack(track, localStream);
										  //});
											// if user had saved audio/video disabled, mute them accordingly
											if (getPreference("audio.disable") == "true") {
												log.info("Apply user preference: audio disabled");
												enableAudio(false);
												$muteAudio.addClass("on");
											}
											if (getPreference("video.disable") == "true") {
												log.info("Apply user preference: video disabled");
												enableVideo(false);
												$muteVideo.addClass("on");
											}
											connection.then(function() {
												// It's still not fully 'joined' user here, RTC only starts exchange ICE candidates at this point
												// and actual call will start in few seconds (depends on network and other factors),
												// User may also fail to exchange candidates and media stream will not be established -
												// it will look like the call not started to an user.
												// If we want join the call after actual media streams will be obtained we need do more advanced
												// logic and look for All candidates will be sent, then check if all media streams added. 
												webrtc.joinedCall(callId);
											});
										}).catch(function(err) {
											// In case of getting user medias we can face with different errors (on different browsers and its versions)
											var errMsg = webConferencing.errorText(err);
											if (!errMsg) {
												if (err.code && err.PERMISSION_DENIED) {
													// For older version of Chrome
													err = "PERMISSION_DENIED " + err.code;
													errMsg = webrtc.message("accessDenied");
												} else {
													if (err.name && err.name == "PermissionDeniedError") {
														// Chrome may not provide a message for this error
														errMsg = webrtc.message("accessDenied");
													}
												}
											}
											log.error("Failed to get media devices", err, function(ref) {
												showError(webrtc.message("mediaDevicesError"), errMsg, ref);												
											});
											stopCall();
										});
									}).fail(function(err) {
										log.error("Media devices discovery failed", err, function(ref) {
											showError(webrtc.message("audioVideoRequired"), webConferencing.errorText(err), ref);
										});
										stopCall();
									});
									// Resolve this in any case of above media devices discovery result
									process.resolve("started");
								} catch(err) {
									var userMsg = webrtc.message("connectionFailed") + " (" + webConferencing.errorText(err) + ")" 
											+ ". " + webrtc.message("refreshTryAgainContactAdmin");
									log.error("Failed to create RTC peer connection for " + callId, err, function(ref) {
										showError(webrtc.message("errorStartingCall"), userMsg, ref);
									});
									process.reject(userMsg);
									stopCall();
								}
							}
						} else {
							var userMsg = webrtc.message("yourBrowserNotSupportWebrtc");
							log.error("WebRTC call not supported in this browser: " + navigator.userAgent, function(ref) {
								showError(webrtc.message("notSupportedPlatform"), userMsg + ".", ref);
							});
							process.reject(userMsg);
						}						
					} else {
						var userMsg = webrtc.message("notInitialized");
						log.error("Provider not initialized", function(ref) {
							showError(webrtc.message("providerError"), userMsg + ".", ref);
						});
						process.reject(userMsg);
					}
				}).fail(function(err) {
					var userMsg = webrtc.message("providerNotAvailable") + " (" + webConferencing.errorText(err) + ")";
					log.error("Provider not available", err, function(ref) {
						showError(webrtc.message("providerError"), userMsg + ".", ref);
					});
					process.reject(userMsg);
				});
			});
			return process.promise();
		};
		
		log.trace("< Loaded at " + location.origin + location.pathname);
	})(eXo.webConferencing);
} else {
	window.console && window.console.log("eXo.webConferencing not defined for webrtc-call.js");
}
