/**
 * WebConferencing portlet in eXo Platform. This script initializes UI of a page where it is loaded using Web Conferencing
 * module.
 */
(function($, webConferencing) {
	"use strict";

	return {
		start : function(user, context) {
			$(function() {
				// init context
				webConferencing.init(user, context);
				webConferencing.update();
			});
		}
	};
})($, webConferencing);
