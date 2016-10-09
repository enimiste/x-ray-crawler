var xray = require('x-ray');
var debug = require('debug')('nit:crawler');


function checkConfig(conf){
	let good = true;
	//Extract
	if(conf.extract === undefined){
		debug('Undefined extract config');
		good = false;
	} else if(typeof(conf.extract) !== 'object'){
		debug('extract config should be a js object');
		good = false;
	} else {
		if(conf.extract.base_url === undefined){
			debug('Undefined extract.base_url config');
			good = false;
		}

		if(conf.extract.properties === undefined) {
			debug('Undefined extract.properties config');
			good = false;
		} else if(typeof(conf.extract.properties) !== 'function'){
			debug('extract.properties should be a js function');
			good = false;
		}

		if(conf.extract.use_phantom !== undefined && typeof(conf.extract.use_phantom) !== 'boolean') {
			debug('extract.use_phantom should be a js boolean');
			good = false;
		}
	}

	//Transform
	if(conf.transform === undefined){
		debug('Undefined transform config');
		good = false;
	} else if(typeof(conf.transform) !== 'function'){
		debug('transform config should be a js function');
		good = false;
	}

	//Load
	if(conf.load === undefined){
		debug('Undefined load config');
		good = false;
	} else if(typeof(conf.load) !== 'function'){
		debug('load config should be a js function');
		good = false;
	}

	return good;
}
/**
* @param xray module
* @param config json
* @param callback function
*/
function crawler (config, callback) {
	if(!checkConfig(config)) return;

	let conf = config.extract || {
		filters : undefined,
		base_url : undefined,
		root_scope : undefined,
		pagination : undefined,
		limit : undefined,
		props : undefined,
		use_phantom : false
	};
	
	let has_root_scope = (conf.root_scope !== undefined && typeof(conf.root_scope) === 'string');
	let has_pagination = (conf.pagination !== undefined && typeof(conf.pagination) === 'string');
	let has_limit = (conf.limit !== undefined && typeof(conf.limit) === 'number');
	
	if(conf.filters !== undefined){
		debug('Setting filters');
		var x = xray({ filters: conf.filters });
	} else {
		var x = xray();
	}

	if(conf.use_phantom === true){
		debug('Setting phantom');
		var phantom = require('x-ray-phantom');
		x = x.driver(phantom({ webSecurity : false }));
	}

	if(config.extract.properties === undefined) {
		callback('Undefined properties config', undefined);
		return;
	} else {
		let properties  = config.extract.properties(x);
		
		if(properties.props === undefined) {
			callback('Undefined properties.props config', undefined);
			return;
		}
		debug('Settings props');
		conf.props = properties.props;
		
	}

	debug('Begin crawling ' + conf.base_url);

	//X-ray callback
	function clbk(err, res){
		if(!err){
			res = config.transform(res);
			config.load(res);
		}
		if(callback !== undefined && (typeof(callback) === 'function'))
			callback(err, res);
	}

	if(!has_root_scope) {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(clbk);
			debug('Pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)(clbk);
			debug('Pagination');
		} else {
			x(conf.base_url, conf.props)(clbk);
			debug('Without pagination and limit');
		}
	}
	else {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(clbk);
			debug('Scope + pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)(clbk);
			debug('Scope + pagination');
		} else {
			x(conf.base_url, conf.props)(clbk);
			debug('Without pagination and limit');
		}
	}
};

module.exports = crawler;