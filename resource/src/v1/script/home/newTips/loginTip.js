/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var LoginTip = function(){
		
	};
	
	LoginTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	LoginTip.prototype.init = function(){
		this.tip = $("#ts-denglu");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	LoginTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-denglu a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	LoginTip.prototype.run = function(){
		
	};
	
	LoginTip.prototype.show = function(){
		//已经登录则不显示
		if(haoqq.user.getUserManagerInstance().hasLoged()){
			return false;
		}
		//计算位置
		var left = $("#loginOutArea").offset().left - this.tip.width() + 30;
		var top = $("#loginOutArea").offset().top - 5;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	LoginTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	LoginTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getLoginTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new LoginTip());
	});
	
	namespace.createLoginTip = function(){
		return haoqq.common.Event.extendEvent(new LoginTip());
	};
	
}(haoqq.namespace('tips')));