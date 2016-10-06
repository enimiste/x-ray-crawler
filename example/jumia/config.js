var config = {
	filters : {
		trim : function(v){
			return 'Hello';
		}
	},
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
	}
};

module.exports = config