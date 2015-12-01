var style = 'color:white; background:magenta; font-weight: bold';
var fileInfo = '%c\n\nBACKBONE-VIEW::: ';

//Top level view - all others inherit from it
var BackboneAppView = Backbone.View.extend({

	getComponent: function getComponent(route){
  	return $.get(route, function(component) {
    	return component;
    });
	},

	loadHTMLSnippetFileIntoEl: function loadHTMLSnippetFileIntoEl(route, noRender, cb) {
		var self = this;
		this.getComponent(route).then(function(htmlSnippet) {
			if (self.noRender) {
				return (cb) ? cb(htmlSnippet) : htmlSnippet;
			}
			self.$el.empty();
			self.$el.html(htmlSnippet);
			return (cb) ? cb(htmlSnippet) : htmlSnippet;
		});
	},

 	initialize: function initialize() {
 		this.render();
	}
});

module.exports = BackboneAppView;