/**
 * 监听模式（也可当观察者模式使用）
 * @author ronizhang
 */
(function(namespace){
	
	var Event = {
		/**	
		 * 添加监听器，有相同的key则使用旧的
		 */
		addListener : function(key, callback){
			var _stack, _callbacks;
			_stack = (_callbacks = this.listeners[key]) != null? _callbacks : this.listeners[key] = [];
			return _stack.push(callback);
		},
		/**
		 * 修改监听器，不存在key则添加
		 */
		modListener : function(key, callback){
			this.removeListener(key);
			return this.addListener(key, callback);
		},
		/**
		 * 移除key下的所有监听器
		 */
		removeListener : function(key){
			var _callbacks;
			return (_callbacks = this.listeners[key]) != null? _callbacks.length = 0 : void 0;
		},
		/**
		 * 触发某个事件
		 */
		trigger : function(){
			var _key, _stack, _callbacks;
			var _flag = true;
			//将入参转换为数组，并返回第一个值：也就是key值
			_key = Array.prototype.shift.call(arguments);
			_stack = (_callbacks = this.listeners[_key]) != null? _callbacks : this.listeners[_key] = [];
			//遍历key下的所有事件
			for(var i=0; i < _stack.length; i++){
				if(_stack[i].apply(this, arguments) === false){
					_flag = false;
				}
			}
			return _flag;
		},
		/**
		 * 使得对象可监听（可观察）
		 */
		extendEvent : function(obj){
			for (var i in this) {
				obj[i] = this[i];				
	        }
			obj.listeners = [];
			return obj;
		}
	};
	
	namespace.Event = Event;
	
})(haoqq.namespace('common'));