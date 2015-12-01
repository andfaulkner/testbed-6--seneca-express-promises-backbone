var BackboneAppView = require('./backbone-view.js');

module.exports = BackboneAppView.extend({
  	events: {
  		'click #forms_page--form__submitBtn': 'submitForm'
  	},
  	render: function render(isRerender) {
  		var self = this;
  		self.loadHTMLSnippetFileIntoEl('components/forms_page/forms.html', false,
  			function htmlLoaded(){
					if (isRerender) self.trigger('renderComplete', true);
  		});
		},
		// data & xhr comes from model
		displaySuccessfulSubmit: function successfulSubmit(data, xhr){
			console.log('view says submit successful!');
			this.render(true);
		},
		/**
		 * If model submit fails, do this.
		 */
		displaySubmitError: function successfulSubmit(error){
			console.log('Submit failed! Try again...says the view');
		},
		/**
		 * Listen to associated model for successful or failed data submit; then render view
		 */
		initialize: function initialize(){
			var self = this;
			self.listenTo(self.model, 'sync', self.displaySuccessfulSubmit);
			self.listenTo(self.model, 'error', self.displaySubmitError);
			this.render();
		},
		//Acts as "save" action
		//Submit button; TODO also send this to the model?
		submitForm: function submitForm(event){
			event.preventDefault();
			this.model.save($("#forms_page--form-target").serialize());
		}
  });