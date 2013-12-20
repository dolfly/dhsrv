/**
 * 发现精彩-电视剧
 * @author ronizhang
 */
(function(namespace){
	
	var FindVShow = function(){
		
	};
	
	FindVShow.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindVShow.prototype.init = function(){
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindVShow.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindVShow.prototype.run = function(){
		
	};
	
	namespace.getFindVShowInstance = haoqq.common.Singleton(function(){
		return new FindVShow();
	});
	
	namespace.createFindVShow = function(){
		return new FindVShow();
	};
	
}(haoqq.namespace('find')));