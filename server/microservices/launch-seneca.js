/***************************************************************************************************
*
*       launch-seneca - initializer for Seneca microservices architecture
*       Creates main Seneca instance.
*       Calls in various microservices.
*       Returns constructed Seneca object to caller
*
*/

var logger = require('server/debug/winston-logger');
var log = logger.log('server/debug/uncaught-error-handler');

var path = require('path');

var config = require('config/default');

var log = require('server/debug/winston-logger').log('launch-seneca');

//Create Seneca instance
var seneca = require('seneca')(config.seneca);

log.debug('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ seneca.start ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
log.debug(seneca.start());
log.debug('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

//--------------------------------------------------------------------//
//********************************************************************//
//** PLUGINS
//*********************************//

var pluginDirPath = 'server/microservices';

var senPluginsList = [
    'express/express-plugin',
    'log-msg-plugin/log-msg-plugin',
    ['seneca-postgresql-store', config.postgres],
    'api/form-handler-api'
];

/**
 * Loads seneca plugins in sequence
 */
async.each(senPluginsList,
    function loadPlugin(pluginFile, callback) {
        log.info('loadPlugin ran, on ' + pluginFile);
        //handle array items with options
        if (_.isArray(pluginFile)){
        	logger.block('info', 'pluginFile', pluginFile);
        	seneca.use.apply(seneca, [require(pluginFile[0])].concat(_.rest(pluginFile)));
        } else if (_.includes(pluginFile, '/')) {
	        log.silly('in "includes" - under loadPlugin, within async.each');
		      seneca.use(require(path.join(__projrootdir, pluginDirPath, pluginFile)));
	      //Include installed plugins / npm modules
	      } else {
	        	log.silly('in "plugins"');
	        	seneca.use(require(pluginFile));
	      }
        //Include filepaths
        seneca.on('ready', callback.bind(this, null));
    },
    function senecaDone(err) {
        if (err) {
            log.error('a plugin failed to load into Seneca: ' + err);
            return;
        }
        log.info('all Seneca plugins successfully requested!');
        var bluebirdTests = require('server/practice-promises/bluebird-test');
        // bluebirdTests.runTests();
        bluebirdTests.treasureHunt()
        return;
    }
);

//@EXPORT seneca instance
module.exports = seneca;