var _ = require('underscore');
var fs = require('fs');

module.exports = function() {
	var i = 1;
	return {
		extract : {
			base_url : 'https://www.jumia.ma/telephone/',
			root_scope : '',
			pagination : '.item.-selected + .item a@href',
			limit : 1,
			//@param xray instance
			options : function(xray) {
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
			console.log('Map');
			//Add an id prop to loaded products
			return _.map(res, function(item){
				item.produits = _.map(item.produits, function(p){
					p.id = i++;
					return p;
				});
				return item;
			});
		},
		load : function(res) {
			console.log('Load');
			fs.writeFile(__dirname + '/output.json', JSON.stringify(res, null, 4));
		}
	};
};