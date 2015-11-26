var logger = require('server/debug/winston-logger');
var log = logger.log('server/debug/uncaught-error-handler');

module.exports = function test_API_microservice_module(options) {
    var seneca = this;
    var plugin = 'api';

    this.add({ role: plugin, cmd: 'withdraw' }, roleAPICmdWithdraw_action);
    this.add({ role: plugin, cmd: 'offer' }, roleAPICmdOffer_action);


    this.act('role:web',
        { use: {
            prefix: '/' + plugin,
            pin: 'role:' + plugin + ',cmd:*',
            map: {
                'offer': { GET: true },
                'withdraw': { GET: true, POST: true }
            }
        }}
    );

    function roleAPICmdOffer_action(msg, callback) {
        var jsonResponsePayload = {
            // msgReceived: msg,
            // fn: 'roleAPICmdOffer_action',
            // isOfferOnTable: true,
            responseText: 'offer was put on the table'
        };
        callback(null, jsonResponsePayload);
    }

    function roleAPICmdWithdraw_action(msg, callback) {
        log.debug('roleAPICmdWithdraw_action:\n');
        log.debug(msg);
        var jsonResponsePayload = {
            // msgReceived: msg,
            // fn: 'roleAPICmdWithdraw_action',
            // isOfferOnTable: false,
            responseText: 'offer was withdrawn!'
        };
        callback(null, jsonResponsePayload);
    }

    return plugin;

}