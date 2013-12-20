/**
 * 新的日历控件，加入了公历，农历，节假日等
 * @author ronizhang
 */
jQuery.extend({
	getLunar: function(date){
		var lunarInfo = new Array(
				0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
				0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
				0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
				0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
				0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
				0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
				0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
				0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
				0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
				0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
				0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
				0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
				0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
				0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
				0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
		);
		var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
		var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
		var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
//		var now = new Date();
		var SY = date.getFullYear();//date.getYear(); 
		var SM = date.getMonth();
		var SD = date.getDate();

		function cyclical(num) { return(Gan[num%10]+Zhi[num%12]) } //==== 传入 offset 传回干支, 0=甲子
		//==== 传回农历 y年的总天数
		function lYearDays(y) {
			var i, sum = 348;
			for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
			return sum+leapDays(y);
		}

		//==== 传回农历 y年闰月的天数
		function leapDays(y) {
			if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
			else return(0);
		}

		//==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
		function leapMonth(y) { return (lunarInfo[y-1900] & 0xf);}

		//====================================== 传回农历 y年m月的总天数
		function monthDays(y,m) { return ( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );}

		//==== 算出农历, 传入日期物件, 传回农历日期物件
//			该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
		function Lunar(objDate) {
			var i, leap=0, temp=0;
			var baseDate = new Date(1900,0,31);
			var offset   = (objDate - baseDate)/86400000;

			this.dayCyl = offset + 40;
			this.monCyl = 14;

			for(i=1900; i<2050 && offset>0; i++) {
				  temp = lYearDays(i);
				  offset -= temp;
				  this.monCyl += 12;
			}
			if(offset<0) {
				  offset += temp;
				  i--;
				  this.monCyl -= 12;
			}

			this.year = i;
			this.yearCyl = i-1864;

			leap = leapMonth(i); //闰哪个月
			this.isLeap = false;

			for(i=1; i<13 && offset>0; i++) {
				  //闰月
				  if(leap>0 && i==(leap+1) && this.isLeap==false)
				     { --i; this.isLeap = true; temp = leapDays(this.year); }
				  else
				     { temp = monthDays(this.year, i); }

				  //解除闰月
				  if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

				  offset -= temp;
				  if(this.isLeap == false) this.monCyl ++;
			}

			if(offset==0 && leap>0 && i==leap+1)
				  if(this.isLeap)
				     { this.isLeap = false; }
				  else
				     { this.isLeap = true; --i; --this.monCyl;}

			if(offset<0){ offset += temp; --i; --this.monCyl; }

			this.month = i;
			this.day = offset + 1;
		}

		function YYMMDD(){ 
			return(SY+'年'+(SM+1)+'月'+SD+'日'); 
		}
		function weekday(){ 
			var day = new Array("周日","周一","周二","周三","周四","周五","周六");
			return day[date.getDay()]; 
		}
		//==== 中文日期
		function cDay(m,d){
			var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
			var nStr2 = new Array('初','十','廿','卅','　');
			var month;
			if (m>10){month = '十'+nStr1[m-10];} else {month = nStr1[m];} month += '月';
			var day;
			switch (d) {
				  case 10:day = '初十'; break;
				  case 20:day = '二十'; break;
				  case 30:day = '三十'; break;
				  default:day = nStr2[Math.floor(d/10)]; day += nStr1[d%10];
			}
			return {
				month : month,
				day : day
			};
		}
		
		//===== 某年的第n个节气为几日(从0小寒起算) 新干支加入的方法
		function sTerm(y,n) {
			var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000 ) + Date.UTC(1900,0,6,2,5) );
			return(offDate.getUTCDate());
		}
		
		/**
		 * 生肖年，干支年月日
		 * @returns 干支年月日，生肖
		 */
		function getGanZhi(){
			var result = {};
			var sDObj = new Date(SY, SM, SD);
			var lDObj = new Lunar(sDObj);
			//新干支算法
			if(SM<2) result.ganzhiY = cyclical(SY-1900+36-1);
			  else result.ganzhiY = cyclical(SY-1900+36);
			result.ganzhiM = cyclical((SY-1900)*12+SM+12);
			
			var term2 = sTerm(SY,2); //立春日期
			var firstNode = sTerm(SY,SM*2) //返回当月「节」为几日开始
			var dayCyclical = Date.UTC(SY,SM,1,0,0,0,0)/86400000+25567+10;
			//如果是2月的立春
			if(SM==1 && SD>=term2) result.ganzhiY = cyclical(SY-1900+36);
			//如果是当月第一个节气
			if(SD>=firstNode) result.ganzhiM = cyclical((SY-1900)*12+SM+13);
			result.ganzhiD = cyclical(dayCyclical+SD-1);
			
			//旧干支算法
//			result.ganzhiY = cyclical(lDObj.yearCyl);//  SY-1900+36
//			result.ganzhiM = cyclical(lDObj.monCyl);
//			result.ganzhiD = cyclical(lDObj.dayCyl);
			result.animal = Animals[(SY-4)%12];//生肖
			return result;
		}
		/**
		 * 获取农历日
		 */
		function getLunarDay(){
			var sDObj = new Date(SY, SM, SD);
			var lDObj = new Lunar(sDObj);
			
			return cDay(lDObj.month, lDObj.day);
		}
		var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
		var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
		var lFtv = new Array("0101*春节","0115 元宵节","0505 端午节","0707 七夕情人节","0715 中元节","0815 中秋节","0909 重阳节","1208 腊八节","1224 小年"/*"0100*除夕"*/);
		var sFtv = new Array("0101*元旦","0214 情人节","0308 妇女节","0312 植树节","0315 消费者权益日","0401 愚人节","0501 劳动节","0504 青年节","0512 护士节","0601 儿童节","0701 建党节","0801 建军节","0808 父亲节","0910 教师节","1001*国庆节",
			"1006 老人节","1024 联合国日","1111 光棍节","1225 圣诞节");
		//国家法定假日，每年都要配
		var restYear = 2013;
		var restDay = new Array("0101 休假","0102 休假","0103 休假","0209 休假","0210 休假","0211 休假","0212 休假","0213 休假","0214 休假",
				"0215 休假","0404 休假","0405 休假","0406 休假","0429 休假","0430 休假","0501 休假","0610 休假","0611 休假","0612 休假",
				"0919 休假","0920 休假","0921 休假","1001 休假","1002 休假","1003 休假","1004 休假", "1005 休假", "1006 休假", "1007 休假");
		/**
		 * 获取节日
		 */
		function getFestival(){
			
			var sDObj = new Date(SY,SM,SD);
			var lDObj = new Lunar(sDObj);
			var lDPOS = new Array(3)
			var festival='',solarTerms='',solarFestival='',lunarFestival='',isRestDay=false,tmp1,tmp2;
			//农历节日 
//			for(i in lFtv)
			for(var i = 0, len = lFtv.length; i < len; i++)
				  if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				   tmp1=Number(RegExp.$1)-lDObj.month;
				   tmp2=Number(RegExp.$2)-lDObj.day;
				   if(tmp1==0 && tmp2==0) lunarFestival=RegExp.$4;
			}
			//公历节日
//			for(i in sFtv)
			for(var i = 0, len = sFtv.length; i < len; i++)
				  if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)){
				   tmp1=Number(RegExp.$1)-(SM+1);
				   tmp2=Number(RegExp.$2)-SD;
				   if(tmp1==0 && tmp2==0) solarFestival = RegExp.$4;
			}
			//法定假日
			if(SY == restYear){
//				for(i in restDay)
				for(var i = 0, len = restDay.length; i < len; i++)
					  if(restDay[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)){
					   tmp1=Number(RegExp.$1)-(SM+1);
					   tmp2=Number(RegExp.$2)-SD;
					   if(tmp1==0 && tmp2==0) isRestDay = true;
				}
			}
			//节气
			tmp1 = new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5));
			tmp2 = tmp1.getUTCDate();
			if (tmp2==SD) solarTerms = solarTerm[SM*2+1];
			tmp1 = new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2]*60000)+Date.UTC(1900,0,6,2,5));
			tmp2 = tmp1.getUTCDate();
			if (tmp2==SD) solarTerms = solarTerm[SM*2];

//			if(solarTerms == '' && solarFestival == '' && lunarFestival == '')
//				 festival = '';
//			else
//				 festival = solarTerms + ' ' + solarFestival + ' ' + lunarFestival;
			var result = {};
			result.isRestDay = isRestDay;//法定假日
			result.solarTerms = solarTerms;//节气
			result.solarFestival = solarFestival;//公历节日
			result.lunarFestival = lunarFestival;//农历节日
			return result;
		}

		var result = {};
		result.date = YYMMDD();//公历
		result.lunar = getLunarDay();//农历
		result.week = weekday();//周
		result.ganzhi = getGanZhi();//干支和生效
		result.festival = getFestival();//节假日
		return result;
	}
}); 