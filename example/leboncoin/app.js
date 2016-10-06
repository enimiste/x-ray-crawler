var crawler = require('../../crawler.js');

//Foreach site :
var config = require('./config.js');

crawler(config(), function(err, result){
	if(err) console.log(err);
	else {
		console.log('Success');
	}
});
//End foreach site