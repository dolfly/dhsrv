/**
 * 发现精彩-搞笑
 * @author ronizhang
 */
(function(namespace){
	
	var FindFunny = function(){
		
	};
	
	FindFunny.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindFunny.prototype.init = function(){
		//初始化tab
		var tabs = $("#mm_6 .jc_tab a.ftab");
		var config = {
				'container' : $("#mm_6"),
				'currentClassName' : 'hover',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#mm_6 .funnyTab"),
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
	FindFunny.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindFunny.prototype.run = function(){
		
	};
	
	namespace.getFindFunnyInstance = haoqq.common.Singleton(function(){
		return new FindFunny();
	});
	
	namespace.createFindFunny = function(){
		return new FindFunny();
	};
	
}(haoqq.namespace('find')));