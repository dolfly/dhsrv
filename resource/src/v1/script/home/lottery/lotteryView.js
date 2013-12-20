/**
 * 彩票模块
 * @author ronizhang
 */
(function(namespace){
	
	var LotteryView = function(){
		
	};
	
	LotteryView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	LotteryView.prototype.init = function(){
		this.lotteryModule = $("#module6");
		this.hasInit = false;
		this.component = haoqq.component.getComponentInstance();
		//tab切换
		var tabs = $("#module6 ul.chaoW-tab-list li");
		var config = {
				'container' : this.lotteryModule,
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $("#module6 .rgt-pages-caipiao"),
				'beforeChangeTab' : function(index, e){
					
				}
		};
		haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	LotteryView.prototype.initEvent = function(){
		
	};
	/**
	 * do something
	 * @override
	 */
	LotteryView.prototype.run = function(){
		//注册模块改变事件
		this.component.addListener('modChange', this.requestLottoryData);
		this.requestLottoryData();
	};
	
	/**
	 * 获取彩票
	 */
	LotteryView.prototype.requestLottoryData = function(){
		var instance = haoqq.module.getLotteryViewInstance();
		if(!instance.lotteryModule.is(":visible") || instance.hasInit){//不可见或者已经初始化则返回
			return;
		}
    	$.requestJson('getLotteryInfo.htm', function(json){
    		if(json && json.code == '0'){
    			for(var i = 0; i < json.data.length; i++){
    				/*{"data":[{"lotterye":"ssq","lotteryc":"","sequence":"13093","number":"01,02,08,26,29,31|14","is_confirm_kjinfo":"2",
    				 * "duijiang_date":"2013-10-09 00:00:00","guncun":"113583018","xiaoliang":"345826922",
    				 * "kaijiang_detail":"1_2_5000000|2_111_325606|3_719_3000|4_39473_200|5_893517_10|6_5998790_5",
    				 * "kaijiang_date":"2013-08-11 21:30:00","next_enddate":"2013-08-13 19:45","number_type":"","zoushitu_url":"",
    				 * "touzhu_url":"","reserve_url":""},
    				 *{"lotterye":"dlt","lotteryc":"","sequence":"13093","number":"01,05,17,18,26|05,07","is_confirm_kjinfo":"2",
    				 *"duijiang_date":"2013-10-10 00:00:00","guncun":"0","xiaoliang":"91058614","kaijiang_detail":"1_6_1211256|1_3_726753|2_59_36407|2_17_21844|3_89_6466|3_14_3879|4_809_3000|4_264_1500|5_7813_600|5_2267_300|6_30554_100|6_8252_50|7_382733_10|7_103497_5|8_3203588_5|12_0_0",
    				 *"kaijiang_date":"2013-08-12 20:40:00","next_enddate":"2013-08-14 19:45","number_type":"","zoushitu_url":"","touzhu_url":"","reserve_url":""},
    				 *{"lotterye":"qxc","lotteryc":"","sequence":"13093","number":"8,9,4,8,2,6,2","is_confirm_kjinfo":"2","duijiang_date":"2013-10-09 00:00:00",
    				 *"guncun":"61193286","xiaoliang":"17717664","kaijiang_detail":"1_1_5000000|2_7_70503|3_153_1800|4_2287_300|5_32411_20|6_427333_5",
    				 *"kaijiang_date":"2013-08-11 20:40:00","next_enddate":"2013-08-13 19:45","number_type":"","zoushitu_url":"","touzhu_url":"","reserve_url":""},
    				 *{"lotterye":"qlc","lotteryc":"","sequence":"13093","number":"05,07,11,14,22,25,30|15","is_confirm_kjinfo":"2",
    				 *"duijiang_date":"2013-10-10 00:00:00","guncun":"0","xiaoliang":"8805652","kaijiang_detail":"1_2_1075864|2_7_43912|3_273_2251|4_699_200|5_8715_50|6_13769_10|7_105526_5",
    				 *"kaijiang_date":"2013-08-12 21:40:00","next_enddate":"2013-08-14 19:45","number_type":"","zoushitu_url":"","touzhu_url":"","reserve_url":""},
    				 */
    				var _lottery = json.data[i];
    				if(!instance.fillData(_lottery)){
    					continue;
    				}
    			}
    			instance.hasInit = true;
    		}
        },{
            'g_tk':haoqq.util.getACSRFToken(g_cookie.get("uiid"))
        },'post');
	};
	
	/**
	 * 填充彩票数据
	 */
	LotteryView.prototype.fillData = function(lottery){
		var panel;
		if(lottery.lotterye == 'ssq'){
			panel = this.lotteryModule.find(".rgt-pages-caipiao:eq(0)");
		}else if(lottery.lotterye == 'qxc'){
			panel = this.lotteryModule.find(".rgt-pages-caipiao:eq(1)");
		}else if(lottery.lotterye == 'dlt'){
			panel = this.lotteryModule.find(".rgt-pages-caipiao:eq(2)");
		}else if(lottery.lotterye == 'qlc'){
			panel = this.lotteryModule.find(".rgt-pages-caipiao:eq(3)");
		}else{
			return false;
		}
		panel.find("p:eq(0)").text("第20"+lottery.sequence+"期("+lottery.kaijiang_date.substr(5, 5)+")奖号：");
		//开奖号码 01,05,17,18,26|05,07 <span class="sp-red">01</span>
		var _ballColor = lottery.number.split("|");
		var _qiu = panel.find(".qiu");
		_qiu.empty();
		if(_ballColor[0]){//红球
			var red = _ballColor[0].split(",");
			for(var i=0; i<red.length; i++){
				var _span = $("<span class='sp-red'></span>").text(red[i]);
				_qiu.append(_span);
			}
		}
		if(_ballColor[1]){//篮球
			var blue = _ballColor[1].split(",");
			for(var i=0; i<blue.length; i++){
				var _span = $("<span class='sp-blue'></span>").text(blue[i]);
				_qiu.append(_span);
			}
		}
		panel.find("ul li:eq(0) b").text((lottery.guncun/10000).toFixed(0));
		panel.find("ul li:eq(1) b").text(lottery.next_enddate.substring(2));
		panel.find("ul li:eq(2) b").text(lottery.next_enddate.substr(2, 8));
		panel.find("p:eq(1) a:eq(0)").attr("href", lottery.zoushitu_url);
		panel.find("p:eq(1) a:eq(2)").attr("href", lottery.touzhu_url);
		return true;
	};
	
	namespace.getLotteryViewInstance = haoqq.common.Singleton(function(){
		return new LotteryView();
	});
	
	namespace.createLotteryView = function(){
		return new LotteryView();
	};
	
}(haoqq.namespace('module')));