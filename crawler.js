var xray = require('x-ray');

function checkConfig(conf){
	let good = true;
	//Extract
	if(conf.extract === undefined){
		console.log('Undefined extract config');
		good = false;
	} else if(typeof(conf.extract) !== 'object'){
		console.log('extract config should be a js object');
		good = false;
	} else {
		if(conf.extract.base_url === undefined){
			console.log('Undefined extract.base_url config');
			good = false;
		}

		if(conf.extract.options === undefined) {
			console.log('Undefined extract.options config');
			good = false;
		} else if(typeof(conf.extract.options) !== 'function'){
			console.log('extract.options should be a js function');
			good = false;
		}
	}

	//Transform
	if(conf.transform === undefined){
		console.log('Undefined transform config');
		good = false;
	} else if(typeof(conf.transform) !== 'function'){
		console.log('transform config should be a js function');
		good = false;
	}

	//Load
	if(conf.load === undefined){
		console.log('Undefined load config');
		good = false;
	} else if(typeof(conf.load) !== 'function'){
		console.log('load config should be a js function');
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
		props : undefined
	};
	
	let has_root_scope = (conf.root_scope !== undefined && typeof(conf.root_scope) === 'string');
	let has_pagination = (conf.pagination !== undefined && typeof(conf.pagination) === 'string');
	let has_limit = (conf.limit !== undefined && typeof(conf.limit) === 'number');
	
	if(conf.filters !== undefined){
		console.log('Setting filters');
		var x = xray({ filters: conf.filters });
	} else {
		var x = xray();
	}

	if(config.extract.options === undefined) {
		callback('Undefined options config', undefined);
		return;
	} else {
		let options  = config.extract.options(x);
		
		if(options.props === undefined) {
			callback('Undefined options.props config', undefined);
			return;
		}
		console.log('Settings props');
		conf.props = options.props;
		
	}

	console.log('Begin crawling ' + conf.base_url);

	//X-ray callback
	function clbk(err, res){
		res = config.transform(res);
		config.load(res);
		if(callback !== undefined && (typeof(callback) === 'function'))
			callback(err, res);
	}

	if(!has_root_scope) {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(clbk);
			console.log('pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)(clbk);
			console.log('pagination');
		} else {
			x(conf.base_url, conf.props)(clbk);
			console.log('non');
		}
	}
	else {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(clbk);
			console.log('scope + pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)(clbk);
			console.log('scope + pagination');
		} else {
			x(conf.base_url, conf.props)(clbk);
			console.log('scope');
		}
	}
};

module.exports = crawler;