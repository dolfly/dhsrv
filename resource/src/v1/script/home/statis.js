/**
 * 统计解决方案
 * @author ronizhang
 * @namespace 
 */
(function(namespace) {

	var Statis = function(){
		
	};
	
	Statis.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Statis.prototype.init = function(){
		this.pageVer = "v1";
		this.expTag = this.getEtag();//实验号
		this.clickUrl = "clickStatis.htm?";
		this.pvUrl = "pvStatis.htm?";
		
		this.ver = $("#context").attr("version");
		this.fver = $("#context").attr("floderVer");
		this.binfo = $.getBrowserInfo();
		this.uskin = g_cookie.get('uskin');//用户皮肤
				
//		this._get = haoqq.util.readGet();
//		this._unc = this._get['unc'];
		this.defaultUnc = "u500874_s1_h1";
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Statis.prototype.initEvent = function(){

	};
	/**
	 * do something
	 * @override
	 */
	Statis.prototype.run = function(){
		
	};
	
	Statis.prototype.doReport = function(url){
		var img = new Image();
		img.onload = img.onerror = img.onabort = function(){
			img = img.onload = img.onerror = img.onabort = null;
		};
		img.src = url;
	};
	
	/**
	 * 锚点统计
	 * @param e
	 * @param _stag tag号
	 * @param param:
	 * 	href:跳转的链接；dataid:内容编号；type：上报类型([link, search, mail, weather, star]默认link)；
	 *  unc：搜索unc；cid：搜索cid；channel：频道；engin：引擎；source：搜索来源；
	 *  email：邮箱；
	 *  
	 */
	Statis.prototype.reportClick = function(e, _stag, param){
		var formdata = {
			'tag' : _stag,
			'page_v': this.pageVer,
			'labno' : this.expTag,
			'o_url' : location.href,//页面url
			'unc' : param.unc || g_unc || this.defaultUnc,
			'cid' : param.cid || "",
			'type' : param.type || "link",
            'eid' : param.dataid || "",
			't_url' : param.href || "",
			'ch' : param.channel || "",
			'eg' : param.engin || "",
			'src' : param.source || "",
			'em' : param.email || "",
			'px' : e && e.pageX || "0",
			'py' : e && e.pageY || "0",
			'sh' : window.screen.height,
			'sw' : window.screen.width,
			'bw' : $(window).width(),
			'bh' : $(window).height(),
//			'bm' : $.support.boxModel,//盒子模型
			'fv' : this.fver,//静态资源目录版本
			'v' : this.ver,//静态资源版本
			'bi' : this.binfo.brower,//浏览器
			'bv' : this.binfo.ver,//浏览器版本
			'skin' : this.uskin,//用户使用皮肤
			'rn' : Math.round(Math.random() * 100000)
		};
		this.doReport(this.clickUrl + $.param(formdata));
	};
	
	/**
	 * pv统计
	 */
	Statis.prototype.reportPv = function(){
		var formdata = {
				'o_url' : location.href,//页面url
				'page_v': this.pageVer,
				'labno' : this.expTag,
				'labno' : this.expTag,
				'unc' : g_unc || this.defaultUnc,
				'sh' : window.screen.height,
				'sw' : window.screen.width,
				'bw' : $(window).width(),
				'bh' : $(window).height(),
//				'bm' : $.support.boxModel,//盒子模型
				'fv' : this.fver,//静态资源目录版本
				'v' : this.ver,//静态资源版本
				'bi' : this.binfo.brower,//浏览器
				'bv' : this.binfo.ver,//浏览器版本
				'skin' : this.uskin,//用户使用皮肤
				'rn' : Math.round(Math.random() * 100000)
		};
        this.doReport(this.pvUrl + $.param(formdata));
	};
	
	namespace.getStatisInstance = haoqq.common.Singleton(function(){
		return new Statis();
	});
	
	namespace.createStatis = function(){
		return new Statis();
	};
	
} (haoqq));