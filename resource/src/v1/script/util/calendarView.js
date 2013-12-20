/**
 * 万年历
 * @author ronizhang
 */
(function($, window, document, undefined) {
	var $window = $(window);
	var today = new Date();
	
	$.fn.calendar = function(options){
		var element = this;//元素
		var curYear = today.getFullYear();
		var curMonth = today.getMonth();
		var curDay = today.getDate();
		
		var settings = {
//				method : "click",//hover
				effect : "show",//fadein
				container : $("#wannianli"),
				callback : $.noop()//点击日期回调
				
	    };
		if(options) {
//	         if (undefined !== options.dom) {
//	               options.failure_limit = options.failurelimit; 
//	               delete options.failurelimit;
//	         }
//	         if (undefined !== options.effectspeed) {
//	               options.effect_speed = options.effectspeed; 
//	               delete options.effectspeed;
//	         }
	         $.extend(settings, options);
	    };
	    
	    function update(yearStr, monthStr){
	    	var _date0 = new Date(yearStr, monthStr, 1);
	    	var year = _date0.getFullYear();
	    	var month = _date0.getMonth();
	    	//是否本月
	    	var _isCurMonth = false;
	    	if(month == today.getMonth() && year == today.getFullYear()){
	    		_isCurMonth = true;
	    	}
			//本月首末日
			var firstDay = $.getFirstDayOfMonth(year, month, 1);
			var lastDay = $.getLastDayOfMonth(year, month, 1);
			var rendarCount = 0;//绘制计数器
			//清空
			var _tr = settings.container.find("table").find("tr").empty();
			//计算上月应该补足多少天
			var _week1 = $.getWeek(firstDay);
			for(var i = _week1; i > 0; i--){
				var _day = $.getLastDayOfMonth(year, month-1, i);
				renderGrid(_day, rendarCount, false, false, "before");
				rendarCount++;
			}
			//本月日期 firstDay.getDate()
			var _i = firstDay.getDate();
			var _j = lastDay.getDate();
			for(var i = _i; i <= _j; i++){
				var _date = new Date(year, month, i);
				if(_isCurMonth && i == today.getDate()){//如果是本月今日
					curDay = i;
					renderGrid(_date, rendarCount, true, true, "");
				}else if(!_isCurMonth && i === 1){//如果不是本月，并且是1号
					curDay = 1;
					renderGrid(_date, rendarCount, false, true, "");
				}else{//其他日子
					renderGrid(_date, rendarCount, false, false, "");
				}
				rendarCount++;
			}
			//计算下月应该补足多少天
//			var _week2 = $.getWeek(lastDay);
			var _ndays = 42 - rendarCount;
			for(var i = 0; i < _ndays; i++){
				var _day = $.getFirstDayOfMonth(year, month+1, i+1);
				renderGrid(_day, rendarCount, false, false, "after");
				rendarCount++;
			}
			//设置黄历
			setHl();
		};
		
		/**
		 * 渲染一个日期网格
		 * @param rendarCount 渲染格子计数器
		 * @param isToday 是否今天
		 * @param isSelected 是否选中
		 * @param className 样式名：上月，本月，下月
		 */
		function renderGrid(date, rendarCount, isToday, isSelected, className){
			var _day = date.getDate();//公历日
			var _result = $.getLunar(date);
			var _lunarDay = _result.lunar.day;//农历日
			if(_lunarDay === "初一"){
				_lunarDay = _result.lunar.month;
			}
			var _isFestival = false;//是否节日
			
			if(_result.festival.lunarFestival !== ''){//优先农历节日
				_lunarDay = _result.festival.lunarFestival;
				_isFestival = true;
			}else if(_result.festival.solarFestival !== ''){//其次公历节日
				_lunarDay = _result.festival.solarFestival;
				_isFestival = true;
			}else if(_result.festival.solarTerms !== ''){//节气
				_lunarDay = _result.festival.solarTerms;
				_isFestival = true;
			}
			
			var _divide = Math.floor(rendarCount/7);//计算行数
//			var _mod = rendarCount%7;
			var _tr = settings.container.find("table").find("tr:eq("+_divide+")");
			//<td><div class="num-box before"><em>26</em><span>十七</span></div></td>
			var _td = $("<td></td>");
			var _div = $("<div class='num-box'></div>");
			var _em = $("<em></em>").text(_day);
			var _span = $("<span></span>").text(_lunarDay.length > 3?(_lunarDay.substring(0, 3)+"...") : _lunarDay).attr("title", _lunarDay);
			if(className === ""){//本月
				var _week = date.getDay();
				if(_week === 0 || _week === 6){//周末 
					_div.addClass("zhoumo");
				}
				if(_isFestival){//节日
					_div.addClass("chinaday");
				}
				if(_result.festival.isRestDay){//休假日
					_div.removeClass("chinaday").addClass("jiaqi");
				}
				if(isToday){//今天
					_div.addClass("today");
				}
				if(isSelected){//选中
					_div.addClass("select");
				}
			}else{
				_div.addClass(className);
			}
			_tr.append(_td);
			_td.append(_div);
			_div.append(_em);
			_div.append(_span);
//			window.console.log("阳历日"+_day+" 是否休假日" + _result.festival.isRestDay
//					+ " 农历日" + _lunarDay + " 是否今天" + isToday + " 是否选中" + isSelected);		
		};
		
		/**
		 * 设置黄历页
		 */
	    function setHl(){
	    	var _date = new Date(curYear, curMonth, curDay);
	    	var _year = _date.getFullYear(), _month = _date.getMonth()+1, _day = _date.getDate();
	    	settings.container.find(".smal-data").text(_year + "." + _month);
	    	settings.container.find(".big-data").text(_day);
	    	var lunar = $.getLunar(_date);
	    	settings.container.find(".nongli").find("p:eq(0)").text(lunar.ganzhi.ganzhiY + "年");
	    	settings.container.find(".nongli").find("p:eq(1)").text(lunar.ganzhi.ganzhiM + "月 " + lunar.ganzhi.ganzhiD + "日");
	    	
	    	$.requestJson('getCalendar.htm', function(json){
	    		if(json.code == '0'){
	    			for(var i = 0, _len = json.data.length; i < _len; i++){
	    				var _ul = settings.container.find("div.rili-info ul:eq("+i+")");
		    			_ul.find("li").remove();
		    			_ul.attr("title", json.data[i]);
		    			var _info = json.data[i].split(",");
		    			for(var j = 0; j < 5; j++){
		    				_ul.append($("<li></li>").text(_info[j]));
		    			}
	    			}
	    		}
	        },{
	           'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid")),
	           'year' : _year,
	           'month' : _month,
	           'day' : _day
	        },'post');
	    };
		
		update(curYear, curMonth);	
		
		function bindEvent(){
			//日历展开关闭
			element.click(function(e){
				e.stopPropagation();
				e.preventDefault();
				if(settings.container.is(":visible")){
					settings.container.hide();
				}else{
					var left = element.offset().left;
					var top = element.offset().top + element.height();
					settings.container.css({'left' : left, 'top' : top}).show();
				}
				//关闭tips
				if(haoqq.tips.getCalendarTipInstance().isShow()){
					haoqq.tips.getCalendarTipInstance().close();
				}
				//上报
				haoqq.getStatisInstance().reportClick(e, "dhv1.head.date.detail", {});
				haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.date.detail");
			});
			/**
			 * 点击文档
			 */
			$(document).click(function(e){
				var target= e.target;
	            if(!haoqq.util.isAncestor(settings.container[0], target)){
	            	settings.container.hide();
	            }
			});
			
			//点击日历
			settings.container.find("table").click(function(e){
				var target = e.target;
				e.stopPropagation();
				var td = findUpTag(target, "TD");
				if(td){
					var div = $(td).find("div:eq(0)");
					if(div.hasClass("before")){
						update(curYear, --curMonth);
					}else if(div.hasClass("after")){
						update(curYear, ++curMonth);
					}else{
						var tds = $(this).find("td");
						for(var i = 0, len = tds.length; i < len; i++){
							$(tds[i]).find("div:eq(0)").removeClass("select");
						}
						$(td).find("div:eq(0)").addClass("select");
						curDay = $(td).find("em").text();
						setHl();
					}
					//上报
					haoqq.getStatisInstance().reportClick(e, "dhv1.head.date.choose", {});
					haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.date.choose");
				}
			});
			
			//上一月，下一月
			settings.container.find("div.rili-info").find("a.rl-prev").click(function(e){
				e.preventDefault();
				update(curYear, --curMonth);
				//上报
				haoqq.getStatisInstance().reportClick(e, "dhv1.head.date.pre", {});
				haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.date.pre");
			});
			settings.container.find("div.rili-info").find("a.rl-next").click(function(e){
				e.preventDefault();
				update(curYear, ++curMonth);
				//上报
				haoqq.getStatisInstance().reportClick(e, "dhv1.head.date.next", {});
				haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.date.next");
			});
		}
		
		findUpTag = function(dom, tagName) {
	        if (!dom || ! tagName) return null;
	        tagName = tagName.toUpperCase();
	        while (dom && dom.tagName != tagName) {
	            dom = dom.parentNode;
	        }
	        return dom;
	    };
	    
	    bindEvent();
	};
	
	/**
	 * 获取某日的星期
	 */
    $.getWeek = function(date){
//        var values = ["日", "一", "二", "三", "四", "五", "六"];
        return date.getDay();
    };
	
    /**
     * 获取某月顺数第n天
     * year:4位数年份；month:0~11表示的月份；n:天数
     * exp: n为1时表示获取某月第一天
     */
	$.getFirstDayOfMonth = function(year, month, n){
	    var thisMonthDayOne = new Date(year, month, 1); //本月第一天
	    var plusDate = 1000*60*60*24 * (n - 1);
	    return new Date(thisMonthDayOne.getTime()+plusDate);
	};
	
	/**
	 * 获取某月倒数第n天
	 * year:4位数年份；month:0~11表示的月份；n:天数
	 * exp: n为1时表示获取某月最后一天
	 */
	$.getLastDayOfMonth = function(year, month, n){
	    var nextMonth = ++month; 
	    var nextMonthDayOne = new Date(year,nextMonth,1); 
	     
	    var minusDate = 1000*60*60*24 * n; 
	    return new Date(nextMonthDayOne.getTime()-minusDate); 
	 };
	 
	
})(jQuery, window, document);