var BaseContentViewFactory = require('../core_views/base-content-view-factory.js');
var HomeContentView = require('../core_views/home-content-view.js');
var BearDisplayView = require('../core_views/bear-display-view.js');
var BearSaveFailedSubview = require('../core_views/bear-save-failed-subview.js');
var TopbarView = require('../core_views/topbar-view.js');
var BearDisplayDataCollection = require('../collections/bear-display-data-collection.js');
var BearDisplayData = require('../models/bear-display-data.js');
var style = 'color:white; font-weight:bold; background:black; font-size: medium';
var modNm = '%c\n\n\/\\\/\\\/-{ ROUTER_MAIN }-\\\/\\\/\\ : ';


module.exports = Backbone.Router.extend({

	routes: {
		'': 'flipToIndex',
		'home': 'flipToIndex',
		'index': 'flipToIndex',
		'display': 'flipToDisplay',
		':otherdata': 'other'
	},

	baseTopbar: false,

	views: {},

	_loadBaseTopbar: function _loadBaseTopbar(){
		return new TopbarView({
			el: $('#topbar'),
			router: this
		});
	},

	//Check if a view is already in views - if it is, load from views array,
	//otherwise actually load view.
	_grabView: function _grabView(viewName, ViewClass, opts) {
		this.baseTopbar = this.baseTopbar || this._loadBaseTopbar();
		if (!_.has(this.views, viewName)){
  		return this.views[viewName] = new ViewClass(_.extend({
  			el: opts.el || $('#container'),
  			router: this,
  		}, _.omit(opts, 'el') || {}));
  	} else {
  		return this.views[viewName].render();
  	}
	},

	//Flip to Home view
	flipToIndex: function flipToIndex(){
		var self = this;
		var BearModel = new BearDisplayData;
		var homeContentView = self._grabView('homeContentView', HomeContentView, {
			model: BearModel
		});
		self._grabView('bearSaveFailedSubview', BearSaveFailedSubview, {
			el: $('#error_area'),
			model: BearModel,
			parentView: homeContentView
		});
	},

	//Flip to Display view
	flipToDisplay: function flipToDisplay(e){
		//Provide the collection underneath to the view being loaded
		this._grabView('bearDisplayView', BearDisplayView, {
			collection: BearDisplayDataCollection
		});
	},

	other: function other(otherdata){
		console.log(modNm + 'ENTERED other\n\n', style);
	}
});