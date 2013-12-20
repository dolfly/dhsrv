
function A(){
	
}

var action = {
	init : function(){
		alert("初始化");
	},
	run : function(){
		alert("运行中");
	},
	end : function(){
		alert("结束");
	}
}
$(document).ready(function(){
	//状态模式测试	
	var a = new A();
	haoqq.util.StatesManager.extendStates(a, action);
	alert("开始状态为"+a.getStates());
	a.setStates("init");
	alert("状态为"+a.getStates());
	a.setStates("run");
	alert("状态为"+a.getStates());
	a.setStates("end");
	alert("状态为"+a.getStates());
});