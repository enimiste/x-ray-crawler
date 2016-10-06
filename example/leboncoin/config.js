var fs = require('fs');
var _ = require('underscore');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'https://www.leboncoin.fr/_multimedia_/offres/',
				root_scope : '.tabsContent',
				pagination : '#next a@href',
				limit : 1,
				//@param xray instance
				options : function(xray) {
					return {
						props : {
							  produits : xray('.list li:has(h3.item_price)', [{
								  title	: 'h2.item_title | trim',
								  price : 'h3.item_price | delbsp',
								  href : 'a.list_item@href',
								  image : 'span[data-imgsrc]@data-imgsrc',
							  	  categories : xray('.item_supp', ['@text | trim | delnt']),
							  }]),
						}
					};
				},
				filters : {
					trim : function(v){
						return typeof v === 'string' ? v.trim() : v
					},
					delbsp : function(v){
						return typeof v == 'string' ? v.replace(/\s+/g, '') : v;
					},
					delnt : function(v){
						return typeof v == 'string' ? v.replace(/[\n\t]/g, '') : v;
					}
				}
		},
		transform : function (res) {
			console.log('Map');
			return res;
		},
		load : function(res) {
			console.log('Load');
			fs.writeFile(__dirname + '/output4.json', JSON.stringify(res, null, 4));
		}
	};
};