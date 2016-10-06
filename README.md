# x-ray-crawler
Customisable Crawler based on [x-ray](https://github.com/lapwinglabs/x-ray/) scrapper library

## Installation :
- Download the repository into a subdirectory of your project.  
- In your app.js require the crawler as "var crawler = require('path/to/crawler.js');"  

NB : This package is bundled with these libraries :
- [underscorejs](http://underscorejs.org).  
- [stringjs](http://stringjs.com/).  

## Usage :
To crawle a web site as you follow these steps :  
1. Create a config.js file from the config.exemple.js  
```js
var _ = require('underscore');
var S = require('string');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'required',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				//@param xray instance
				options : function(xray) {
					return {
						props : {
							  //TODO : here you put your properties following the x-ray selectors
						}
					};
				},
				filters : {
					filter1 : function(v){
						return 'filtred value';
					}
				}
		},
		transform : function (res) {
			//do transformations if needed
			return res;
		},
		load : function(res) {
			//save data into database or in files
		}
	};
};

```` 

2. Create app.js file in the root of the project from app.exemple.js :
```js
var crawler = require('./crawler.js');

//Foreach site :
var config = require('./config.js');

crawler(config(), function(err, result){
	if(err) console.log(err);
	else {
		//already processed in the load fuction in config.js file
		console.log('Success');
	}
});
//End foreach site

```

3. Customise your config file.
5. Run `nodejs app.js`

