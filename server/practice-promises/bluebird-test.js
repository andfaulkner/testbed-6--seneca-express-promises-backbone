var logger = require('server/debug/winston-logger');
var log = logger.log('server/practice-promises/bluebird-test');

var Promise = require('bluebird');

//**************************** NODE MODULES ****************************//
var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');
//**********************************************************************//


//**************************** PROMISIFICATION ****************************//
// Promise.promisifyAll(fs);
var readFileAsync = Promise.promisify(fs.readFile);
var readUtf8FileAsync = Promise.promisify(_.partial(fs.readFile, _, 'utf8'));
//*************************************************************************//

var textDir = 'server/practice-promises/files';

var extractNextTextfileName = function extractNextTextfileName(text){
	var retText = text.replace(/([^\n]*\n)+.*\{\{/g, '').replace(/\}\}.*/g, '');
	return path.join(textDir, retText + '.txt');
}

var showPromiseErrMsg = function showPromiseErrMsg(e, customMsg){
	log.error(customMsg);
	log.error(e);
	throw e;
	return e;
}

module.exports.runTests = function runTests(){
	log.info('runTests - bluebird!');

	readFileAsync(path.join(textDir, 'random-ass-text-1.txt'), 'utf8')

		//Get and display the first text file
		.then(function printFirstTextFile(text){
			console.log(text);
			return text;
		})
		.catch(function(e){
			log.error('ERROR');
			log.error(e);
			return e;
		})

		//Extract the name of the second text file from the first text file
		.then(extractNextTextfileName)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR REPLACING TEXT - extractNextTextfileName'))

		//Get the second text file
		.then(readUtf8FileAsync)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR GETTING SECOND TEXT FILE - readUtf8FileAsync'))

		//Get and display the second text file
		.then(function printTextFile(text){
			console.log(text);
			return text;
		})
		.catch(function(e){
			log.error('ERROR');
			log.error(e);
			return e;
		})

		//Extract the name of the third text file from the second text file
		.then(extractNextTextfileName)
		.catch(function extractNextTextfileNameERR(e){
			log.error('ERROR HANDLING SECOND TEXT FILE');
			log.error(e);
			return e;
		})


		//Get and display the second text file
		.then(function printTextFile(text){
			console.log(text);
			return text;
		})
		.catch(function(e){
			log.error('ERROR');
			log.error(e);
			return e;
		});
		// .then(function handleSecondTextFile(text){
		// 	console.log(text);
		// })

}