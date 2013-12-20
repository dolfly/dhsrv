/**
 * 发现精彩
 * @author ronizhang
 */
(function(namespace){
	
	var FindHighLight = function(){
		
	};
	
	FindHighLight.prototype = new haoqq.common.Template();
	var findCode = {
		0 : 'find_movie',
		1 : 'find_tv',
		2 : 'find_show',
		3 : 'find_game',
		4 : 'find_amazing',
		5 : 'find_bagua',
		6 : 'find_happy'
	};
	var downloadPage = function(index){
		var _panel = $("#mm_" + index);
		if(_panel.children().length <= 0){
			_panel.load("findHl.htm",{
				'g_tk':haoqq.util.getACSRFToken(g_cookie.get("uiid")),
				'code':findCode[index]
			},function(){
				_panel.find("img.sync").lazyload({effect : 'fadeIn',threshold : 150});
            });
		}
	};
	/**
	 * 下载发现精彩模块
	 */
	var downloadModel = function(e){
		var instance = haoqq.find.getFindHighLightInstance();
		if(instance.hasDownloadModel){//已经下载过
			$(window).unbind('scroll', downloadModel);
		}else if($(window).scrollTop() > 1200){//没有下载过，且可以开始下载
			instance.hasDownloadModel = true;//必须一进来就设，防止重复下载
			$.getScript(g_jsDomain + "findHl.js?ver=" + g_version, function(){
				//初始化tab
				var tabs = $("#findHlTab li");
				var config = {
						'container' : instance.container,
						'currentClassName' : 'hover',
						'tabChangeType' : 'click',
						'syncChange':true,
				        'changeTimeout':15000,
						'currentIndex' : instance.defaultIndex,
						'isAllowClickCurTab' : false,
						'tabs' : tabs,
						'tabPanels' : instance.container.find(".jc_main .findPanel"),
						'onClickTab' : function(index, e){
							downloadPage(index);
						},
						'onTabAutoChange' : function(index){
							downloadPage(index);
						},
						'prevButton' : instance.container.find(".jc_prev"),
						'nextButton' : instance.container.find(".jc_next"),
						'onClickPrevOrNextChange' : function(index){
							downloadPage(index);
						}
				};
				haoqq.tab.TabView(config);
				//默认加载
				downloadPage(instance.defaultIndex);
			});
		}
	}
	/**
	 * 初始化变量
	 * @override
	 */
	FindHighLight.prototype.init = function(){
		var instance = this;
		this.defaultIndex = 0;
		this.hasDownloadModel = false;
		this.container = $("#findHl");
		//加载资源
		if($(window).scrollTop() > 1200){//某些浏览器一刷新就在下面
			downloadModel();
		}else{
			$(window).bind('scroll', downloadModel);
		}
//		window.setTimeout(function(){
//			
//		}, 2000);
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	FindHighLight.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	FindHighLight.prototype.run = function(){
		
	};
	
	namespace.getFindHighLightInstance = haoqq.common.Singleton(function(){
		return new FindHighLight();
	});
	
	namespace.createFindHighLight = function(){
		return new FindHighLight();
	};
	
}(haoqq.namespace('find')));