var BackboneAppView = require('./backbone-view.js');

var style = 'text-decoration: underline; font-weight: bold; color:Purple ';
var modNm = '%c\n\BEAR-SAVE-FAILED-SUBVIEW::: ';
var route = 'components/display_page/display_page.dust';
require('../dustTemplates.js');

/**
 * View above form save to display if save failed
 */
var BearSaveFailedSubview = BackboneAppView.extend({
	_defaultEl: {
		content: document, selector: '#error_area'
	},
	initialize: function intialize(){
		var self = this;
		self.parentView = arguments[0].parentView;
		self.el = arguments[0].el || self.defaultEl; // grab el value passed in
		// self.listenTo(self.model, 'sync', self.unrender);
		self.listenTo(self.parentView, 'renderComplete', self.unrender)
		self.listenTo(self.model, 'error', self.render);
	},
	unrender: function unrender() {
		this.el$ = $(this.el['selector']);
		this.el$.empty().append('SAVE SUCCESSFUL!');
	},
	render: function render() {
		this.el$ = $(this.el['selector']); // get actual DOM element
		this.el$.empty().append('FAIL!'); // display this.
	}
});

module.exports = BearSaveFailedSubview;