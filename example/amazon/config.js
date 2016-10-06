var _ = require('underscore');
var S = require('string');
var fs = require('fs');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'https://www.amazon.com/books-used-books-textbooks/b/ref=sd_allcat_bo?ie=UTF8&node=283155',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				//@param xray instance
				options : function(xray) {
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
						return S(v).replaceAll('(', '')
								   .replaceAll(')', '')
								   .replaceAll(',', '')
								   .s;
					}
				}
		},
		transform : function (res) {
			//do transformations if needed
			return res;
		},
		load : function(res) {
			//save data into database or in files
			fs.writeFile(__dirname + '/output.json', JSON.stringify(res, null, 4));
		}
	};
};