/**
 * 发现精彩-综艺
 * @author ronizhang
 */
(function(namespace){
	
	var FindAnecdote = function(){
		
	};
	
	FindAnecdote.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindAnecdote.prototype.init = function(){
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindAnecdote.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindAnecdote.prototype.run = function(){
		
	};
	
	namespace.getFindAnecdoteInstance = haoqq.common.Singleton(function(){
		return new FindAnecdote();
	});
	
	namespace.createFindAnecdote = function(){
		return new FindAnecdote();
	};
	
}(haoqq.namespace('find')));