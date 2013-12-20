/**
 * 充值模块
 * @author ronizhang
 */
(function(namespace){
	
	var RechargeView = function(){
		
	};
	
	RechargeView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	RechargeView.prototype.init = function(){
		//tab切换
		var tabs = $("#module7 ul.chaoW-tab-list li");
		var config = {
				'container' : $("#module7"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#module7 .rgt-pages-pay")
		};
		haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	RechargeView.prototype.initEvent = function(){
		
	};
	/**
	 * do something
	 * @override
	 */
	RechargeView.prototype.run = function(){
		
	};
	
	namespace.getRechargeViewInstance = haoqq.common.Singleton(function(){
		return new RechargeView();
	});
	
	namespace.createRechargeView = function(){
		return new RechargeView();
	};
	
}(haoqq.namespace('module')));