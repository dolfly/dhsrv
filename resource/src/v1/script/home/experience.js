/**
 * 实验相关
 * @author ronizhang
 */
(function(namespace){
	
	var Experiment = {
		'etag1' : function(param){
			//改变量值，可以传参数
			this.num = param[0] + param[1];
			//改事件
			$(document).unbind("keypress");
			//全改了
			this.run();
		},
		'etag2' : function(param){
			this.num = param[0] - param[1];
			
//			$(document).unbind("keypress");
			this.run();
		}
	};
	
	namespace.Experiment = Experiment;

})(haoqq);