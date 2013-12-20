/**
 * 发现精彩-游戏
 * @author ronizhang
 */
(function(namespace){
	
	var FindGame = function(){
		
	};
	
	FindGame.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindGame.prototype.init = function(){
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindGame.prototype.initEvent = function(){
		var ul1 = $("#mm_3 .ul_1"),
			ul2 = $("#mm_3 .ul_2"),
			ul3 = $("#mm_3 .ul_3");
		ul2.hover(function(e){
			ul2.animate({
				left : '160px'
			}, 150, 'swing');
		}, function(e){
			var target = e.relatedTarget;
    		if(haoqq.util.isAncestor(ul3[0], target)){
    			return;
        	}
			ul2.animate({
				left : '488px'
			}, 150, 'swing');
		});
		
		ul3.hover(function(e){
			ul3.animate({
				left : '380px'
			}, 150, 'swing');
		}, function(e){
			ul3.animate({
				left : '706px'
			}, 150, 'swing');
		});
	};
	/**
	 * do something
	 * @override
	 */
	FindGame.prototype.run = function(){
		
	};
	
	namespace.getFindGameInstance = haoqq.common.Singleton(function(){
		return new FindGame();
	});
	
	namespace.createFindGame = function(){
		return new FindGame();
	};
	
}(haoqq.namespace('find')));