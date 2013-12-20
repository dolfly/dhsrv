/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var HotwordTip = function(){
		
	};
	
	HotwordTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	HotwordTip.prototype.init = function(){
		this.tip = $("#ts-tuijian");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	HotwordTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-tuijian a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	HotwordTip.prototype.run = function(){
		
	};
	
	HotwordTip.prototype.show = function(){
		//计算位置
		var left = $("#hotArtcleClosed").offset().left - 15;
		var top = $("#hotArtcleClosed").offset().top - 57;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	HotwordTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	HotwordTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getHotwordTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new HotwordTip());
	});
	
	namespace.createHotwordTip = function(){
		return haoqq.common.Event.extendEvent(new HotwordTip());
	};
	
}(haoqq.namespace('tips')));