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

var printTextFile = function printTextFile(text){
	console.log(text);
	return text;
}

/**
 * Grab a bunch of text files, use each of the first 2 to get the location of the next.
 * Treasure hunt!
 */
module.exports.runTests = function runTests(){
	log.info('runTests - bluebird!');

	readFileAsync(path.join(textDir, 'random-ass-text-1.txt'), 'utf8')
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR GETTING TEXTFILE 1 - readFileAsync'))
		//Get and display the first text file
		.then(printTextFile)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR DISPLAYING TEXTFILE 1 - printTextFile'))
		//Extract the name of the second text file from the first text file
		.then(extractNextTextfileName)
		.catch(_.partialRight(showPromiseErrMsg,
			'ERROR FINDING TEXTFILE 2 NAME IN TEXTFILE 1; extractNextTextfileName'))
		//Get the second text file
		.then(readUtf8FileAsync)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR GETTING TEXTFILE 2 - readUtf8FileAsync'))
		//Get and display the second text file
		.then(printTextFile)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR DISPLAYING TEXTFILE 2 - printTextFile'))
		//Extract the name of the third text file from the second text file
		.then(extractNextTextfileName)
		.catch(_.partialRight(showPromiseErrMsg,
			'ERROR GETTING TEXTFILE 2 NAME; extractNextTextfileName'))
		//Get and display the second text file
		.then(printTextFile)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR DISPLAYING TEXTFILE 2'))
		//Get the third text file
		.then(readUtf8FileAsync)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR GETTING TEXTFILE 2 - readUtf8FileAsync'))
		//Get and display the third text file
		.then(printTextFile)
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR DISPLAYING TEXTFILE 2 - printTextFile'))
}



//Get the list of files you need, and the corresponding numbers, along with the name of the
//		ordering file
//
//Get the order to stich the files together to get the filename with the final message
//load the final text file
//Display the final text file
//Emit the final text file to express, show in Browser

module.exports.treasureHunt = function treasureHunt() {
	console.log('in treasure hunt!');

	readFileAsync(path.join(textDir, 'file_pile/file_list.json'), 'utf8')
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR: readFileAsync FAILED TO LOAD file_list.json'))

		.then(function parseJSON(json){
			return JSON.parse(json);
		})
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR: parsing file_list.json FAILED; parseJSON'))

		.then(function displayJSON(json){
			console.log(json);
			return json;
		})
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR: could not display JSON file'))

		.then(function loadFilesFromArr(json){
			var textFiles = _.get(json, 'files');

			return _.reduce(textFiles, function buildTextLoaderArr(loadFilePromises, fileData) {
				var filePath = path.join(__dirname, 'files/file_pile', fileData.name);
				loadFilePromises.push(readUtf8FileAsync(filePath));
				return loadFilePromises;
			}, []);

		})

		.all().then(function(textFiles){
			console.log(textFiles);
		})
		.catch(_.partialRight(showPromiseErrMsg, 'ERROR: could not load all text files'));


}