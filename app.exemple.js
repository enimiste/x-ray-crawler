var crawler = require('./crawler.js');
var config = require('./config.js');
var debug = require('debug')('app');

debug('Run');
crawler(config(), function(err, result){
	if(err) debug(err);
	else {
		//already processed in the load fuction in config.js file
		debug('Success');
	}
});