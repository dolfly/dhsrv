(function(namespace) {
	
	var Mode = function(){
		
	};
	
	Mode.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Mode.prototype.init = function(){
		this.num = 10;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Mode.prototype.initEvent = function(){
		var _this = this;
		$(document).keypress(function(e){
			if(e.keyCode == 13){
				alert(_this.num);
			}
		});
	};
	/**
	 * do something
	 * @override
	 */
	Mode.prototype.run = function(){
		alert(this.num);
	};
	
	namespace.getModeInstance = haoqq.common.Singleton(function(){
		return new Mode();
	});
	
	namespace.createMode = function(){
		return new Mode();
	};
	
}) (haoqq.namespace('test1'));

$(document).ready(function(){
	//实验测试
	var t = haoqq.test1.getModeInstance();
//	t.init();
	t.expInit();
	t.addListener("etag1", function(param){
		this.num = param[0] + param[1];
		
		$(document).unbind("keypress");
		this.run();
	});
	t.addListener("etag2", function(param){
		this.num = param[0] - param[1];
		
		this.run();
	});
	
	t.start();
	t.expStart(1, 2);
});