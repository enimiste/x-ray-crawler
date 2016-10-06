var xray = require('x-ray');

var x = xray();

x('https://www.jumia.ma/telephone/', 
 {
  items : x('.sku.-gallery:has(.sale-flag-percent)', [{
	  title	: 'h2 .brand',
	  price : '.price span[data-price]',
	  price_old : '.price.-old span[data-price]',
	  discount : '.sale-flag-percent',
	  href : '.link@href',
	  image : '.image@data-src',
  }]),
  categories : x('.osh-breadcrumb li', [{ title : 'a@title' }])
})
.paginate('.item.-selected + .item a@href')
.limit(1)
.write('output.json');