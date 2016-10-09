var _ = require('underscore');
var S = require('string');
var fs = require('fs');
var debug = require('debug')('nit:website');

//ETL config
module.exports = function(base_path) {
	var base_path = path || __dirname;
	return {
		extract : {
				base_url : 'required',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				use_phantom : false, //To use with caution
				//@param xray instance
				properties : function(xray) {
					return {
						props : {
							  //TODO : here you put your properties following the x-ray selectors
						}
					};
				},
				filters : {
					filter1 : function(v){
						return 'filtred value';
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
			/*fs.exists(base_path, (exists) => {
			  if(exists) fs.writeFile(base_path + '/output.json', JSON.stringify(res, null, 4));
 			});*/
		}
	};
};