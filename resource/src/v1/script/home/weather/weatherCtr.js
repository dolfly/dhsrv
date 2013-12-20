/**
 * 天气控制器
 * @author ronizhang
 */
(function(namespace){
	
	var weatherCtr = function(options){
	};
	
	weatherCtr.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	weatherCtr.prototype.init = function(param){
		this.topWeatherArea = $("#topWeatherArea");
		this.weatherArea = $("#weatherArea");
		this.addCityArea = $("#addCityArea");
		/**城市选择**/
		this.citySelect=new haoqq.city.CityView({
            provinceSelect : $("#provinceSelect")[0],
            citySelect : $("#citySelect")[0]
        });
        /**城市的本地存储**/
        this.cityStore = haoqq.city.CityStore();
        /**天气模型数据**/
        this.weatherModle = new haoqq.weather.WeatherModel();
        /**当前城市**/
        this.currentCity = "";
	};
	/**
	 * 初始化事件
	 * @override
	 */
	weatherCtr.prototype.initEvent = function(param){
		var instance = this;
		/**
		 * 天气展开和关闭
		 */
		this.topWeatherArea.click(function(e){
			e.preventDefault();
			e.stopPropagation();
			$("#wannianli").hide();
			instance.toggleWeatherDiv();
			//关闭tips
//			if(haoqq.tips.getWeatherTipInstance().isShow()){
//				haoqq.tips.getWeatherTipInstance().close();
//			}
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.detail", {'type' : 'weather'});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.detail");
		});
		/**
		 * 点击文档
		 */
		$(document).click(function(e){
			var target= e.target;
            if(!haoqq.util.isAncestor(instance.weatherArea[0], target)){
                instance.weatherArea.hide();
            }
		});
		this.initAddCityEvent();
		/**
		 * 空气质量
		 */
		this.weatherArea.find(".tipsKS-info").find(".K-info").click(function(e){
			e.stopPropagation();
            e.preventDefault();
            var url = "http://www.soso.com/q?";
            var params = {
                'ie' : 'utf-8',
                'oe' : 'utf-8',
                'w' : instance.currentCity + "空气质量指数"
            }
            url = url+$.param(params);
            haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.pm", {'type' : 'weather'});
            haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.pm");
            window.open(url);
		});
	};
	/**
	 * do something
	 * @override
	 */
	weatherCtr.prototype.run = function(param){
		this.cityStore.reloadData();
        var city = this.cityStore.getDefaultCity()|| '';
        this.getWeathData(city, true);
	};
	/**
	 * 切换天气浮层视图
	 */
	weatherCtr.prototype.toggleWeatherDiv = function(){	
		if(this.weatherArea.is(":visible")){
			this.weatherArea.hide();
		}else{
			var left = this.topWeatherArea.offset().left;
			var top = 65;
			this.weatherArea.css({'left' : left, 'top' : top}).show();
			this.addCityArea.css({'left' : left, 'top' : top});//同时设置添加城市
		}
	};
	/**
	 * 请求天气数据
	 */
	weatherCtr.prototype.getWeathData = function(city, isInit, callback){
		var instance = this;
        $.requestJson('getWeatherInfo.htm',function(data){
        	instance.fillDate.call(instance, data, isInit, callback);
        	haoqq.tips.getTipsTriggerInstance().reloadTips();//tips
        },{
           'c':city
        },'post');
	};
	/**
	 * 填充天气数据
	 */
	weatherCtr.prototype.fillDate = function(data, isInit, callback){
		if(!data||data.code!='0'){
            if(isInit){//如果是首次加载天气
            	this.topWeatherArea.hide();//不显示整个天气
            }else{
            	alert("当前查询的人太多了，请稍候再试：）");
            }
            return;
        }
        this.currentCity = data.city;
        var infolist = data.baseInfo;
        var AQI = data.AQI;
//        this.canShow=true;
        this.saveCityLocal(data.city);//保存本地城市

        /**填充基础信息**/
        this.fillBaseData(data.cityCode, infolist, data.indexs, data.current);
        /**填冲PM25**/
        this.fillKqData(AQI, data.indexs);
        /**初始化城市tab**/
        this.initCityTab();
//        /**显示天气区域**/
//        this.topWeatherArea.css('display', 'inline-block');
        if(typeof callback ==='function'){
        	callback();
        }
	};
	/**
	 * 填充基础信息
	 */
	weatherCtr.prototype.fillBaseData = function(citycode, data, zhishu, today){
		var _cityArea = this.topWeatherArea.find("ul:eq(0)");
		var _tempArea = this.topWeatherArea.find("ul:eq(1)");
		_cityArea.find("li:eq(0)").find("span").text(this.currentCity);
		//空气指数
		var kqwr = this.weatherModle.getZhiShu(zhishu.zs_kqwr,'kqwr');
        if(kqwr){
        	_cityArea.find("li:eq(1)").find("span").text(kqwr[0]);
        }
        //天气
        var cname = this.weatherModle.getWeatherIcon25(today.weather);
        this.topWeatherArea.find("span.weapic").css('background-position', cname);
        _tempArea.find("li:eq(0)").find("span").text(today.weather);
        _tempArea.find("li:eq(1)").find("span").text(today.tempLatest+"℃");
        
		//展开区域
        var todayDiv = this.weatherArea.find(".todayList");
        todayDiv.find(".today-dc").find(".ssn").text(today.tempLatest);
        todayDiv.find(".today-f").text(today.wind);
        todayDiv.find(".today-s").text("湿度 "+zhishu.sk_hd+"%");
		//今天，明天，后天
        var now_w = data[0];
        var tm_w = data[1];
        var houtian_w = data[2];
        
        var threeDay = this.weatherArea.find(".dayWea-list");
        var _tdayArea = threeDay.find("a:eq(0)");
        var _tomArea = threeDay.find("a:eq(1)");
        var _3dayArea = threeDay.find("a:eq(2)");
        
        var moreUrl = "http://weather.news.qq.com/qresult.htm?icity"+citycode+".htm";
        this.weatherArea.find(".more").attr("href", moreUrl);
        //今天 http://weather.news.qq.com/qresult.htm?icity01010903.htm
        _tdayArea.attr("href", moreUrl);
        var _dayClsName = this.weatherModle.getWeatherIcon25(now_w.weather);
        _tdayArea.find(".weaImg").css('background-position', _dayClsName)
        _tdayArea.find(".wea").text(now_w.weather);
        _tdayArea.find(".ce").text(now_w.tempLow + "~" + now_w.tempHigh + "℃");
        //明天
        _tomArea.attr("href", moreUrl);
        _dayClsName = this.weatherModle.getWeatherIcon25(tm_w.weather);
        _tomArea.find(".weaImg").css('background-position', _dayClsName)
        _tomArea.find(".wea").text(tm_w.weather);
        _tomArea.find(".ce").text(tm_w.tempLow + "~" + tm_w.tempHigh + "℃");
        //后天
        _3dayArea.attr("href", moreUrl);
        _dayClsName = this.weatherModle.getWeatherIcon25(houtian_w.weather);
        _3dayArea.find(".date").text(this.getWeekInfo(houtian_w.day));
        _3dayArea.find(".weaImg").css('background-position', _dayClsName)
        _3dayArea.find(".wea").text(houtian_w.weather);
        _3dayArea.find(".ce").text(houtian_w.tempLow + "~" + houtian_w.tempHigh + "℃");
	};
	/**
	 * 填充空气相关
	 */
	weatherCtr.prototype.fillKqData = function(aqi, zhishu){
		var haspm25 = false;
		if($.trim(aqi.idx) != '' && parseInt(aqi.idx) >= 0){
			haspm25 = true;
		}else{
			haspm25 = false;
		}
		var kqArea = this.weatherArea.find(".tipsKS-info");
		var nokqArea = this.weatherArea.find(".tipsKS-info-nokq");
		if(haspm25){
			var _kq = kqArea.find(".K-info");
			_kq.find("dt").text("空气质量指数："+aqi.idx);
			
			var kqzhishu = this.weatherModle.getAireInfoDes(aqi.idx);
			_kq.attr("title", kqzhishu.content);
			//重置天气指数
			this.topWeatherArea.find("ul:eq(0)").find("li:eq(1)").find("span").text(kqzhishu.name);
			
			if($.trim(aqi.pm25)==''){
				_kq.find("dd:eq(0)").text("PM2.5：--");
            }else{
            	_kq.find("dd:eq(0)").text("PM2.5："+aqi.pm25+" µg/m3");
            }
			if($.trim(aqi.pm10)==''){
				_kq.find("dd:eq(1)").text("PM10：--");
            }else{
            	_kq.find("dd:eq(1)").text("PM10："+aqi.pm10+" µg/m3");
            }
			if($.trim(aqi.so2)==''){
				_kq.find("dd:eq(2)").text("二氧化硫：--");
            }else{
            	_kq.find("dd:eq(2)").text("二氧化硫："+aqi.so2+" µg/m3");
            }
			if($.trim(aqi.no2)==''){
				_kq.find("dd:eq(3)").text("二氧化氮：--");
            }else{
            	_kq.find("dd:eq(3)").text("二氧化氮："+aqi.no2+" µg/m3");
            }
			var _zs = kqArea.find(".S-info");
			var chuanyi=this.weatherModle.getZhiShu(zhishu.zs_cy,'chuanyi');
            var shushi=this.weatherModle.getZhiShu(zhishu.zs_ssd,'shushi');
            var ganmao=this.weatherModle.getZhiShu(zhishu.zs_gm,'ganmao');
            var xiche=this.weatherModle.getZhiShu(zhishu.zs_xc,'xiche');
			_zs.find("dd:eq(0)").text("穿衣指数："+chuanyi[0]).attr("title", chuanyi[1]);
			_zs.find("dd:eq(1)").text("舒适指数："+shushi[0]).attr("title", shushi[1]);
			_zs.find("dd:eq(2)").text("感冒指数："+ganmao[0]).attr("title", ganmao[1]);
			_zs.find("dd:eq(3)").text("洗车指数："+xiche[0]).attr("title", xiche[1]);
			this.weatherArea.css("height", "368");
			this.addCityArea.css("height", "368");
			nokqArea.hide();
			kqArea.show();
		}else{
			var _zs = nokqArea.find(".S-info");
			var chuanyi=this.weatherModle.getZhiShu(zhishu.zs_cy,'chuanyi');
            var shushi=this.weatherModle.getZhiShu(zhishu.zs_ssd,'shushi');
            var ganmao=this.weatherModle.getZhiShu(zhishu.zs_gm,'ganmao');
            var xiche=this.weatherModle.getZhiShu(zhishu.zs_xc,'xiche');
			_zs.find("dd:eq(0)").text("穿衣指数："+chuanyi[0]).attr("title", chuanyi[1]);
			_zs.find("dd:eq(1)").text("舒适指数："+shushi[0]).attr("title", shushi[1]);
			_zs.find("dd:eq(2)").text("感冒指数："+ganmao[0]).attr("title", ganmao[1]);
			_zs.find("dd:eq(3)").text("洗车指数："+xiche[0]).attr("title", xiche[1]);
			this.weatherArea.css("height", "328");
			this.addCityArea.css("height", "328");
			kqArea.hide();
			nokqArea.show();
		}
	};
	/**
	 * 初始化城市选择tab
	 */
	weatherCtr.prototype.initCityTab = function(){
		var i = 0;
		var citylist = this.cityStore.readLatestCitys();
		var instance = this;
		var ul = this.weatherArea.find("ul.cityList");
		ul.empty();
		for(i=0; i < citylist.length; i++){
			//<li class="select"><a href="#" class="cityName pur">成都</a><a href="#" class="closed"></a></li>
			(function(city,i){
				var stag="dhv1.head.wea.city";
                var index = i+1;
                if(!city){
                    return ;
                }
                var li = $("<li></li>");
                if(city === instance.currentCity){
                    li.addClass("select");
                }
//                li.hover(function(e){
//                	li.find("a.closed").addClass("close-a");
//                }, function(e){
//                	li.find("a.closed").removeClass("close-a");
//                });
                var a = $("<a></a>").attr({
                	'_stag' : stag + index,
                	'href' : 'javascript:void(0)',
                	'target' : '_self'
                }).addClass("cityName pur").text(city); 
                a.click(function(e){
                	e.stopPropagation();
                    e.preventDefault();
                    instance.getWeathData($(this).text(), false);
                    haoqq.getStatisInstance().reportClick(e, $(this).attr("_stag"), {'type' : 'weather'});
                    haoqq.getDjlStatisInstance().reportClick(e, $(this).attr("_stag"));
                });
                var closeA = $("<a></a>").attr({
                	'_stag' : 'dhv1.head.wea.del',
                	'href' : 'javascript:void(0)',
                	'target' : '_self'
                }).addClass("closed");
                closeA.click(function(e){
                	e.stopPropagation();
                    e.preventDefault();
                    var len = $(this).parent().parent().find("li").length;
                    if(len <= 1){
                        alert("必须保留一个城市");
                        return ;
                    }
                    instance.weatherArea.find(".cityAdd").show();
                    haoqq.getStatisInstance().reportClick(e, $(this).attr("_stag"), {'type' : 'weather'});
                    haoqq.getDjlStatisInstance().reportClick(e, $(this).attr("_stag"));
                    instance.cityStore.deleteCity(a.text());
                    var index = $(this).parent().index();
                    /**最后一个**/
                    var city = "";
                    if(index == (len-1)){
                        city = $(this).parent().prev().find("a").text();
                    }else{
                        city = $(this).parent().next().find("a").text();
                    }
                    $(this).parent().remove();
                    instance.getWeathData(city);
                });
                ul.append(li);
                li.append(a);
                li.append(closeA);
			})(citylist[i],i);
		}
		if(citylist.length >= 3){
			instance.weatherArea.find(".cityAdd").hide();
        }
	};
	/**
	 * 初始化添加城市
	 */
	weatherCtr.prototype.initAddCityEvent = function(){
		var instance = this;
		/**
		 * 添加城市
		 */
		this.weatherArea.find(".cityAdd").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			//<li class="select"><a  class="cityName">成都</a></li>
//			<li class="select"><a  class="cityName">北京</a></li>
			var citylist = instance.cityStore.readLatestCitys();
			var ul = instance.addCityArea.find(".cityList");
			ul.empty();
			for(var i=0; i < citylist.length; i++){
				var li = $("<li></li>").addClass("select");
				var a = $("<a></a>").addClass("cityName").text(citylist[i]);
				ul.append(li);
				li.append(a);
			}
			instance.addCityArea.show();
			haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.add", {'type' : 'weather'});
            haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.add");
		});
		var back_fn = function(e){
			e.stopPropagation();
			e.preventDefault();
			instance.addCityArea.hide();
			instance.weatherArea.show();
      }
		/**
		 * 点击返回
		 */
		this.addCityArea.find("a.back").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			back_fn(e);
			haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.addret", {'type' : 'weather'});
            haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.addret");
		});
		/**
		 * 点击取消
		 */
		this.addCityArea.find("a.cancel").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			back_fn(e);
			haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.addcan", {'type' : 'weather'});
            haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.addcan");
		});
		/**
		 * 点击确定
		 */
		this.addCityArea.find("a.ensure").click(function(e){
			e.stopPropagation();
			e.preventDefault();
			var city = instance.citySelect.getSelectedCity();
			if(instance.cityStore.checkCityExsit.call(instance.cityStore, city)){
               alert("城市："+city+"已经存在");
               return;
			}
			haoqq.getStatisInstance().reportClick(e, "dhv1.head.wea.addcer", {'type' : 'weather'});
            haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.wea.addcer");
           	back_fn(e);
           	instance.getWeathData(city, false);
		});
		
	};
	/**
	 * 获取星期
	 */
	weatherCtr.prototype.getWeekInfo = function(date){
        var values = ["日", "一", "二", "三", "四", "五", "六"];
         date=date.toDate();
        var w = values[date.getDay()];
        return "星期"+w;
    }
	/**
	 * 保存本地城市
	 */
	weatherCtr.prototype.saveCityLocal = function(city){
        this.cityStore.saveLatestCitys(city);
	};
	
	namespace.getWeatherCtrInstance = haoqq.common.Singleton(function(){
		return new weatherCtr();
	});
	
	namespace.createweatherCtr = function(){
		return new weatherCtr();
	};
})(haoqq.namespace('weather'));