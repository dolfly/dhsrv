/**
 * tab切换视图
 * @author ronizhang
 */
(function(namespace) {

	var TabView = function(config){
		this.config = config || {};
		this.container = config.container || null;//容器，tab的父元素
		if (!this.container) return;
        /**如果tab动态切换，切换的时间间隔**/
        this.changeTimeout=config.changeTimeout||30000;
        /**是否动态切换tab**/
        this.syncChange=config.syncChange||false;
        /**鼠标在面板区域时是否停止自动切换**/
        this.stopAutoWhenHover=config.stopAutoWhenHover||true;
        /**定时器ID**/
        this.intervalId=0;
		this.currentClassName = config.currentClassName || 'current';//当前选中的样式名
		this.tabChangeType = (config.tabChangeType && config.tabChangeType == 'hover') ? 'hover': 'click';//切换事件类型
		this.tabTagName = config.tabTagName || 'li';//tag的选择器，默认li
		this.currentIndex = config.currentIndex || 0;//当前tag序号,默认0
		this.isAllowClickCurTab = config.isAllowClickCurTab || false; //点击当前tab时，是否允许默认事件
		/**上一个，下一个按钮，默认没有*/
		this.prevButton = config.prevButton || null;
		this.nextButton = config.nextButton || null;
		
		/**自定义panel切换动画**/
		this.panelShow = (typeof(config.panelShow) == 'function') ? config.panelShow: function(panel) {panel.show();};
		this.panelHide = (typeof(config.panelHide) == 'function') ? config.panelHide: function(panel) {panel.hide();};

		//事件:鼠标进入，鼠标离开，点击，切换前
		this.onMouseEnterTab = (typeof(config.onMouseEnterTab) == 'function') ? config.onMouseEnterTab: function() {};
		this.onMouseLeaveTab = (typeof(config.onMouseLeaveTab) == 'function') ? config.onMouseLeaveTab: function() {};
		this.onClickTab = (typeof(config.onClickTab) == 'function') ? config.onClickTab: function() {};
		this.beforeChangeTab = (typeof(config.beforeChangeTab) == 'function') ? config.beforeChangeTab: function() {};
		this.afterChangeTab = (typeof(config.afterChangeTab) == 'function') ? config.afterChangeTab: function() {};
        this.onTabAutoChange=(typeof(config.onTabAutoChange) == 'function') ? config.onTabAutoChange: function() {};
        this.onClickPrevOrNextChange=(typeof(config.onClickPrevOrNextChange) == 'function') ? config.onClickPrevOrNextChange: function() {};

		if (config.tabs.length > 0) {
			//如果配置了tab的HTMLElement NodeList就直接用配置的
			this.tabs = config.tabs;
		} else {
			//否则去找container下面的tabTagName的直接子元素
			this.tabs = $(this.container).children(this.tabTagName);
			//this.tabs = findDownTags(this.container, this.tabTagName);
		}

		if (config.tabPanels && config.tabPanels.length > 0) {
			//如果有tab对应的面板，则切换tab的时候，相应切换面板
			this.tabPanels = config.tabPanels;
		}
        /**
         * 动态切换tab
         */
        TabView.prototype.syncChangeTab=function(){
            /**如果不动态切换**/
            if(!this.syncChange){
                return;
            }
            if(this.intervalId>0){
                window.clearInterval(this.intervalId);
            }
            var $this=this;
            if (!this.tabPanels || ! this.tabPanels instanceof Array) {
                return;
            }
            if(this.stopAutoWhenHover){
            	this.tabPanels.each(function(){
                    $(this).unbind('mouseover');
                    $(this).unbind('mouseout');
                    $(this).mouseover(function(e){
                        e.stopPropagation();
                       if($this.intervalId>0){
                            window.clearInterval($this.intervalId);
                        }
                    }).mouseout(function(e){
                            e.stopPropagation();
                           $this.syncChangeTab();
                    });
                });
            }
            this.intervalId=window.setInterval(function(){
                 var index=$this.getCurrentIndex();
                 var tabs=$this.tabs;
                 if((index+1)>=tabs.length){
                     $this.currentIndex=0;
                 }else{
                     $this.currentIndex=index+1;
                 }
                 $this.setCurrent($this.currentIndex);
                 $this.onTabAutoChange($this.currentIndex);
            },this.changeTimeout);
        }
		/**
		/**
		 * 设置当前tab的样式，设置面板
		 */
		TabView.prototype.setCurrent = function(index) {
			// -1表示取消current
			var tabs = this.tabs;
			if (!tabs || index < -1 || index >= tabs.length) return;
			/*切换tab*/
			for (var i = 0; i < tabs.length; ++i) {
				if (i == index) {
					$(tabs[i]).addClass(this.currentClassName);
					//addClass(tabs[i], this.currentClassName);
				}
				else {
					$(tabs[i]).removeClass(this.currentClassName);
					//removeClass(tabs[i], this.currentClassName);
				}
			}
			/*设置当前tag序号*/
			this.currentIndex = index;
			/*如果没有相应的面板，直接返回，否则显示相应的面板*/
			if (!this.tabPanels || ! this.tabPanels instanceof Array) return;
			for (i = 0; i < this.tabPanels.length; ++i) {
				i == index? this.panelShow($(this.tabPanels[i])) : this.panelHide($(this.tabPanels[i]));
//				i == index? $(this.tabPanels[i]).css('display', 'block') : $(this.tabPanels[i]).css('display', 'none');
//				i === index ? removeClass(this.tabPanels[i], 'nodisplay') : addClass(this.tabPanels[i], 'nodisplay');
			}
		};
		/**
		 * 获取tab序号
		 */
		TabView.prototype.getTabIndex = function(tab) {
			var tabs = this.tabs;
			if (!tab || ! tabs) return -1;
			for (var i = 0; i < tabs.length; ++i) {
				if (tabs[i] === ($(tab))[0]) {
					return i;
				}
			}
			return -1;
		};
		/**
		 * 获取当前tab的序号
		 */
		TabView.prototype.getCurrentIndex = function() {
			return this.currentIndex;
		};
		/**
		 * 事件初始化
		 */
		TabView.prototype.initEventsListener = function() {
			
			var thisObj = this;
			/**
			 * 查找事件tab的索引
			 */
			function getEventTabIndex(target) {
				if(!target){
					return -1;
				}
				var t = $(target);
				for (var i = 0; i < thisObj.tabs.length; ++i) {
					if (thisObj.tabs[i] === t[0]) {
						return i;
					}
				}
				var parents = t.parentsUntil(thisObj.container);//查找父元素
				for (var p = 0; p < parents.length; ++p ){
					for (var i = 0; i < thisObj.tabs.length; ++i) {
						if (thisObj.tabs[i] === parents[p]) {
							return i;
						}
					}
				}
				return -1;
			}
			
			//绑定点击事件
			$(thisObj.container).click(function(e){
				var target = e.target;//点击目标
				//如果不是点击切换tab，返回
				if ('click' != thisObj.tabChangeType) return;
				//在点击的元素本身和其父元素上寻找是否有tab存在
				var index = getEventTabIndex(target);
				if (index == -1) return;
				//执行点击事件
				thisObj.onClickTab(index, e);
				//如果点击的不是当前tab，阻止默认事件
				if(index != thisObj.currentIndex || !thisObj.isAllowClickCurTab){
					e.preventDefault();	
				}
				if (thisObj.beforeChangeTab(index, e) === false) {
					//若没有标签，或beforeChangeTab返回false,则不切换
					return;
				}
				thisObj.setCurrent(index);
                thisObj.syncChangeTab();
				thisObj.afterChangeTab(index, e);//after
			});
			//绑定hover事件
			$(thisObj.container).mouseover(function(e){
				var target = e.target;//hover目标
				//在hover的元素本身和其父元素上寻找是否有tab存在
				var index = getEventTabIndex(target);
				if (index == -1) return;
				thisObj.onMouseEnterTab(index, e);
				if ('hover' != thisObj.tabChangeType) return;
				e.preventDefault();	
				if (thisObj.beforeChangeTab(index, e) === false) {
					//若没有标签，或beforeChangeTab返回false,则不切换
					return;
				}
				thisObj.setCurrent(index);
				thisObj.afterChangeTab(index, e);//after
			});
			//绑定mouseout
			$(thisObj.container).mouseout(function(e){
				var target = e.target;//hover目标
				//在hover的元素本身和其父元素上寻找是否有tab存在
				var index = getEventTabIndex(target);
				if (index == -1) return;
				thisObj.onMouseLeaveTab(index, e);
				if ('hover' != thisObj.tabChangeType) return;
				//从当前tab离开
				if (index == thisObj.getCurrentIndex()) {
					e.preventDefault();
//					thisObj.setCurrent(-1);
				}
			});
			//上一个，下一个事件绑定
			if(this.prevButton && this.nextButton){
				this.nextButton.click(function(e){
					e.preventDefault();
					var index = thisObj.getCurrentIndex();
	                var tabs = thisObj.tabs;
	                if((index+1) >= tabs.length){
	                	thisObj.currentIndex=0;
	                }else{
	                	thisObj.currentIndex=index+1;
	                }
	                thisObj.setCurrent(thisObj.currentIndex);
	                thisObj.onClickPrevOrNextChange(thisObj.currentIndex);
				});
				
				this.prevButton.click(function(e){
					e.preventDefault();
					var index = thisObj.getCurrentIndex();
	                var tabs = thisObj.tabs;
	                if(index === 0){
	                	thisObj.currentIndex=tabs.length-1;
	                }else{
	                	thisObj.currentIndex=index-1;
	                }
	                thisObj.setCurrent(thisObj.currentIndex);
	                thisObj.onClickPrevOrNextChange(thisObj.currentIndex);
				});
			}
		};
		
		this.initEventsListener();
        this.syncChangeTab();
	};
	
	namespace.TabView = function(config) {
        return new TabView(config);
    };
    
} (haoqq.namespace('tab')));