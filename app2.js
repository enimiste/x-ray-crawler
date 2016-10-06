var fs = require('fs');
var crawler = require('./crawler.js');

//Foreach site :
var config = require('./jumia/config.js');

crawler(config, function(err, result){
	if(err) console.log(err);
	else {
		console.log('Success');
		//fs.writeFile('output4.json', JSON.stringify(result, null, 4));
	}
});
//End foreach site