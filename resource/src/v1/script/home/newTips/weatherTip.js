/**
 * tips data
 * @author ronizhang
 */
(function(namespace){
	
	var WeatherTip = function(){
		
	};
	
	WeatherTip.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	WeatherTip.prototype.init = function(){
		this.tip = $("#ts-tianqi");
		this.isshow = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	WeatherTip.prototype.initEvent = function(){
		var instance = this;
		$("#ts-tianqi a").click(function(e){
			e.preventDefault();
			instance.close();
		});
	};
	/**
	 * do something
	 * @override
	 */
	WeatherTip.prototype.run = function(){
		
	};
	
	WeatherTip.prototype.show = function(){
		//计算位置
		var left = $("#topWeatherArea").offset().left + $("#topWeatherArea").width() - 11;
		var top = $("#topWeatherArea").offset().top + 7;
		this.tip.css({'left' : left, 'top' : top}).show();
		this.tip.show();
		this.trigger('show');
		this.isshow = true;
	};
	
	WeatherTip.prototype.close = function(){
		this.tip.hide();
		this.trigger('close');
		this.isshow = false;
	};
	
	WeatherTip.prototype.isShow = function(){
		return this.isshow;
	};
	
	namespace.getWeatherTipInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new WeatherTip());
	});
	
	namespace.createWeatherTip = function(){
		return haoqq.common.Event.extendEvent(new WeatherTip());
	};
	
}(haoqq.namespace('tips')));