var _ = require('underscore');
var S = require('string');
var fs = require('fs');

//ETL config
module.exports = function() {
	return {
		extract : {
				base_url : 'required',
				root_scope : undefined,
				pagination : undefined,
				limit : undefined,
				//@param xray instance
				options : function(xray) {
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
			return res;
		},
		load : function(res) {
			//save data into database or in files
		}
	};
};