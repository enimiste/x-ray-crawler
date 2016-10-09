var _ = require('underscore');
var S = require('string');
var fs = require('fs');
var debug = require('debug')('nit:website');

//ETL config
module.exports = function(path) {
	var base_path = path || __dirname;
	return {
		extract : {
				base_url : 'https://www.amazon.com/books-used-books-textbooks/b/ref=sd_allcat_bo?ie=UTF8&node=283155',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				use_phantom : false,
				//@param xray instance
				properties : function(xray) {
					return {
						props : {
							  produits : xray('.a-carousel li', [{
							  	href : 'a@href',
							  	title : '.acs_product-title span | trim',
							  	author : '.acs_product-metadata__contributors a | trim',
							  	rating : '.acs_product-rating span | trim | rating',
							  	price_old : '.acs_product-price .acs_product-price__list | trim',
							  	price : '.acs_product-price__buying | trim',
							  	image : 'img@src'
							  }]),
							  category : '.nav-subnav .nav-b span'
						}
					};
				},
				filters : {
					trim : function(v){
						return S(v).trim().s;
					},
					rating : function(v){
						return S(v).strip('(', ')', ',').s;
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
			fs.exists(base_path, (exists) => {
			  if(exists) fs.writeFile(base_path + '/output.json', JSON.stringify(res, null, 4));
 			});
		}
	};
};