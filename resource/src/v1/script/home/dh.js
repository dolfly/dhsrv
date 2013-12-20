if (typeof(console) === 'undefined') {
	window.console = {
		log: function() {}
	};
}

//全局cookie
var g_cookie = new haoqq.Cookie();
//全局持久化存储对象
var g_storge = new haoqq.Storage();
//静态资源域
var t_context = $("#context");
var g_jsDomain = t_context.attr("resourcePath") 
				+ "/" + t_context.attr("floderVer") 
				+ "/script/";
var g_cssDomain = t_context.attr("resourcePath") 
				+ "/" + t_context.attr("floderVer") 
				+ "/css/";
var g_imgDomain = t_context.attr("resourcePath") 
	+ "/" + t_context.attr("floderVer") 
	+ "/v1img/";
var g_version = t_context.attr("version");
t_context = null;

var g_get = haoqq.util.readGet();
var g_unc = g_get['unc'];

/**
 * 获取网址icon，没有拉到则返回默认图标
 */
var defaultIcon = g_imgDomain + "hao_logo.jpg";
var setIconUrl = function(url, img){
	var iconUrl = new Image();
	img.attr('src', defaultIcon);
	iconUrl.src = haoqq.util.getFavIcon(url);
	iconUrl.onload = function(){
		img.attr('src', iconUrl.src);
	};
//	iconUrl.onerror = function(){
//		img.attr('src', defaultIcon);
//	};
};

/**
 * 设置主页
 * @param url
 */
function setHomepage()
{
	var ua = navigator.userAgent.toLowerCase();
    if (document.all && ua.indexOf("qqbrowser") < 0)//是ie，并且不是操蛋的qq浏览器
    {
        try{
            document.body.style.behavior='url(#default#homepage)';
            document.body.setHomePage("http://hao.qq.com");
        }catch(e){
        	window.open('setHomePage.htm');
        }
    }
    else
    {
    	   window.open('setHomePage.htm');
    }
}

$(document).ready(function(){
	 //管家推广
    if(g_unc === 'o400493_1'){
    	var gjIframe = document.createElement('iframe');
    	gjIframe.setAttribute('scrolling', 'no');
    	gjIframe.setAttribute('frameBorder', 0);
    	gjIframe.src="http://hao.qq.com/success.htm?unc=o400493_1";
    	gjIframe.style.display = "none";
    	document.body.appendChild(gjIframe);
    }
    
	/**日历初始**/
	var calendar = haoqq.calendar.getCalendarInstance();
	calendar.start();
	/**初始化定制模块**/
	var component = haoqq.component.getComponentInstance();
	component.start();
	/**天气初始化**/
	var wea = haoqq.weather.getWeatherCtrInstance();
	wea.start();
	/**名站初始化**/
	var mz = haoqq.mz.getMzViewInstance();
	mz.start();
	/**访问历史初始化**/
	var history = haoqq.mz.getHistoryInstance();
	history.start();
	/**qq登录**/
	var user = haoqq.user.getQqViewInstance();
	user.start();
	
	/**搜索初始化**/
	var search = haoqq.search.getSearchCtrInstance();
	search.start();
	/**右边模块初始化**/
	var news = haoqq.module.getNewsInstance();
	news.start();
	var video = haoqq.module.getVideoInstance();
	video.start();
	var mail = haoqq.module.getMailInstance();
	mail.start();
	var star = haoqq.module.getStarViewInstance();
	star.start();
	var stock = haoqq.module.getStockViewInstance();
	stock.start();
	var lottery = haoqq.module.getLotteryViewInstance();
	lottery.start();
	var recharge = haoqq.module.getRechargeViewInstance();
	recharge.start();
	
	/**图片lazyload**/
	$("img.sync").lazyload({
		effect : 'fadeIn',
//		failure_limit : '10',
		threshold : 150 //距离目标多少像素前开始加载
	});
	/**顶部tab菜单初始化**/
	var navTab = haoqq.nav.getNavTabViewInstance();
	navTab.start();
	/*兼容html5的placeholder*/
	var holder = new haoqq.PlaceHolder();
	holder.init("placeholder");
	
	/**换肤初始化**/
	var skin = null;
	$("#changeSkin").click(function(e){
		e.preventDefault();
		if(!skin){//省内存，第一次点击再启动
			skin = haoqq.skin.getSkinManagerInstance();
			skin.start();
			hasSkinInit = true;
		}
		skin.togglePanel();
		//关闭tips
		if(haoqq.tips.getSkinTipInstance().isShow()){
			haoqq.tips.getSkinTipInstance().close();
		}
	});
	var hotword = haoqq.search.getHotWordInstance();
	hotword.start();
	
	/*回顶部*/
	var goTop = $(".goto-top");
	$(window).scroll(function(){
		if($(this).scrollTop() > 100){
			goTop.fadeIn();//ronizhang:fadeIn会有4000k左右内存泄漏（ie7下，其它浏览器没测）
		}else{
			goTop.fadeOut();//ronizhang:fadeOut会有4000k左右内存泄漏（ie7下，其它浏览器没测）
		}
	});
	goTop.click(function(){
		if(/msie/.test(navigator.userAgent.toLowerCase()) && !window.XMLHttpRequest){
			$(window).scrollTop(0);
		}
		$('body,html').animate({ 
			scrollTop : 0
		  }, 1000, 'swing');
	});
	
	/*设置首页*/
	$(".sethomepage").click(function(e){
		 e.preventDefault();
		 setHomepage();
	});
	$("#logo").click(function(e){
		 e.preventDefault();
		 setHomepage();
	}); 
	
	/*回到旧版*/
	$("#backToOld").click(function(e){
		e.preventDefault();
		haoqq.getStatisInstance().reportClick(e, "dhv1.head.toold", {});
		haoqq.getDjlStatisInstance().reportClick(e, "dhv1.head.toold");
		var params={
				 v:'0',
				 g_tk:haoqq.util.getACSRFToken(g_cookie.get("uiid"))
		 }
		window.location.href = haoqq.util.paramsLocation(params);
	});
	
	/*弹出框*/
	var tips = haoqq.tips.getTipsInstance();
	tips.start();
	
	/*发现精彩*/
//	var hl = haoqq.find.getFindHighLightInstance();
//	hl.start();
	
	/*统计初始化*/
	var statis = haoqq.getStatisInstance();
	statis.start();
	var djlStatis = haoqq.getDjlStatisInstance();
	djlStatis.start();
	
	/*上报pv*/
	statis.reportPv();
	
	/*豆瓣音乐*/
	if(window.postMessage && "undefined" != typeof JSON){
		var dbIframe = $("<iframe></iframe>");
		dbIframe.attr({
			'id' : 'douban_iframe',
			'scrolling' : 'no',
			'allowtransparency' : 'true',
			'frameborder' : 'no',
			'src' : 'http://douban.fm/partner/haoqq'
		}).css({
			'z-index' : '10',
			'width' : '195px',
			'height' : '33px'
		});
		$("#doubanFrame").append(dbIframe);
		
		if (window.addEventListener) {
			window.addEventListener("message", function(e){		
				if(e.origin !== 'http://douban.fm') return;
				var data = JSON.parse(e.data);
//				dbIframe.css('height', data);
				dbIframe.css('height', data.fm_win_height);
			}, false);
		}else if (window.attachEvent) {
			window.attachEvent("onmessage", function(e){
				if(e.origin !== 'http://douban.fm') return;
				var data = JSON.parse(e.data);
				dbIframe.css('height', data.fm_win_height);		
			});
		}
	}
	
	/*捕获所有页面点击*/
	$(document).click(function(e){
		if(e.which == 3){//屏蔽firefox右键点击
			return;
		}
		var target = e.target;
		var ancestor = $.findAttr($(target), "_stag", 2);
		if(ancestor == null) return;
		var _stag = ancestor.attr("_stag");
		var _href = ancestor.attr("href");//目标跳转url
		var _type = ancestor.attr("_type");
		var _title = ancestor.attr("_title");//名字
        var _dataid = ancestor.attr("_eid");//元素ID
//        var _hottag = ancestor.attr("_hottag");//元素ID
		//如果是锚点，统计点击
		statis.reportClick(e, _stag, {
			'href' : _href,
			'type' : _type,
			'dataid' : _dataid
		});
		djlStatis.reportClick(e, _stag);
		//如果需要，更新浏览历史
		if(_title && _href) history.updatePageHis(_title, _href);
	});
});