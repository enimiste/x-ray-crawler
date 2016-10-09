var fs = require('fs');
var _ = require('underscore');
var S = require('string');
var debug = require('debug')('nit:website');

//ETL config
module.exports = function(path) {
	var base_path = path || __dirname;
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
							  	  categories : xray('.item_supp', ['@text | trim | delnt | categorie']),
							  }]),
						}
					};
				},
				filters : {
					trim : function(v){
						return S(v).trim().s;
					},
					delbsp : function(v){
						return S(v).replaceAll(/\s+/g, '').s;
					},
					delnt : function(v){
						return S(v).replaceAll(/[\n\t]/g, '').s;
					},
					categorie : function(v){
						return S(v).replaceAll(/\s+/g, ' ').s;
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
			fs.exists(base_path, (exists) => {
			  if(exists) fs.writeFile(base_path + '/output.json', JSON.stringify(res, null, 4));
 			});
		}
	};
};