/**
 * 点击流统计
 * @author ronizhang
 */
(function(namespace) {

	var DjlStatis = function(){
		
	};
	
	DjlStatis.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	DjlStatis.prototype.init = function(){
		
	};
	
	/**
	 * 上报点击流
	 */
	DjlStatis.prototype.reportClick = function(e, hottag){
//		if(!hottag || $.trim(hottag) == ""){
//			return;
//		}
		pgvSendClick({
			hottag : hottag
		});
	};
	
	namespace.getDjlStatisInstance = haoqq.common.Singleton(function(){
		return new DjlStatis();
	});


	namespace.createDjlStatis = function(){
		return new DjlStatis();
	};
	
} (haoqq));