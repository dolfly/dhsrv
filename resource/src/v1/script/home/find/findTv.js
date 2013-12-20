/**
 * 发现精彩-电视剧
 * @author ronizhang
 */
(function(namespace){
	
	var FindTv = function(){
		
	};
	
	FindTv.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	FindTv.prototype.init = function(){
		//初始化tab
		var tabs = $("#mm_1 .jc_tab a.ttab");
		var config = {
				'container' : $("#mm_1"),
				'currentClassName' : 'hover',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#mm_1 .tvTab"),
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
	FindTv.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindTv.prototype.run = function(){
		
	};
	
	namespace.getFindTvInstance = haoqq.common.Singleton(function(){
		return new FindTv();
	});
	
	namespace.createFindTv = function(){
		return new FindTv();
	};
	
}(haoqq.namespace('find')));