var crawler = require('../../crawler.js');
var amazon = require('../amazon/config.js');
var jumia = require('../jumia/config.js');
var but = require('../but/config.js');
var leboncoin = require('../leboncoin/config.js');

var debug = require('debug')('nit:app');
var fs = require('fs');

debug('Run');
crawler([
	amazon(), 
	jumia(), 
	but(), 
	leboncoin()
	], function(errs, results){
	if(errs.length > 0) debug(errs);
	else {
		debug('Success');
		fs.writeFile(__dirname + '/output.json', JSON.stringify(results, null, 4));
	}
}, {
	load : true,
	transform : true
});