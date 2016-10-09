var crawler = require('./crawler.js');
var conf1 = require('./config1.js');
var conf2 = require('./config2.js');

var debug = require('debug')('nit:app');
var fs = require('fs');

debug('Run');
crawler([conf1(), conf2()], function(errs, results){
	if(errs.length > 0) debug(errs);
	else {
		debug('Success');
		fs.writeFile(__dirname + '/output.json', JSON.stringify(results, null, 4));
	}
}, {
	load : false, //false to disable the load action on each config file
	transform : true //false to disable the tranform action on each config file
});