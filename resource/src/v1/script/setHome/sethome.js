try {
//	//document.domain = window.location.host.substring(window.location.host.indexOf(".") + 1);
	document.domain = 'qq.com';
} catch(e) {} ! location.origin && (location.origin = location.protocol + '//' + location.host);

if (typeof(console) === 'undefined') {
	window.console = {
		log: function() {}
	};
}
//全局cookie
var g_cookie = new haoqq.Cookie();
//全局持久化存储对象
var g_storge = new haoqq.Storage();
//静态资源域
var t_context = $("#context");
var g_jsDomain = t_context.attr("resourcePath") 
				+ "/" + t_context.attr("floderVer") 
				+ "/script/";
var g_cssDomain = t_context.attr("resourcePath") 
				+ "/" + t_context.attr("floderVer") 
				+ "/css/";
var g_imgDomain = t_context.attr("resourcePath") 
	+ "/" + t_context.attr("floderVer") 
	+ "/img/";
var g_version = t_context.attr("version");
t_context = null;
/**
 * 设置主页
 */
(function() {
	$(document).ready(function() {
		/*搜索初始化*/
		var searchCtr = new haoqq.search.SearchController({
			'form' : $("#searchForm"),
			'queryInput' : $("#searchInput")
		});
		/*统计初始化*/
		var statis = new haoqq.Statis();
		statis.init();
		
		var browse_type=$("#browse_type").val();
		window.location.hash=browse_type+"_sh";
		/**
		 * 点击也签处理
		 */
		$(".item-tit").each(function() {
			$(this).click(function(e) {
				e.preventDefault();
				var bt = $(this).attr("_bt");
				if (bt) {
					$(".item-content").hide("slow");
					if ($(this).hasClass("open")) {
						$(this).removeClass("open");
						$(this).addClass("closed");
						$(".item-content").each(function() {
							if ($(this).attr("_bt") === bt) {
								$(this).hide("slow");
							}
						});
						$(".item-tit").each(function(){
							 if($(this).hasClass("open")&&$(this).attr("_bt") != bt){
								  $(this).removeClass("open");
								  $(this).addClass("closed");
							 }
						});
					} else {
						$(this).removeClass("closed");
						$(this).addClass("open");
						$(".item-content").each(function() {
							if ($(this).attr("_bt") === bt) {
								$(this).show("slow");
							} else {
								$(this).hide("slow");
							}
						});
						$(".item-tit").each(function(){
							 if($(this).hasClass("open")&&$(this).attr("_bt") != bt){
								  $(this).removeClass("open");
								  $(this).addClass("closed");
							 }
						});
					}
				}
			});
		});
	});
})();