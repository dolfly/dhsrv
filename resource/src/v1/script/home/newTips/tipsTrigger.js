/**
 * 位置改变时，触发tips重绘
 * @author ronizhang
 */
(function(namespace){
	
	var TipsTrigger = function(){
		
	};
	
	TipsTrigger.prototype.reloadTips = function(){
		this.trigger('reloadTips');
	};
	
	namespace.getTipsTriggerInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new TipsTrigger());
	});
	
	namespace.createTipsTrigger = function(){
		return haoqq.common.Event.extendEvent(new TipsTrigger());
	};
	
}(haoqq.namespace('tips')));