/**
 * 换肤管理
 * @author ronizhang
 */
(function(namespace){
	
	var SkinManager = function(){
		
	};
	
	SkinManager.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	SkinManager.prototype.init = function(){
		this.SKIN_KEY = "uskin";
		this.DEFAULT_SKIN = "skin";
		this.list = haoqq.util.ArrayList();
		this.curSkin = g_cookie.get(this.SKIN_KEY);
		this.panel = $("#theme-panel");
		this.skinList = $("#skinList");
		
		this.totalPage = 0;
		this.curPage = 1;
		
		this.reloadList();//初始化list
		this.totalPage = Math.ceil(this.list.size()/6);
		this.setPageTab();
		this.changPage();
	};
	/**
	 * 初始化事件
	 * @override
	 */
	SkinManager.prototype.initEvent = function(){
		var instance = this;
		//点击换肤
//		$("#changeSkin").click(function(e){
//			e.preventDefault();
//			instance.togglePanel();
//		});
		
		//恢复默认
		this.panel.find("div.help").find("a:eq(1)").click(function(e){
			e.preventDefault();
			instance.curSkin = instance.DEFAULT_SKIN;//当前皮肤
			//换肤
			instance.changeSkin(instance.DEFAULT_SKIN);
			instance.hidePanel();
			//设置cookie
			instance.saveSkin(instance.curSkin);
//			g_cookie.set(instance.SKIN_KEY, instance.curSkin, 'long');
		});
		//取消
		this.panel.find(".cancel").click(function(e){
			e.preventDefault();
			instance.hidePanel();
			instance.curSkin = g_cookie.get(instance.SKIN_KEY) || instance.DEFAULT_SKIN;
			//皮肤还原
			instance.changeSkin(instance.curSkin);
		});
		//保存
		this.panel.find(".save").click(function(e){
			e.preventDefault();
			//设置cookie
			instance.saveSkin(instance.curSkin);
//			g_cookie.set(instance.SKIN_KEY, instance.curSkin, 'long');
			instance.hidePanel();
		});
		//换页
		this.panel.find("div.pages").find("a.prev").click(function(e){
			e.preventDefault();
			if(instance.curPage <= 1){
				return;
			}
			instance.curPage--;
			instance.changPage();
			instance.setPageTab();
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		});
		this.panel.find("div.pages").find("a.next").click(function(e){
			e.preventDefault();
			if(instance.curPage >= instance.totalPage){
				return;
			}
			instance.curPage++;
			instance.changPage();
			instance.setPageTab();
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		});
		//点击皮肤
		for(var i = 0; i < this.list.size(); i++){
			this.list.get(i).click(function(e){
				e.preventDefault();
				instance.curSkin = $(this).attr("_skin");//当前皮肤
				//换肤
				instance.changeSkin(instance.curSkin);
			});
		}
	};
	/**
	 * do something
	 * @override
	 */
	SkinManager.prototype.run = function(){
		
	};
	
	/**
	 *	加载list
	 */
	SkinManager.prototype.reloadList = function(){
		var instance = this;
		this.list.clear();
		this.skinList.find("li").each(function(){
			if(instance.curSkin){//有设置皮肤
				if(instance.curSkin === $(this).attr("_skin")){
					$(this).addClass("select");
				}else{
					$(this).removeClass("select");
				}
			}else if(instance.DEFAULT_SKIN === $(this).attr("_skin")){//未设置皮肤
				$(this).addClass("select");
			}
			instance.list.add($(this));
		});
	};
	/**
	 * 设置翻页按钮
	 */
	SkinManager.prototype.setPageTab = function(){
		var pageArea = this.panel.find("div.pages");
		if(this.totalPage == 1){
			pageArea.find("a.prev").addClass("font-grey");
			pageArea.find("a.next").addClass("font-grey");
		}else if(this.curPage == 1){
			pageArea.find("a.prev").addClass("font-grey");
			pageArea.find("a.next").removeClass("font-grey");
		}else if(this.curPage >= this.totalPage){
			pageArea.find("a.next").addClass("font-grey");
			pageArea.find("a.prev").removeClass("font-grey");	
		}else{
			pageArea.find("a.prev").removeClass("font-grey");	
			pageArea.find("a.next").removeClass("font-grey");
		}
		pageArea.find("span").text(this.curPage+"/"+this.totalPage);
	};
	/**
	 * 皮肤li翻页
	 */
	SkinManager.prototype.changPage = function(){
		var _maxScope = this.curPage*6;
		var _minScope = _maxScope - 6;
		for(var i = 0; i < this.list.size(); i++){
			if(i >= _minScope && i < _maxScope){
				this.list.get(i).show();
			}else{
				this.list.get(i).hide();
			}
		}
	};
	/**
	 * 换肤显示切换
	 */
	SkinManager.prototype.changeSkin = function(skin){
		uskin.href = g_cssDomain + skin + ".css?ver=" + g_version;//换css
		//重置当前所选
		for(var i = 0; i < this.list.size(); i++){
			if(skin === this.list.get(i).attr("_skin")){
				this.list.get(i).addClass("select");
			}else{
				this.list.get(i).removeClass("select");
			}
		}
	};
	/**
	 * 换肤显示切换
	 */
	SkinManager.prototype.togglePanel = function(){
		if(this.panel.is(":visible")){
			this.hidePanel();
			this.curSkin = g_cookie.get(this.SKIN_KEY) || this.DEFAULT_SKIN;
			//皮肤还原
			this.changeSkin(this.curSkin);
		}else{
			this.showPanel();
		}
	};
	/**
	 * 换肤显示
	 */
	SkinManager.prototype.showPanel = function(){
		var browerInfo = $.getBrowserInfo();
		if(browerInfo.brower == 'msie' && browerInfo.ver == '6.0'){
			$(".gotop-infobox").css('margin-top', '277px');
		}else{
			$(".gotop-infobox").css('top', '277px');
		}
		this.panel.show();
		this.panel.animate({
			height: '200px'
		}, 350, 'linear', function(){
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			haoqq.tips.getTipsTriggerInstance().reloadTips();
		});
	};
	/**
	 * 换肤隐藏
	 */
	SkinManager.prototype.hidePanel = function(){
		var browerInfo = $.getBrowserInfo();
		this.panel.animate({
			height: 0
		}, 350, 'linear', function(){
			$(this).hide();
			if(browerInfo.brower == 'msie' && browerInfo.ver == '6.0'){
				$(".gotop-infobox").css('margin-top', '156px');
			}else{
				$(".gotop-infobox").css('top', '156px');
			}
			haoqq.tips.getTipsTriggerInstance().reloadTips();
		});
	};
	
	SkinManager.prototype.saveSkin = function(skin){
		g_cookie.set(this.SKIN_KEY, skin, 'long');
		//发请求保存
		$.requestJson('saveUserProfile.htm', function(json){
			return;
	    },{
	       'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid")),
	       'type' : 2,
	       'data' : skin
	    },'post');
	};
	
	namespace.getSkinManagerInstance = haoqq.common.Singleton(function(){
		return new SkinManager();
	});
	
	namespace.createSkinManager = function(){
		return new SkinManager();
	};
	
}(haoqq.namespace('skin')));