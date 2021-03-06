var crawler = require('./crawler.js');
var config = require('./config.js');
var debug = require('debug')('nit:app');

debug('Run');
crawler([config()], function(errs, results){
	if(errs.length > 0) debug(errs);
	else {
		//already processed in the load fuction in config.js file
		debug('Success');
	}
},
{
	load : false, //false to disable the load action on each config file
	transform : true //false to disable the tranform action on each config file
});