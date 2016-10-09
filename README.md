# x-ray-crawler
Customisable Crawler based on [x-ray](https://github.com/lapwinglabs/x-ray/) scrapper library

## Installation :
- Download the repository into a subdirectory of your project.  
- In your app.js require the crawler as "var crawler = require('path/to/crawler.js');" 
- nodejs version 6 

NB : This package is bundled with these libraries :
- [underscorejs](http://underscorejs.org).  
- [stringjs](http://stringjs.com/).  

## Usage :
To crawle a web site as you follow these steps :  
1. Create a config.js file from the config.exemple.js  
```js
var _ = require('underscore');
var S = require('string');
var fs = require('fs');
var debug = require('debug')('nit:website');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'required',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				use_phantom : false, //To use with caution
				//@param xray instance
				properties : function(xray) {
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
			debug('transform data');
			return res;
		},
		load : function(res) {
			//save data into database or in files
			debug('load data');
		}
	};
};

```` 

2. Create app.js file in the root of the project from app.exemple.js :
```js
var crawler = require('./crawler.js');
var config = require('./config.js');
var debug = require('debug')('nit:app');

debug('Run');
crawler(config(), function(err, result){
	if(err) debug(err);
	else {
		//already processed in the load fuction in config.js file
		debug('Success');
	}
});

```

3. Customise your config file.
5. Run `DEBUG=nit:* nodejs app.js`

