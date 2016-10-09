var _ = require('underscore');
var S = require('string');
var fs = require('fs');
var debug = require('debug')('nit:website');

//ETL config
module.exports = function(path) {
	var base_path = path || __dirname;
	return {
		extract : {
				base_url : 'http://www.but.fr/',
				root_scope : '.orbit-wrapper',
				pagination : undefined,
				limit : undefined,
				use_phantom : true,
				//@param xray instance
				properties : function(xray) {
					return {
						props : {
							  produits : xray('.orbit-slide .ventes:not(:has(.soldes.vhidden))', [{
							  	titre : '.titre.libel_cour a | trim',
							  	href : '.contenu .droite@onclick | href',
							  	image : '.contenu .gauche img@src',
							  	prix_origin : '.contenu .droite .prix .t12 | trim',
							  	prix : '.contenu .droite .prix .t19 | trim',
							  	solde : '.contenu .droite .soldes span | trim'
							  }])
						}
					};
				},
				filters : {
					trim : function(v){
						return S(v).trim().s;
					},
					href : function(v){
						return S(v).between('redir:', ',').strip("'").trim().s;
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