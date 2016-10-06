var xray = require('x-ray');

/**
* @param xray module
* @param config json
* @param callback function
*/
function crawler (config, callback) {
	let conf = config || {
		filters : undefined,
		base_url : undefined,
		root_scope : undefined,
		pagination : undefined,
		limit : undefined,
		props : undefined,
	};
	if(conf.base_url === undefined){
		callback('Undefined base_url config', undefined);
		return;
	}

	let has_root_scope = (conf.base_url !== undefined && typeof(conf.base_url) === 'string');
	let has_pagination = (conf.base_url !== undefined && typeof(conf.base_url) === 'string');
	let has_limit = (conf.base_url !== undefined && typeof(conf.base_url) === 'number');
	
	if(conf.filters !== undefined){
		var x = xray({ filters: config.filters });
	} else {
		var x = xray();
	}

	if(config.options === undefined) {
		callback('Undefined options config', undefined);
		return;
	} else {
		let options  = config.options(x);
		if(options.props === undefined) {
			callback('Undefined props config', undefined);
			return;
		}
		else
			conf.props = options.props;
	}

	console.log('Begin crawling ' + conf.base_url);
	if(!has_root_scope) {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(callback);
			console.log('pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.props)
				.paginate(conf.pagination)(callback);
			console.log('pagination');
		} else {
			x(conf.base_url, conf.props)(callback);
			console.log('non');
		}
	}
	else {
		if(has_pagination && has_limit) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)
				.limit(conf.limit)(callback);
			console.log('scope + pagination + limit');
		} else if(has_pagination) {
			x(conf.base_url, conf.root_scope, conf.props)
				.paginate(conf.pagination)(callback);
			console.log('scope + pagination');
		} else {
			x(conf.base_url, conf.props)(callback);
			console.log('scope');
		}
	}
};

module.exports = crawler;