/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var ComponentTip = function(){
		
	};
	
	ComponentTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	ComponentTip.prototype.init = function(){
		this.tip = $("#ts-bianji");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	ComponentTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-bianji a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	ComponentTip.prototype.run = function(){
		
	};
	
	ComponentTip.prototype.show = function(){
		//计算位置
		var left, top;
		if($("#picTopic").is(":visible")){
			left = $("#jw-Right").offset().left + 30;
			top = $("#jw-Right").offset().top - 10;
		}else{
			left = $("#jw-Right").offset().left + 30;
			top = $("#jw-Right").offset().top - 90;
		}
//		var left = $("#componentArea").offset().left + 30;
//		var top = $("#componentArea").offset().top - 10;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	ComponentTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	ComponentTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getComponentTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new ComponentTip());
	});
	
	namespace.createComponentTip = function(){
		return haoqq.common.Event.extendEvent(new ComponentTip());
	};
	
}(haoqq.namespace('tips')));