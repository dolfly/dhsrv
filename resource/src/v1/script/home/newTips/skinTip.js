/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var SkinTip = function(){
		
	};
	
	SkinTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	SkinTip.prototype.init = function(){
		this.tip = $("#ts-huanfu");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	SkinTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-huanfu a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	SkinTip.prototype.run = function(){
		
	};
	
	SkinTip.prototype.show = function(){
		//计算位置
		var left = $("#changeSkin").offset().left - 47;
		var top = $("#changeSkin").offset().top + 15;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	SkinTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	SkinTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getSkinTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new SkinTip());
	});
	
	namespace.createSkinTip = function(){
		return haoqq.common.Event.extendEvent(new SkinTip());
	};
	
}(haoqq.namespace('tips')));