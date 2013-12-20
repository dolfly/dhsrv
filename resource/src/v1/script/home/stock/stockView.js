/**
 * 股票模块
 * @author ronizhang
 */
(function(namespace){
	
	var StockView = function(){
		
	};
	
	StockView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	StockView.prototype.init = function(){
		var instance = this;
		this.stockModule = $("#module5");
		this.userMrg = haoqq.user.getUserManagerInstance();
		this.component = haoqq.component.getComponentInstance();
		//定时器
		this.timerId = 0;
		//股票tab切换
		var tabs = $("#module5 ul.chaoW-tab-list li");
		var config = {
				'container' : this.stockModule,
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#module5 .rgt-pages"),
				'beforeChangeTab' : function(index, e){
					if($(tabs[index]).hasClass('select')){//点击当前元素
						return true;
					}
					if(index == 0){//大盘
						instance.requestIndexData();
					}else if(index == 1){//自选股
						instance.renderMyStockPanel();
					}else if(index == 2){//资讯
						instance.renderNewsPanel();
					}
					return true;

				}
		};
		haoqq.tab.TabView(config);
		//深指，上指切换
		var zsTabs = $("#module5 ul.gupiao-list li");
		var zsConfig = {
				'container' : this.stockModule,
				'currentClassName' : 'gpnow',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : zsTabs,
				'tabPanels' : $("#module5 .gupiao-img"),
				'panelShow' : function(panel){
					panel.animate({
						height: '197px'
					}, 250, 'swing');
				},
				'panelHide' : function(panel){
					panel.animate({
						height: 0
					}, 250, 'swing');
				},
				'afterChangeTab' : function(index, e){
					var tag = "";
					if(index == 0){//大盘
						tag = "dhv1.pac.area7.sh";
					}else if(index == 1){
						tag = "dhv1.pac.area7.sz";
					}
					//上报
					haoqq.getStatisInstance().reportClick(e, tag, {});
					haoqq.getDjlStatisInstance().reportClick(e, tag);
					return true;
				}
		};
		haoqq.tab.TabView(zsConfig);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	StockView.prototype.initEvent = function(){
		var instance = this;
		//点击登录按钮
		this.stockModule.find(".loginBtn").click(function(e){
			e.preventDefault();
			instance.userMrg.login();
		});
	};
	/**
	 * do something
	 * @override
	 */
	StockView.prototype.run = function(){
		//注册模块改变事件
		this.component.addListener('modChange', this.autoRefresh);
		//添加登录，登出事件监听
		this.userMrg.addListener('login', this.renderMyStockPanel);
		this.userMrg.addListener('login', this.renderNewsPanel);
		this.userMrg.addListener('logout', this.renderMyStockPanel);
		this.userMrg.addListener('logout', this.renderNewsPanel);
		//启动定时
		this.autoRefresh();
	};
	
	/**
	 * 本组件是否可见
	 */
	StockView.prototype.isStockAvilabel = function(){
		if(this.stockModule.is(":visible")){
			return true;
		}
		return false;
	};
	
	StockView.prototype.renderMyStockPanel = function(){
		if(!this.isStockAvilabel()){//不可见则返回
			return;
		}
		if(this.userMrg.hasLoged()){
			this.requestMyStockData();
			this.stockModule.find(".gupiao-login").hide();
			this.stockModule.find(".gupiao-tj").hide();
			this.stockModule.find(".my-gupiao").show();
		}else{
			this.stockModule.find(".gupiao-login").show();
			this.stockModule.find(".my-gupiao").hide();
			this.stockModule.find(".gupiao-tj").hide();
		}
	};
	
	StockView.prototype.renderNewsPanel = function(){
		if(!this.isStockAvilabel()){//不可见则返回
			return;
		}
		this.requestNewsData();
	};
	
	/**
	 * 启动自动拉取股票
	 */
	StockView.prototype.autoRefresh = function(){
		var instance = haoqq.module.getStockViewInstance();
		if(!instance.isStockAvilabel()){//不可见停止计时，返回
			if(instance.timerId > 0){
				window.clearInterval(instance.timerId);
				instance.timerId = 0;
			}
			return;
		}
		//先拉取一次
		instance.requestIndexData();
		if(instance.userMrg.hasLoged()){
			instance.requestMyStockData();
		}
		instance.requestNewsData();
		//启动定时
		if(instance.timerId <= 0)
			instance.timerId = window.setInterval(function(){
				//是股票更新时间
				if(isRefreshTime()){
					instance.requestIndexData();
					if(instance.userMrg.hasLoged()){
						instance.requestMyStockData();
					}
					instance.requestNewsData();
				}
			}, 10000);
	};
	
	/**
	 * 获取大盘数据
	 */
	StockView.prototype.requestIndexData = function(){
		var instance = this;
    	$.requestJson('getStockInfo.htm', function(json){
    		if(json && json.code == '0'){
    			for(var i = 0; i < json.data.length; i++){
    				var _stock = json.data[i];
    				var _temp = parseFloat(_stock.wavevalue);
    				var _li = instance.stockModule.find("ul.gupiao-list li:eq("+i+")");
    				var _symbol = "";
    				if(_temp > 0){
    					_li.find("p:eq(0)").removeClass().addClass("c-red");
    					_symbol = "+";
    				}else if(_temp < 0){
    					_li.find("p:eq(0)").removeClass().addClass("c-green");
    				}else{
    					_li.find("p:eq(0)").removeClass();
    				}
    				_li.find("p:eq(0)>span:eq(0)>b").text(_stock.curvalue);
					_li.find("p:eq(0)>span:eq(1)").text(_symbol+_temp);
					_li.find("p:eq(0)>span:eq(2)").text(_symbol+_stock.margin+"%");
					_li.find("p:eq(1)").text(getTime(_stock.time) + " 成交额:" + (_stock.money/10000).toFixed(2) + "亿");
					_li.find("img:eq(0)").attr("src","http://img.gtimg.cn/images/hq_parts_little6/hushen/indexs/"+_stock.stockcode+".png?r="+Math.random());
    			}
    		}
        },{
        	't':'index',
            'g_tk':haoqq.util.getACSRFToken(g_cookie.get("uiid"))
        },'post');
	};
	
	/**
	 * 获取自选股数据
	 */
	StockView.prototype.requestMyStockData = function(){
		var instance = this;
    	$.requestJson('getStockInfo.htm', function(json){
    		if(json && json.msg == 'not login'){//w未登录
    			instance.stockModule.find(".gupiao-login").show();
    			instance.stockModule.find(".my-gupiao").hide();
    			instance.stockModule.find(".gupiao-tj").hide();
    			return;
    		}else if(json && json.code == '0'){
    			var _len = json.data.length;
    			if(_len <= 0){//没有自选股
    				instance.stockModule.find(".my-gupiao").hide();
        			instance.stockModule.find(".gupiao-tj").show();
        			return;
    			}
    			var _ul = instance.stockModule.find(".my-gupiao ul");//列表
    			_ul.empty();
    			for(var i = 0; i < _len; i++){
    				var _stock = json.data[i];
    				var _temp = parseFloat(_stock.wavevalue);
    				//<li><span class="sp1"><a href="#">腾讯控股</a></span><span class="sp2 c-red">280.00</span><span class="sp3 c-red">+10.00%</span></li>
    				var _colorStyle = "";
    				var _symbol = "";
    				if(_temp > 0){
    					_colorStyle = "c-red";
    					_symbol = "+";
    				}else if(_temp < 0){
    					_colorStyle = "c-green";
    				}
    				var _li = $("<li></li>");
    				var _span = $("<span class='sp1'></span>");
    				var _a = $("<a></a>").attr({
    						"href": "http://stockhtm.finance.qq.com/sstock/ggcx/"+_stock.stockcode+".shtml?pgv_ref=",
    						"_stag" : "dhv1.pac.area7.detail"
    					}).text(_stock.stockname);
    				var _numSpan = $("<span></span>").addClass("sp2 " + _colorStyle).text(_stock.curvalue);
    				var _waveSpan = $("<span></span>").addClass("sp3 " + _colorStyle).text(_symbol+_stock.margin+"%");
    				_ul.append(_li);
    				_li.append(_span);
    				_span.append(_a);
    				_li.append(_numSpan);
    				_li.append(_waveSpan);
    				
        			instance.stockModule.find(".gupiao-tj").hide();
        			instance.stockModule.find(".my-gupiao").show();
    			}
    		}
        },{
        	't':'mys',
            'g_tk':haoqq.util.getACSRFToken(g_cookie.get("uiid"))
        },'post');
	};
	
	/**
	 * 获取新闻
	 */
	StockView.prototype.requestNewsData = function(){
		var instance = this;
    	$.requestJson('getStockInfo.htm', function(json){
    		if(json && json.code == '0'){
    			var _ul1 = instance.stockModule.find(".ul-list:eq(0)");
    			var _ul2 = instance.stockModule.find(".ul-list:eq(1)");
    			_ul1.empty();
    			_ul2.empty();
    			//<li> • <a href="#">习近平奥巴马一起散步吃早饭</a></li>
    			for(var i = 0; i < json.data.length && i < 5; i++){
    				var _li = $("<li> • </li>");
    				var _a = $("<a></a>").attr({
    					"href" : json.data[i].url,
    					"title" : json.data[i].title,
    					"_stag" : "dhv1.pac.area7.text" + (i+1)
    				}).text(json.data[i].title.length > 14 ? 
    						json.data[i].title.substring(0, 14)
    						: json.data[i].title);
    				_ul1.append(_li);
    				_li.append(_a);
    			}
    			for(var i = 5; i < json.data.length; i++){
    				var _li = $("<li> • </li>");
    				var _a = $("<a></a>").attr({
    					"href" : json.data[i].url,
    					"title" : json.data[i].title,
    					"_stag" : "dhv1.pac.area7.text" + (i+1)
    				}).text(json.data[i].title.length > 14 ? 
    						json.data[i].title.substring(0, 14)
    						: json.data[i].title);
    				_ul2.append(_li);
    				_li.append(_a);
    			}
    		}
        },{
        	't':'news',
            'g_tk':haoqq.util.getACSRFToken(g_cookie.get("uiid"))
        },'post');
	};
	
	var getTime = function(time){
		//20130809111945 6月19日  15:02:56  成交额:670.8亿
		if(time.length != 14){
			return "";
		}
		var month = time.substr(4, 1) == "0"? time.substr(5, 1) : time.substr(4, 2);
		var day = time.substr(6, 1) == "0"? time.substr(7, 1) : time.substr(6, 2);
		var buffer = new StringBuffer();
		buffer.append(month);
		buffer.append("月");
		buffer.append(day);
		buffer.append("日 ");
		buffer.append(time.substr(8, 2));
		buffer.append(":");
		buffer.append(time.substr(10, 2));
		buffer.append(":");
		buffer.append(time.substr(12, 2));
		return buffer.toString();
	}
	
	var isRefreshTime = function(){
		var now = new Date();
		//9：25~11：30 13：00~15：00合法
		if(now.getHours() < 9 || now.getHours() >= 15 || now.getHours() == 12){
			return false;
		}else if(now.getHours() == 9 && now.getMinutes() <= 25){	
			return false;
		}else if(now.getHours() == 11 && now.getMinutes() >= 30){
			return false;
		}
		return true;
	}
	
	namespace.getStockViewInstance = haoqq.common.Singleton(function(){
		return new StockView();
	});
	
	namespace.createStockView = function(){
		return new StockView();
	};
	
}(haoqq.namespace('module')));