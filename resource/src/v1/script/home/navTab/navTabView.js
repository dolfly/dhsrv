/**
 * tab视图
 * @author ronizhang
 */
(function(namespace){
	
	var navTabView = function(){
		
	};
	
	navTabView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	navTabView.prototype.init = function(){
		this.firstLoad = true;
		var instance = this;
		//初始化tab
		var tabs = $("#mainTab ul li.navTab");
		var config = {
				'container' : $("#mainTab ul"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
			//	'tabTagName' : $("#searchUl li"),
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $(".containerPanel"),
//				'onMouseEnterTab' : function(index, e){
//				},
//				'onMouseLeaveTab' : function(index, e){
//				},
				'onClickTab' : function(index, e){
					if(index==1){//新闻
//						if($("#news-iframe").attr('src') !== "http://news.soso.com/"){
							if(instance.firstLoad){
								var left = $("#mainTab").offset().left;
								var top = $("#mainTab").offset().top + 50;
								$("#wait").css({'left' : left, 'top' : top}).show();
								$("#wait").show();
								instance.firstLoad = false;
							}
							var url="http://"+window.location.hostname+"/news/?g_tk="+haoqq.util.getACSRFToken(g_cookie.get("uiid"));
							$("#news-iframe").attr("src", url);
							$("#news-iframe").bind('load', function(){ 
								$("#wait").hide();
								var height = $("#news-iframe").contents().height();
								var br = haoqq.util.getBrowser();
								if(br!='msie 6'){
								    height=height-34;	
								}
								$("#news-iframe").css("height", height)
//								$("#news-iframe").show();
						        $("#news-iframe").unbind('load');
						    });
//						}
					}
					if($(tabs[index]).hasClass('select')){//点击当前元素
						return;
					}
				},
				'afterChangeTab' : function(index, e){
					//加载图片
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
				}
		};
		haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	navTabView.prototype.initEvent = function(){
		
	};
	/**
	 * do something
	 * @override
	 */
	navTabView.prototype.run = function(){
		
	};
	
	namespace.getNavTabViewInstance = haoqq.common.Singleton(function(){
		return new navTabView();
	});
	
	namespace.createNavTabView = function(){
		return new navTabView();
	};
	
}(haoqq.namespace('nav')));