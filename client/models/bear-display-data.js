//FETCH ONE SINGLE PIECE OF DATA FROM THE SERVER VIA GET REQUEST
//HAS NO IDEA WHERE TO GET URLS FROM\

var style = 'color:black; background:yellow; font-size: large'
var modNm = '%c\n\nBEAR-DISPLAY-DATA::: ';
var URLs = require('../urls.js');

var BearDisplayData = Backbone.Model.extend({
	urlRoot: '/api/returnbear',

	save: function save(data) {
		var self = this;
		console.log('attempting to save...');
    $.ajax({
  		url: URLs.indexBearDataReceiver,
  		type: 'post',
  		data: data,
  		success: function(data, textStatus, xhr) {
        console.log('form submission complete! - says the model');
        self.trigger('sync', data, xhr)
  			return;
      },
      error: function(error){
      	console.log('error on form submission - says the model: ' + error);
        self.trigger('error', error)
      	return;
      }
    });
	},

	onChange: function onChange(){
		console.log(modNm + 'ENTERED ONCHANGE\n\n', style);
	},

	initialize: function bearDisplayDataIntialize(){
		console.log(modNm + 'ENTERED INITIALIZE\n\n', style);
	}
});

// var bearData1 = new BearDisplayData({ firstName: 'meeka', id: 'meeka' });

// // fetches from [root]/api/returnbear/meeka
// bearData1.fetch({
// 	success: function bearData1Fetched(data){
// 		console.log(modNm + 'ENTERED FETCH SUCCESS CB\n\n', style);
// 		console.log(JSON.stringify(data));
// 	}
// })

module.exports = BearDisplayData;