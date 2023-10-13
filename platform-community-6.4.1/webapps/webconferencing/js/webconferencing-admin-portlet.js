/**
 * WebConferencing Admin portlet in eXo Platform.
 */
(function($, webConferencing) {
	"use strict";

	/** For debug logging. */
	// Use default logger with own prefix. It's log w/o remote spooling.
	var log = webConferencing.getLog().prefix("webconferencing.admin");
	// log.trace("> Loading at " + location.origin + location.pathname);

	/**
	 * Admin class.
	 */
	function Admin() {
		var self = this;
		this.init = function(context) {
			// UI init and action handlers
			$(function() {
				log.info("Initializing Web Conferencing Admin");
				
				var $admin = $("#webconferencingAdmin");
				var $tbody = $admin.find(".content table tbody");
				var $template = $tbody.find(".callProvider.template");
				
				// Load available providers: take in account that provider modules loading asynchronously in parallel to this call.
				webConferencing.getProvidersConfig().done(function(configs) {
					$.each(configs, function(i, conf) {
						var $provider = $template.clone();
						$provider.removeClass("template");
						$provider.find(".title").text(conf.title);
						$provider.find(".description").html(conf.description);
						
						// Activation handler
						var $checkbox = $provider.find(".active input[type=checkbox]");
						$checkbox[0].checked = conf.active;
						$checkbox.click(function() {
							var checkbox = this;
							webConferencing.postProviderConfig(conf.type, this.checked).done(function(conf) {
								// Ensure we show actual value
								if (conf.active !== checkbox.checked) {
									checkbox.checked = conf.active; 
								}
							}).fail(function(err) {
								log.error("Failed to update provider configuration", err);
							});
						});
						
						// Action handles
						var $actions = $provider.find(".actions");
						// Settings (optional)
						var $settings = $actions.find(".settings");
						webConferencing.getProvider(conf.type).done(function(provider) {
							if (provider.showSettings && provider.hasOwnProperty("showSettings")) {
								$settings.click(function() {
									provider.showSettings(); // TODO context will be valuable?
								});
								$settings.show();
							}							
						}).fail(function(err) {
							log.warn("Provider not available " + conf.type, err);
						});
						
						// Add provider to the table
						$tbody.append($provider);
						$provider.show();
					});	
				}).fail(function(err) {
					log.error("Failed to load providers configuration", err);
				});	
			});
		};
	}

	return new Admin();
})($, webConferencing);
