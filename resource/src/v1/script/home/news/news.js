/**
 * 新闻模块
 * @author ronizhang
 */
(function(namespace){
	
	var News = function(){
		
	};
	
	News.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	News.prototype.init = function(){
		var instance = this;
		//初始化tab
		var tabs = $("#module1 ul.chaoW-tab-list li");
		var config = {
				'container' : $("#module1"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
				'syncChange':true,
	            'changeTimeout':30000,
				'currentIndex' : 0,
				'isAllowClickCurTab' : true,
				'tabs' : tabs,
				'tabPanels' : $("#module1 .news_panel"),
				'onMouseEnterTab' : function(index, e){
					if($(tabs[index]).hasClass('select')){//移动到当前元素
						$(tabs[index]).find('a').css('text-decoration', 'underline');
					}
				},
				'onMouseLeaveTab' : function(index, e){
					$(tabs[index]).find('a').css('text-decoration', 'none');
				},
	            'onTabAutoChange':function(index){
					for(var i = 0; i < tabs.length; i++){
						if(i === index){
							instance.cache.get(i).reStart();
						}else{
							instance.cache.get(i).stop();
						}
					}
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
//	                var type = $(tabs[index]).attr('_hotype');
//	                requestHotNews(type, 1);
	            },
				'onClickTab' : function(index, e){
					var _a = $(tabs[index]).find("a");
					if($(tabs[index]).hasClass('select')){//点击当前元素
						//上报链接
						haoqq.getStatisInstance().reportClick(e, _a.attr("_tag"), {'href' : _a.attr("href")});
			    		haoqq.getDjlStatisInstance().reportClick(e, _a.attr("_tag"));
						return;
					}
					$(tabs[index]).find('a').css('text-decoration', 'underline');
//					var type = $(tabs[index]).attr('_hotype');
//					requestHotNews(type, 1);
					//上报
					haoqq.getStatisInstance().reportClick(e, _a.attr("_tag"), {'href' : ''});
		    		haoqq.getDjlStatisInstance().reportClick(e, _a.attr("_tag"));
				},
				'afterChangeTab' : function(index, e){
					for(var i = 0; i < tabs.length; i++){
						if(i === index){
							instance.cache.get(i).reStart();
						}else{
							instance.cache.get(i).stop();
						}
					}	
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
					return true;
				}
		};
		this.tabView = haoqq.tab.TabView(config);
		//初始化图片循环
		this.loopView1 = haoqq.util.createLoopView();
		this.loopView2 = haoqq.util.createLoopView();
		this.loopView3 = haoqq.util.createLoopView();
		this.loopView4 = haoqq.util.createLoopView();
		
		this.cache = haoqq.util.createCache();
		this.cache.set('0', this.loopView1);
		this.cache.set('1', this.loopView2);
		this.cache.set('2', this.loopView3);
		this.cache.set('3', this.loopView4);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	News.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	News.prototype.run = function(){
		var _panel = $("#module1 .news_panel");
		this.loopView1.start({
			'loopBlock' : $(_panel[0]).find(".chaoW-imgView").find("li"),
//			'loopWay' : 'fade',
			'stopWhenHover' : true,
			'loopInterval' : 10000,
			'prevButton' : $(_panel[0]).find("a.img-left"),
			'nextButton' : $(_panel[0]).find("a.img-right"),
			'afterChange' : function(){
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}
		});
		this.loopView2.start({
			'loopBlock' : $(_panel[1]).find(".chaoW-imgView").find("li"),
//			'loopWay' : 'fade',
			'stopWhenHover' : true,
			'loopInterval' : 10000,
			'prevButton' : $(_panel[1]).find("a.img-left"),
			'nextButton' : $(_panel[1]).find("a.img-right"),
			'afterChange' : function(){
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}
		});
		this.loopView2.stop();
		this.loopView3.start({
			'loopBlock' : $(_panel[2]).find(".chaoW-imgView").find("li"),
//			'loopWay' : 'fade',
			'stopWhenHover' : true,
			'loopInterval' : 10000,
			'prevButton' : $(_panel[2]).find("a.img-left"),
			'nextButton' : $(_panel[2]).find("a.img-right"),
			'afterChange' : function(){
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}
		});
		this.loopView3.stop();
		this.loopView4.start({
			'loopBlock' : $(_panel[3]).find(".chaoW-imgView").find("li"),
//			'loopWay' : 'fade',
			'stopWhenHover' : true,
			'loopInterval' : 10000,
			'prevButton' : $(_panel[3]).find("a.img-left"),
			'nextButton' : $(_panel[3]).find("a.img-right"),
			'afterChange' : function(){
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}
		});
		this.loopView4.stop();
	};
	
	/**
	 * 隐藏
	 */
	News.prototype.hide = function(){
		this.loopView1.stop();
		this.loopView2.stop();
		this.loopView3.stop();
		this.loopView4.stop();
	};
	/**
	 * 展示
	 */
	News.prototype.show = function(){
		this.loopView1.reStart();
		this.loopView2.reStart();
		this.loopView3.reStart();
		this.loopView4.reStart();
	};
	
	namespace.getNewsInstance = haoqq.common.Singleton(function(){
		return new News();
	});
	
	namespace.createNews = function(){
		return new News();
	};
	
}(haoqq.namespace('module')));