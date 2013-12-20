/**
 * 模版基类，所有需要做实验的模块类统一继承该类方法
 * 
 * @author ronizhang
 */
(function(namespace){
	
	var Template = function(){
		
		Template.prototype.start = function(){
			var param = [].slice.call(arguments, 0);
			this.init(param);
			this.initEvent(param);
			this.run(param);	
		};
		/**
		 * 实验初始化
		 */
		Template.prototype.expInit = function(){
			//使得对象可监听
			haoqq.common.Event.extendEvent(this);
		};
		/**
		 * 进行实验
		 */
		Template.prototype.expStart = function(){
			var param = [].slice.call(arguments, 0);
			//实验
			this.trigger(this.getEtag(), param);
		};
		/**
		 * 获取全局tag号
		 */
		Template.prototype.getEtag = function(){
			var cache = haoqq.util.getCacheInstance();
			var _etag = cache.get("labno");
			if(!_etag){
				var hiddens = $("#ab_exp_lab_fileds").find("input");
				if(hiddens.length > 0){
					var ary = [];
					hiddens.each(function(){
						ary.push($(this).val());
					});
	                _etag = ary.join("#");
					cache.set("labno", _etag);
	            }
			}
			return _etag;
		};
		/**
		 * 初始化变量
		 */
		Template.prototype.init = function(){
			
		};
		/**
		 * 初始化事件
		 */
		Template.prototype.initEvent = function(){
			
		};
		/**
		 * do something
		 */
		Template.prototype.run = function(){
			
		};
	};
	
	namespace.Template = Template;
	
})(haoqq.namespace('common'));