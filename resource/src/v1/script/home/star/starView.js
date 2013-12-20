/**
 * 星座模块
 * @author ronizhang
 */
(function(namespace){
	
	var StarView = function(){
		
	};
	
	StarView.prototype = new haoqq.common.Template();
	
	var onClick = function(){
		//上报
		haoqq.getStatisInstance().reportClick(null, "dhv1.pac.area3.astro", {});
		haoqq.getDjlStatisInstance().reportClick(null, "dhv1.pac.area3.astro");
	};
	
	/**
	 * 初始化变量
	 * @override
	 */
	StarView.prototype.init = function(){
		this.starStorageKey = 'starSelect';//选择星座存储key
		//初始组件
        this.selectView1 = new haoqq.SelectView($('#curStar1'), $('#xzSelectList1'), $("#xzSelect1"), undefined, onClick);
        this.selectView2 = new haoqq.SelectView($('#curStar2'), $('#xzSelectList2'), $("#xzSelect2"), undefined, onClick);
    	var tabs = $("#starDayTab li");
		var config = {
				'container' : $("#module4"),
				'currentClassName' : 'select',
				'tabChangeType' : 'click',
			//	'tabTagName' : $("#searchUl li"),
				'currentIndex' : 0,
				'isAllowClickCurTab' : false,
				'tabs' : tabs,
				'tabPanels' : $(".xz-pages"),
				'onMouseEnterTab' : function(index, e){
//					 $(".xzMore").hide();
//					 $($(".xzMore")[index]).show();
				},
				'onClickTab' : function(index, e){
//					$(".xzMore").hide();
//					$($(".xzMore")[index]).show();
				}
		};
		haoqq.tab.TabView(config);
	};
	/**
	 * 初始化事件
	 * @override
	 */
	StarView.prototype.initEvent = function(){
		var instance = this;
		//星座选择事件
        this.selectView1.onchange = function() {
            var option = instance.selectView1.getOptions(instance.selectView1.getSelectIdx());
            instance._getStarInfo.call(instance, option, false);
            instance.selectView2.setSelectIdx(instance.selectView1.getSelectIdx());
            //保存
            g_storge.set(instance.starStorageKey, option);
            //上报
    		haoqq.getStatisInstance().reportClick(null, "dhv1.pac.area3.change", {});
    		haoqq.getDjlStatisInstance().reportClick(null, "dhv1.pac.area3.change");
        }
        //星座选择事件
        this.selectView2.onchange = function() {
            var option = instance.selectView2.getOptions(instance.selectView2.getSelectIdx());
            instance._getStarInfo.call(instance, option, false);
            //保存
            instance.selectView1.setSelectIdx(instance.selectView2.getSelectIdx());
            g_storge.set(instance.starStorageKey, option);
            //上报
            haoqq.getStatisInstance().reportClick(null, "dhv1.pac.area3.change", {});
    		haoqq.getDjlStatisInstance().reportClick(null, "dhv1.pac.area3.change");
        };

	};
	/**
	 * do something
	 * @override
	 */
	StarView.prototype.run = function(){
		var star = g_storge.get(this.starStorageKey);
    	this._getStarInfo(star? star : "", true);
	};
	
	/**
	 * 获取星座信息
	 */
	StarView.prototype._getStarInfo = function(star, isInit, callback){
		var $this = this;
    	$.requestJson('getStarInfo.htm', function(json){
    		if(json.code == 0){
    			$this._fillData.call($this, json);
                if(typeof callback ==='function'){
                	callback();
                } 
    		}else{
    			if(!isInit){
    				alert("当前星座查询人数过多，请稍候再试(:");
    			}
    		}
        },{
           'star' : star
        },'post');
	};
	
	/**
	 * 填充数据
	 */
	StarView.prototype._fillData = function(data){
		var info = data.starInfo;
		$("#curStar1").text(info.type.cnName);
		$("#curStar2").text(info.type.cnName);
		$("#starImg1").removeClass();
		$("#starImg2").removeClass();
		$("#starImg1").addClass("xz-img").addClass("xz-icon"+info.type.value);
		$("#starImg2").addClass("xz-img").addClass("xz-icon"+info.type.value);
		//今日
		this._paintScore(info.todayFortune.globalScore, $("#todayStar .starList"));
		$("#todayStar").find(".xz-kind:eq(0)").find("p:eq(0)").text(info.todayFortune.loveScore+"%");
		$("#todayStar").find(".xz-kind:eq(1)").find("p:eq(0)").text(info.todayFortune.careerScore+"%");
		$("#todayStar").find(".xz-kind:eq(2)").find("p:eq(0)").text(info.todayFortune.finaceScore+"%");
		
		$("#todayStar p.xz-intro").text(info.todayFortune.detailDescription);
		$("#todayStar a.more").attr('href', info.todayFortune.forwardUrl);
		//明日
		this._paintScore(info.tomorrowFortune.globalScore, $("#tomorrowStar .starList"));
		$("#tomorrowStar").find(".xz-kind:eq(0)").find("p:eq(0)").text(info.tomorrowFortune.loveScore+"%");
		$("#tomorrowStar").find(".xz-kind:eq(1)").find("p:eq(0)").text(info.tomorrowFortune.careerScore+"%");
		$("#tomorrowStar").find(".xz-kind:eq(2)").find("p:eq(0)").text(info.tomorrowFortune.finaceScore+"%");
		
		$("#tomorrowStar p.xz-intro").text(info.tomorrowFortune.detailDescription);
		$("#tomorrowStar a.more").attr('href', info.tomorrowFortune.forwardUrl);
	};
	
	/**
	 * 绘制分数
	 */
	StarView.prototype._paintScore = function(num, dom){
		dom.empty();
		var score = this._convertNumToScore(num);
		for(var i = 0; i < score.full; i++){
			var em = $("<span></span>").addClass("star full");
			dom.append(em);
		}
		if(score.hasHalf){
			var em = $("<span></span>").addClass("star half");
			dom.append(em);
			score.full++;
		}
		for(var i = 0; i < 5-score.full; i++){
			var em = $("<span></span>").addClass("star empty");
			dom.append(em);
		}
	};
	
	/**
	 * 100分转换成5星
	 */
	StarView.prototype._convertNumToScore = function(num){
		if(num < 0 || num > 100){
			return {
				hasHalf : false,
				full : 0
			};
		}
		var full = Math.floor(num/20);
		var half = num%20;
		var hasHalf = false;
		if(half >= 10){
			hasHalf = true;
		}
		return {
			hasHalf : hasHalf,
			full : full
		};
	};
	
	namespace.getStarViewInstance = haoqq.common.Singleton(function(){
		return new StarView();
	});
	
	namespace.createStarView = function(){
		return new StarView();
	};
	
}(haoqq.namespace('module')));