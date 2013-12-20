/**
 * 缓存实现
 * @author ronizhang
 */
(function(namespace){
	
	var Cache = function(){
		this.cache = {};
	};
	
	Cache.prototype.add = function(key, data){
		this.cache[key] == null? this.cache[key] = data : void 0;
	};
	
	Cache.prototype.remove = function(key, data){
		this.cache[key] = null;
	};
	
	Cache.prototype.set = function(key, data){
		this.cache[key] = data;
	};
	
	Cache.prototype.get = function(key){
		return this.cache[key];
	};
	
	Cache.prototype.clear = function(){
		this.cache = {};
	};
	
	Cache.prototype.size = function(){
		var _len = 0;
		for (var i in this.cache) {
			if(this.cache[i] != null){
				_len++;
			}				
        }
		return _len;
	};
	
	namespace.getCacheInstance = haoqq.common.Singleton(function(){
		return new Cache();
	});
	
	namespace.createCache = function(){
		return new Cache();
	};
	
})(haoqq.namespace('util'));