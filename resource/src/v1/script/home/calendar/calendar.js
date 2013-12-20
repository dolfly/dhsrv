/**
 * 日历视图
 * @author ronizhang
 */
(function(namespace){
	
	var Calendar = function(){
		
	};
	
	Calendar.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Calendar.prototype.init = function(){
		var date = new Date();
		this.lObj = $.getLunar(date);
		
		$("#weekday").text(date.getDate());
		$("#lunarday").text("农历"+this.lObj.lunar.month+this.lObj.lunar.day);
		
		var _today = new StringBuffer();
		_today.append(date.getFullYear());
		_today.append(".");
		_today.append(date.getMonth()+1);
		_today.append(".");
		_today.append(date.getDate());
		_today.append(" ");
		_today.append(this.lObj.week);
		$("#dateday").text(_today.toString());
//		$("#calendarArea").css('display', 'inline');
		date = null;
		_today = null;
		delete this.lObj;
		
		$("#calendarArea").calendar();
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Calendar.prototype.initEvent = function(){
//		$("#calendarArea").click(function(e){
//			var _href = "http://www.soso.com/q?w=%CD%F2%C4%EA%C0%FA&cid=dh.so";
//			//上报
//			haoqq.getStatisInstance().reportClick(e, "dhv1.head.date", {
//				'href' : _href		
//			});
//			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.date");
//			
//			window.open(_href);
//		});
		
	};
	/**
	 * do something
	 * @override
	 */
	Calendar.prototype.run = function(){
	};
	
	namespace.getCalendarInstance = haoqq.common.Singleton(function(){
		return new Calendar();
	});
	
	namespace.createCalendar = function(){
		return new Calendar();
	};
	
}(haoqq.namespace('calendar')));