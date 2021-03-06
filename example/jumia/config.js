var _ = require('underscore');
var fs = require('fs');
var S = require('string');
var debug = require('debug')('nit:website');

module.exports = function(path) {
	var base_path = path || __dirname;
	var i = 1;
	return {
		extract : {
			base_url : 'https://www.jumia.ma/telephone/',
			root_scope : '',
			pagination : '.item.-selected + .item a@href',
			limit : undefined,
			use_phantom : false,
			//@param xray instance
			properties : function(xray) {
				return { 
					props : {
						  produits : xray('.sku.-gallery:has(.sale-flag-percent)', [{
							  title	: 'h2 .brand | trim',
							  price : '.price span[data-price]',
							  price_old : '.price.-old span[data-price]',
							  discount : '.sale-flag-percent',
							  href : '.link@href',
							  image : '.image@data-src',
						  }]),
						  categories : xray('.osh-breadcrumb li', [{ title : 'a@title' }]),
					}
				};
			},
			filters : {
				trim : function(v){
					return typeof v === 'string' ? v.trim() : v
				}
			}
		},
		transform : function (res) {
			debug('transform data');
			//Add an id prop to loaded products
			return _.map(res, function(item){
				item.produits = _.map(item.produits, function(p){
					p.id = i++;
					return p;
				});
				item.categories = _.reject(item.categories, function(c){
					return S(c.title).contains('Accueil');
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