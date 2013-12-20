/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var CalendarTip = function(){
		
	};
	
	CalendarTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	CalendarTip.prototype.init = function(){
		this.tip = $("#ts-rili");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	CalendarTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-rili a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	CalendarTip.prototype.run = function(){
		
	};
	
	CalendarTip.prototype.show = function(){
		//计算位置
		var left = $("#calendarArea").offset().left - 20;
		var top = $("#calendarArea").offset().top + 36;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	CalendarTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	CalendarTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getCalendarTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new CalendarTip());
	});
	
	namespace.createCalendarTip = function(){
		return haoqq.common.Event.extendEvent(new CalendarTip());
	};
	
}(haoqq.namespace('tips')));