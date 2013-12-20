/**
 * 发现精彩-八卦
 * @author ronizhang
 */
(function(namespace){
	
	var FindBagua = function(){
		
	};
	
	FindBagua.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindBagua.prototype.init = function(){
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindBagua.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindBagua.prototype.run = function(){
		
	};
	
	namespace.getFindBaguaInstance = haoqq.common.Singleton(function(){
		return new FindBagua();
	});
	
	namespace.createFindBagua = function(){
		return new FindBagua();
	};
	
}(haoqq.namespace('find')));