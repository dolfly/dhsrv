/**
 * 单例模式包装器
 * @author ronizhang
 */
(function(namespace){
	namespace.Singleton = function(fn){
		var result;
		return function(){
			return result || (result = fn.apply(this, arguments));
		};
	};
})(haoqq.namespace('common'));