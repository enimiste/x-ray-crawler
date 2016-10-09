var fs = require('fs');
var _ = require('underscore');
var S = require('string');
var debug = require('debug')('website');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'https://www.leboncoin.fr/_multimedia_/offres/',
				root_scope : '.tabsContent',
				pagination : '#next a@href',
				limit : 1,
				use_phantom : false,
				//@param xray instance
				properties : function(xray) {
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
			debug('transform data');
			return _.map(res, function(item){
				item.produits = _.map(item.produits, function(p){
					p.categories = _.reject(p.categories, function(cat){
						return S(cat).startsWith('Aujourd');
					});
					return p;
				});
				return item;
			});
		},
		load : function(res) {
			debug('load data');
			fs.writeFile(__dirname + '/output4.json', JSON.stringify(res, null, 4));
		}
	};
};