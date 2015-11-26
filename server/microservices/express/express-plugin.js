/***************************************************************************************************
*
*			Launches Express frontend - via a Seneca action:
*			role: 'test_plugin', cmd:'cmd1'
*
*/

var jsBeautify = require('js-beautify');
var circularJSON = require('circular-json');

var logger = require('server/debug/winston-logger');
var log = logger.log('server/microservices/express/express-plugin');

module.exports = function express_plugin(options) {

    this.add({role:'test_plugin', cmd:'cmd1'}, function cmd1(msg, respond){
      respond(null, {answer:'response from cmd1!'});
    });


    this.wrap({role:'test_plugin'}, function(msg, respond){
        this.prior(msg, respond);
    });

};