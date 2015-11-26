

// function setLocalSenActs() {

//     // // seneca.act(
//     // //     {role:'test-plugins',cmd:'ret-random-num',tag:'tp-rrn'},
//     // //     function(err, msg){
//     // //         if (err) log.error(err);
//     // //         return;
//     // //     }
//     // // );

//     // // seneca.act(
//     // //     {role:'test-plugins',cmd:'ret-random-num',tag:'tp-rrn2'},
//     // //     function(err, msg){
//     // //         return;
//     // //     }
//     // );

//     /**
//      * Response from {role:'test_plugin', cmd:'cmd1'}
//      *     @param  {Object} err     Error object, present if call fails
//      *     @param  {Object} result     Error object if call fails
//      */
//     // seneca
//     //     .act({  role:   'test_plugin',
//     //             cmd:    'cmd1'          },
//     //         function(err, result) {
//     //             if (err) return log.error(err);
//     //             else return result;
//     //         }
//     //     )
//     //     .act({  role:   'log_msg',
//     //             cmd:    'block',
//     //             title:  'LOG BLOCK!',
//     //             data:   'DATA TO LOG' },
//     //         function(err, result) {
//     //             if (err) return log.error(err);
//     //             else return result;
//     //         }
//     //     );
//     ////////////////////////////////////////////////////////////////////////
//     //END PLUGINS
//     ////////////////////////////////////////////////////////////////////////


//     // function act_roleMathCmdSum_cb(err, result){
//     //     if (err) return log.error(err);
//     //     log.debug('act_roleMathCmdSum_cb result: ' + result);
//     // }

//     // function act_roleBasicNoteTrueCmdSet_cb(err, value){
//     //     log.debug('act_roleBasicNoteTrueCmdSet_cb');
//     //     log.debug(value);
//     // }

//     // function act_roleBasicNoteTrueCmdPop_cb(err, value){
//     //     log.debug('role:basic,note:true,cmd:list,key:list1');
//     //     log.debug(value);
//     //     log.verbose(this);
//     // }

//     	//math tests, don't worry about them
//     // seneca
//         // .act({role:'math', cmd:'sum', left:1, right:2}, act_roleMathCmdSum_cb)
//         // .act({role:'basic', note:true, cmd:'set', key:'key1', value:'value1'}, log.info)
//         // .act({role:'basic', note:true, cmd:'get', key:'key1'}, _.rearg(log.info, 1, 0))
//         // .act({
//         //     role: 'basic', cmd: 'push', note: true,
//         //     key: 'list1', value: 'list1_item1'
//         // }, log.silly)
//         // .act({role:'basic', note:true, cmd:'push', key:'list1', value:'list1_item2'})
//         // .act({role:'basic', note:true, cmd:'list', key:'list1'}, act_roleBasicNoteTrueCmdPop_cb)
//         // .act({role:'basic', note:true, cmd:'pop', key:'list1'},
//         //     function(err, value){
//         //         log.info('role:basic,note:true,cmd:pop,key:list1');
//         //     }
//         // );
// }
