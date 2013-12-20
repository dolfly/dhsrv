/**
 * 发现精彩-电影
 * @author ronizhang
 */
(function(namespace){
	
	var FindMovie = function(){
		
	};
	
	FindMovie.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindMovie.prototype.init = function(){
		//初始化tab
		var tabs = $("#mm_0 .jc_tab a.mtab");
		var config = {
				'container' : $("#mm_0"),
				'currentClassName' : 'hover',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#mm_0 .movieTab"),
				'onClickTab' : function(index, e){
					
				},
				'afterChangeTab' : function(index, e){

				}
		};
		haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindMovie.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindMovie.prototype.run = function(){
		
	};
	
	namespace.getFindMovieInstance = haoqq.common.Singleton(function(){
		return new FindMovie();
	});
	
	namespace.createFindMovie = function(){
		return new FindMovie();
	};
	
}(haoqq.namespace('find')));