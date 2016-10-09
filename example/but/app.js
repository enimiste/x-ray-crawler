var crawler = require('../../crawler.js');
var config = require('./config.js');
var debug = require('debug')('nit:app');

debug('Run');
crawler(config(__dirname), function(errs, results){
	if(errs.length > 0) debug(errs);
	else {
		//already processed in the load fuction in config.js file
		debug('Success');
	}
});