var crawler = require('../../crawler.js');

var config = require('./config.js');

crawler(config(), function(err, result){
	if(err) console.log(err);
	else {
		//already processed in the load fuction in config.js file
		console.log('Success');
	}
});