# x-ray-crawler
Customisable Crawler based on [x-ray](https://github.com/lapwinglabs/x-ray/) scrapper library

## Installation :
- Download the repository into a subdirectory of your project.  
- In your app.js require the crawler as "var crawler = require('path/to/crawler.js');"  

## Usage :
To crawle a web site as you follow these steps :  
1. Create a config.js file (see example/jumia/config.js).  
2. Create app.js file in the root of the project.  
3. Require the crawler and the config.js.  
4. Call the crawler on the config file :  
```js

var fs = require('fs');
var crawler = require('../../crawler.js');

//Foreach site :
var config = require('./config.js');

crawler(config, function(err, result){
	if(err) console.log(err);
	else {
		console.log('Success');
		fs.writeFile(__dirname + '/output4.json', JSON.stringify(result, null, 4));
	}
});
//End foreach site

```
5. Run `nodejs app.js`
6. If all go good you will see a generated file under the root directory called output4.json

