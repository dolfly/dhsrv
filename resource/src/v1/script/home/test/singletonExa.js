/**
 * 单利模式写法
 */
(function(namespace) {
	var Si = function(id){
		this.id = id;
		
		Si.prototype.run = function(){
			alert(this.id);
		}
	};
	
	namespace.getInstance = haoqq.common.Singleton(function(id){
		return new Si(id);
	});
	
	namespace.createSi = function(id){
		return new Si(id);
	};
	
}) (haoqq.namespace('test'));

$(document).ready(function(){
	//单例测试
	//var t = haoqq.test.createSi(3);
	//t.run();
	//var p = haoqq.test.createSi(4);
	//p.run();
	//
	//var ts = haoqq.test.getInstance(3);
	//ts.run();
	//var ps = haoqq.test.getInstance(4);
	//ps.run();
	
});
