/**
 * 组件定制化
 * @author ronizhang
 */
(function(namespace){
	
	var Component = function(){
		
	};
	
	Component.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Component.prototype.init = function(){
		this.editPanel = $("#moduleEditPanel");
		this.mask = new haoqq.PageMask();
		
		this.defaultOrder = ['1', '2', '6', '7'];
		this.customKey = "custom";
		
		this.baseHeight = 1165;//右边基准高度：333 + 333 + 232 + 267 //可变区域高度 371
		
		this.originHeight = 260;
		if($("#picTopic").is(":visible")){
			var picTopicHeight = 78;//图片专题位高度 66+2+10
//			var temp = $("#adaptModule ul.list");
			this.originHeight = this.originHeight - picTopicHeight;
//			temp.height(this.originHeight);
		}
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Component.prototype.initEvent = function(){
		var instance = this;
		//hover
		$(".rightSeciton .caption").hover(function(e){
			$(this).find(".rgt-cap-tool").show();
			$(this).find(".rgt-cap-tool-grey").hide();
		}, function(e){
			$(this).find(".rgt-cap-tool").hide();
			$(this).find(".rgt-cap-tool-grey").show();
		});
		//点击编辑
		$(".rightSeciton .caption .rgt-cap-tool").click(function(e){
			e.preventDefault();
			var _tmp = $(this).parent().parent();
			var left = _tmp.offset().left - instance.editPanel.width() - 2;
			var top = _tmp.offset().top - 1;
			instance.editPanel.css({'left' : left, 'top' : top}).show();
			instance.mask.show();
			//关闭tips
			if(haoqq.tips.getComponentTipInstance().isShow()){
				haoqq.tips.getComponentTipInstance().close();
			}
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.detail", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.detail");
		});
		
		//点击关闭
		instance.editPanel.find(".icon-close2").click(function(e){
			e.preventDefault();
			var _order;
			try{
				//恢复之前的选择
				_order = g_cookie.get(instance.customKey).split("|");
			}catch(e){
				//使用默认
				_order = instance.defaultOrder;
			}
			//调整面板
			instance.setEditPanel(_order);
			//移动模块
			instance.moveModule();
			instance.editPanel.hide();
			instance.mask.hide();
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.close", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.close");
		});
		
		//点击保存
		instance.editPanel.find(".save").click(function(e){
			e.preventDefault();
			if(instance.editPanel.find("li.side-now").length != 4){
				alert("请选择4个模块");
				return;
			}
			instance.editPanel.hide();
			instance.mask.hide();
			instance.saveCustom(instance.editPanel.find("li.side-now"));
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.save", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.save");
		});
		
		//点击恢复默认
		instance.editPanel.find(".restore").click(function(e){
			e.preventDefault();
			//调整面板
			instance.setEditPanel(instance.defaultOrder);
			//移动模块
			instance.moveModule();
			instance.editPanel.hide();
			instance.mask.hide();
			instance.saveCustom(instance.editPanel.find("li.side-now"));
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.default", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.default");
		});
		
		//选择模块
		instance.editPanel.find(".icon-xuan").click(function(e){
			e.preventDefault();
			var curli = $(this).parent();
			if(curli.hasClass("side-now")){
				curli.removeClass("side-now");
				curli.find("p").find("span:eq(1)").hide();
				//上报
				haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.cancel", {});
				haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.cancel");
			}else{
				//上报
				haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.confirm", {});
				haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.confirm");
				if(instance.editPanel.find("li.side-now").length >= 4){
					alert("最多只能选择4个模块");
					return;
				}else{
					curli.addClass("side-now");
					curli.find("p").find("span:eq(1)").show();
				}
			}
			instance.moveModule();
		});
		
		//向上移动
		instance.editPanel.find(".a-prve2").click(function(e){
			e.preventDefault();
			var moveli = $(this).parent().parent().parent();
			var prevLi = moveli.prevAll();
			for(var i = 0; i < prevLi.length; i++){
				var _temp = $(prevLi[i]);
				if(_temp.hasClass("side-now")){
					_temp.before(moveli);
					break;
				}
			}
			instance.moveModule();
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.up", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.up");
		});
		//向下移动
		instance.editPanel.find(".a-next2").click(function(e){
			e.preventDefault();
			var moveli = $(this).parent().parent().parent();
			var nextLi = moveli.nextAll();
			for(var i = 0; i < nextLi.length; i++){
				var _temp = $(nextLi[i]);
				if(_temp.hasClass("side-now")){
					_temp.after(moveli);
					break;
				}
			}
			instance.moveModule();
			//上报
			haoqq.getStatisInstance().reportClick(e, "dhv1.pac.edit.down", {});
			haoqq.getDjlStatisInstance().reportClick(e, "dhv1.pac.edit.down");
		});
	};
	
	/**
	 * do something
	 * @override
	 */
	Component.prototype.run = function(){
		var _order;
//		g_cookie.del(this.customKey);
		try{
			//cookie中的
			_order = g_cookie.get(this.customKey).split("|");
		}catch(e){
			//使用默认
			_order = this.defaultOrder;
		}
		this.setEditPanel(_order);
		this.moveModule();
	};
	
	/**
	 * 调整模块
	 */
	Component.prototype.moveModule = function(){
		//记录当前模块高度
//		var oldHeight = this.getModuleHeight($("#componentArea .customModule:visible"));
		var selectedLi = this.editPanel.find("li.side-now");
		$("#componentArea .customModule").hide();
		for(var i = selectedLi.length - 1; i >= 0; i--){
			var moduleId = $(selectedLi[i]).attr("_ref");
			var module = $("#module" + moduleId);
			$("#componentArea").prepend(module);
			module.show();
		}
		//获取新模块高度
		var newHeight = this.getModuleHeight($("#componentArea .customModule:visible"));
//		var offset = newHeight > this.baseHeight ? Math.ceil((newHeight - this.baseHeight)/26)*26 : Math.ceil((newHeight - this.baseHeight)/26)*26;
		var offset = Math.ceil((newHeight - this.baseHeight)/26)*26;
		$("#adaptModule ul.list").height(this.originHeight - offset);
		//加载图片
		haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		//模块变化事件
		this.trigger('modChange');
	};
	
	/**
	 * 获取模块高度
	 */
	Component.prototype.getModuleHeight = function(mods){
		var _total = 0;
		for(var i = 0; i < mods.length; i++){
			_total += $(mods[i]).height();
		}
		return _total;
	};
	
	/**
	 * 保存定制
	 */
	Component.prototype.saveCustom = function(mods){
		var _order = "";
		for(var i = 0; i < mods.length; i++){
			if(i == 0){
				_order += $(mods[i]).attr("_ref");
			}else{
				_order += ("|" + $(mods[i]).attr("_ref"));
			}
		}
		g_cookie.set(this.customKey, _order, 'long');
		//发请求保存
		$.requestJson('saveUserProfile.htm', function(json){
    		return;
        },{
           'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid")),
           'type' : 1,
           'data' : _order
        },'post');
	};
	
	/**
	 * 设置编辑面板
	 */
	Component.prototype.setEditPanel = function(selected){
		//校验格式
		var _len = selected.length;
		if(_len != 4){
			selected = this.defaultOrder;
		}else{
			for(var i = 0; i < _len; i++){
				var _t = parseInt(selected[i]);
				if(!/^[1-7]*$/.test(_t)){
					selected = this.defaultOrder;
				}
			}
		}
		var _ul = this.editPanel.find("ul.side-ul");
		_ul.find("li.side-now").removeClass("side-now")
			.find("p").find("span:eq(1)").hide();
		for(var i = _len - 1; i >= 0; i--){
			var _curLi = _ul.find("li[_ref='"+selected[i]+"']")
			_curLi.addClass("side-now");
			_curLi.find("p").find("span:eq(1)").show();
			//移动
			_ul.prepend(_curLi);
		}
	};
	
	namespace.getComponentInstance = haoqq.common.Singleton(function(){
		return haoqq.common.Event.extendEvent(new Component());
	});
	
	namespace.createComponent = function(){
		return haoqq.common.Event.extendEvent(new Component());
	};
	
}(haoqq.namespace('component')));