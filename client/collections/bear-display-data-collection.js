var BearDisplayData = require('../models/bear-display-data.js');

var styleSync = 'color:white; background:green; font-size: large'
var modName = '%c\n\nBEAR-DISPLAY-DATA-COLLECTION::: '
var backboneSync = require('../backbone-sync.js');

Backbone.sync = backboneSync;

//CLASS//
var BearDisplayDataCollection = Backbone.Collection.extend({
	//Components of bear display data collection
	model: BearDisplayData,
	url: '/api/return_bear_display_collection',
	events: {
		'change': 'handleNewData'
	},
	handleNewData: function handleNewData(){
		console.log('handleNewData');
	},
	//Run on load of display page - allows for e.g. population of grid
	grabData: function grabData(){
		this.fetch();
	},
	//Set up collection of bear data
	initialize: function initialize(){
		console.log('initializing BearDisplayDataCollection!')
	}
});

module.exports = BearDisplayDataCollection;