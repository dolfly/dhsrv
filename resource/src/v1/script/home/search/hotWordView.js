(function(namespace){
	
	var HotWord = function(){
		
	};
	
	HotWord.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	HotWord.prototype.init = function(param){
		this.hotArtcleOpen = $("#hotArtcleOpen");
		this.hotArtcleClosed = $("#hotArtcleClosed");
		this.ulClosed = $("#ulClosed");
		this.ilClosed = $("#ulClosed li");
		this.ulOpen = $("#ulOpen");
		this.ilOpen = $("#ulOpen li");
		this.search = haoqq.search.getSearchCtrInstance();
	};
	/**
	 * 初始化事件
	 * @override
	 */
	HotWord.prototype.initEvent = function(param){
		var instance = this;
		/**
		 * 热词展开
		 */
		var hotArtcleClosed = this.hotArtcleClosed;
		var hotArtcleOpen = this.hotArtcleOpen;
		var timer = 0;
		this.ilClosed.each(function(){
			$(this).find("a").mouseover(function(e){//事件绑定到a标签上，li太长
	            timer = setTimeout(function(){//鼠标停顿了0.5s后出发  
	            	hotArtcleClosed.hide(0);
					hotArtcleOpen.show(0);
					//关闭tips
//					if(haoqq.tips.getHotwordTipInstance().isShow()){
//						haoqq.tips.getHotwordTipInstance().close();
//					}
					//上报dhv1.hover.hotwords
					haoqq.getStatisInstance().reportClick(e, "dhv1.hover.hotwords", {
						'type' : 'search'
					});
					haoqq.getDjlStatisInstance().reportClick(e, "dhv1.hover.hotwords");
	            },300);
			}).mouseout(function(e){//鼠标移出后停止计时
				clearTimeout(timer);
			}).click(function(e){
				e.preventDefault();
				var _engin = instance.search.getCurEngin();
				if(_engin === 'soso' || _engin === 'baidu' || _engin === 'google'){
					instance.search.doQuery($(this).attr("_qw"), "web", _engin, 'hotword');
				}else{
					instance.search.doQuery($(this).attr("_qw"), "web", "soso", 'hotword');
				}
			});
		});
		this.hotArtcleOpen.mouseout(function(e){
			var s = e.toElement || e.relatedTarget;//触发onmouseout事件时鼠标进入的元素
            if (!this.contains(s)) {//判断鼠标进入的元素是否是当前元素的内部元素，如果是，忽略此事件
    			hotArtcleOpen.hide();
    			hotArtcleClosed.show();
            }
		});
		//搜索
		this.ilOpen.each(function(){
			$(this).find("a").click(function(e){//查询
				e.preventDefault();
				var _engin = instance.search.getCurEngin();
				if(_engin === 'soso' || _engin === 'baidu' || _engin === 'google'){
					instance.search.doQuery($(this).attr("_qw"), "web", _engin, 'hotword');
				}else{
					instance.search.doQuery($(this).attr("_qw"), "web", "soso", 'hotword');
				}
				
			});
		});
		
	};
	/**
	 * do something
	 * @override
	 */
	HotWord.prototype.run = function(param){
		this.roll();
		this.getHotWord();
	};
	
	/**
	 * 滚动
	 */
	HotWord.prototype.roll = function(){
		var ulClosed = this.ulClosed;
		var newsTimer;
		ulClosed.hover(function() {
			clearInterval(newsTimer); //鼠标移上去
		}, function() { //鼠标移走
			newsTimer = setInterval(function() {	
				var height = ulClosed.find('li:first').height(); //一行的高度
				ulClosed.find('li:first').animate({
					marginTop : -height
				}, 500, function() {
					ulClosed.find('li').css('marginTop','0');
					ulClosed.find('li:first').appendTo(ulClosed);
				});
			}, 5000);
		}).trigger('mouseleave');
	};
	
	
	HotWord.prototype.getHotWord=function(){
		var ilClosed = this.ilClosed;
		var ilOpen = this.ilOpen;
        $.requestJson(this.getHotNewsLink(), function(data){
            if(!data || data.code != '0'){
                return;
            }
            var _data = data.words;
            for(var i=0; i < _data.length; i++){
            	var _d = _data[i].split(',');
            	if (_d.length == 0){
            		continue;
            	} else {
            		var text = _d[0];
            		if (text.length > 9){
            			text = text.substring(0,9);
            		}
            		if (_d.length == 1){
            			$(ilClosed[i]).find("a").attr("_qw", _d[0]).text(text).next(".artcle-order").addClass("new");
            			$(ilOpen[i]).find("a").attr("_qw", _d[0]).text(text).next(".artcle-order").addClass("new");
            		} else if (_d.length >= 2){
            			var order_class = "new";
            			if (_d[1] == "u"){
            				order_class = "up arrow";
            			} else if (_d[1] == "d"){
            				order_class = "down arrow";
            			}
            			$(ilClosed[i]).find("a").attr("_qw", _d[0]).text(text).next(".artcle-order").addClass(order_class);
            			$(ilOpen[i]).find("a").attr("_qw", _d[0]).text(text).next(".artcle-order").addClass(order_class);
            		}
            	}
            }
            g_storge.set("hotwords_readtime", new Date().getTime());//保存阅读时间
        }, {}, 'get');
    }
	
	 /**
     * 获取热点新闻链接
     */
	HotWord.prototype.getHotNewsLink = function(){
    	return "gethotwordv1.htm";
    };

	namespace.getHotWordInstance = haoqq.common.Singleton(function(){
		return new HotWord();
	});
	
	namespace.createHotWord = function(){
		return new HotWord();
	};
	
}(haoqq.namespace('search')));