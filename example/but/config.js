var _ = require('underscore');
var S = require('string');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'http://www.but.fr/',
				root_scope : '.orbit-wrapper',
				pagination : undefined,
				limit : undefined,
				//@param xray instance
				options : function(xray) {
					return {
						props : {
							  produits : xray('.orbit-slide .ventes', [{
							  	titre : 'a'
							  }])
						}
					};
				},
				filters : {
					trim : function(v){
						return S(v).trim().s;
					}
				}
		},
		transform : function (res) {
			//do transformations if needed
			return res;
		},
		load : function(res) {
			//save data into database or in files
			console.log(res);
		}
	};
};