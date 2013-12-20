/**
 * 名站视图
 * @author ronizhang
 */
(function(namespace){
	
	var MzView = function(){
		
	};
	
	MzView.prototype = new haoqq.common.Template();
	
	/**
	 * 获取下一个序号
	 * @param curNo
	 * @returns
	 */
	function getNextIndex(curNo){
		if(++curNo > 2){
			return 0;
		}
		return curNo;
	}
	
	/**
	 * 初始化变量
	 * @override
	 */
	MzView.prototype.init = function(){
		var instance = this;
		this.hasInitMyNav = false;//是否初始化过我的导航
		//初始化tab
		var tabs = $("#mzTab li");
		var config = {
				'container' : $("#mzTab"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
			//	'tabTagName' : $("#searchUl li"),
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $(".hot-site .mz_div"),
//				'onMouseEnterTab' : function(index, e){
//				},
//				'onMouseLeaveTab' : function(index, e){
//				},
				'onClickTab' : function(index, e){
					if($(tabs[index]).hasClass('select')){//点击当前元素
						return;
					}
				},
				'afterChangeTab' : function(index, e){
					if(index==3){//渲染我的导航
						var myNav = haoqq.mz.getMyNavInstance();
						if(!instance.hasInitMyNav){
							myNav.start();
						}
						myNav.renderPage();
					}
					//加载图片
					haoqq.imgloadtrigger.getTriggerInstance().loadImg();
				}
		};
		haoqq.tab.TabView(config);
		
		this.timer = 0;
		
		this.cur1 = 0;
		this.cur2 = 0;
		this.cur3 = 0;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	MzView.prototype.initEvent = function(){
		var instance = this;
		/*名站hover下拉更多*/
		$(".chaoW-mz li.jw-zindex").hover(function(e){
			var ulobj = $(this).find('div.moreUl');
			if(ulobj){
				instance.timer = setTimeout(function(){
					instance.showUl(ulobj);
					//上报dhv1.hover.hotwords
					haoqq.getStatisInstance().reportClick(e, "dhv1.hover.mz", {});
					haoqq.getDjlStatisInstance().reportClick(e, "dhv1.hover.mz");
	            },300);
			}
		},function(e){
			clearTimeout(instance.timer);
    		var target = e.relatedTarget;
    		var ulobj = $(this).find('div.moreUl');
    		if(ulobj && !haoqq.util.isAncestor($(this)[0], target)){
    			instance.hideUl(ulobj);
        	}
		});
		
		$("div.moreUl").mouseout(function(e){
    		var target = e.relatedTarget;
    		if(!haoqq.util.isAncestor($(this).parent().parent()[0], target)){
    			instance.hideUl($(this));
    		}
    	});
		
		/*游戏专区下一组*/
		//init
		$("#simpleGameDiv .more").click(function(e){
			e.preventDefault();
			instance.cur1 = getNextIndex(instance.cur1);//获取下一个序号
			var tab = $("#simpleGameDiv .yxzq-lit-cot");
			tab.hide();
			$(tab[instance.cur1]).show();
			//加载图片
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		});
		$("#webGameDiv .more").click(function(e){
			e.preventDefault();
			instance.cur2 = getNextIndex(instance.cur2);//获取下一个序号
			var tab = $("#webGameDiv .yxzq-wp-cot");
			tab.hide();
			$(tab[instance.cur2]).show();
			//加载图片
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		});
		$("#netGameDiv .more").click(function(e){
			e.preventDefault();
			instance.cur3 = getNextIndex(instance.cur3);//获取下一个序号
			var tab = $("#netGameDiv .yxzq-wp-cot");
			tab.hide();
			$(tab[instance.cur3]).show();
			//加载图片
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		});
	};
	/**
	 * do something
	 * @override
	 */
	MzView.prototype.run = function(){
		
	};
	
	MzView.prototype.showUl = function(obj){
		obj.parent().show();
	};
	
	MzView.prototype.hideUl = function(obj){
		obj.parent().hide();
	};
	
	namespace.getMzViewInstance = haoqq.common.Singleton(function(){
		return new MzView();
	});
	
	namespace.createMzView = function(){
		return new MzView();
	};
	
}(haoqq.namespace('mz')));