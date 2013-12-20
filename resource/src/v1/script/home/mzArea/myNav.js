/**
 * 我的导航
 * @author ronizhang
 */
(function(namespace){
	
	var MyNav = function(){
		
	};
	
	MyNav.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	MyNav.prototype.init = function(){
		this.curHis = 0;//当前我的导航网站数量
		this.MAX_HIS = 30;
		
		this.userMrg = haoqq.user.getUserManagerInstance();
		this.mask = new haoqq.PageMask();
	};
	/**
	 * 初始化事件
	 * @override
	 */
	MyNav.prototype.initEvent = function(){
		var instance = this;
		//点击登录按钮
		$("#myNavDov .nologin").find(".madeBtn").click(function(e){
			e.preventDefault();
			instance.userMrg.login();
		});
		//点击添加
		$("#myNavDov .nodata").find(".madeBtn").click(function(e){
			e.preventDefault();
			instance.showAddDialog();
		});
		$("#myNavDov .hasdata").find(".add").click(function(e){
			e.preventDefault();
			instance.showAddDialog();
		});
		//对话框点击取消，关闭
		$("#addSiteDialog .cancel").click(function(e){
			e.preventDefault();
			instance.hideAddDialog();
		});
		$("#addSiteDialog .madedivClosed").click(function(e){
			e.preventDefault();
			instance.hideAddDialog();
		});
		//对话框确认添加网址
		$("#addSiteDialog .confirm").click(function(e){
			e.preventDefault();
			var siteNameInput = $("#addSiteDialog input:eq(0)");
			var siteUrlInput = $("#addSiteDialog input:eq(1)");
			var name = siteNameInput.val();
			var url = siteUrlInput.val();
			instance.clearAddDialogError();
			if($.trim(name)==''){
				siteNameInput.parent("li").removeClass().addClass("error");
				siteNameInput.next("span").text("请输入名称");
				return;
			}
			if(haoqq.util.len(name) > 10){
				siteNameInput.parent("li").removeClass().addClass("error");
				siteNameInput.next("span").text("不能超过5个字符");
				return;
			}
			if($.trim(url)==''){
				siteUrlInput.parent("li").removeClass().addClass("error");
				siteUrlInput.next("span").text("请输入网址");
				return;
			}
//			url = haoqq.util.getUrl(url);
			if(!Validator.isUrl(haoqq.util.getUrl(url))){
				siteUrlInput.parent("li").removeClass().addClass("error");
				siteUrlInput.next("span").text("网址格式不合法");
				return;
			}
			instance.addNav(name, url);
		});
		//点击删除
		$("#myNavDov .controlBtn").find(".cancel").click(function(e){
			e.preventDefault();
			$("#myNavDov ul.madeList").find(".item").addClass("closedSelect");
			$(this).hide();
			$("#myNavDov .hasdata").find(".add").hide();
			$("#myNavDov .controlBtn").find(".finish").show();
		});
		//点击删除完成
		$("#myNavDov .controlBtn").find(".finish").click(function(e){
			e.preventDefault();
			$("#myNavDov ul.madeList").find(".item").removeClass("closedSelect");
			$(this).hide();
			$("#myNavDov .hasdata").find(".add").show();
			$("#myNavDov .controlBtn").find(".cancel").show();
		});
		
		//点击删除 live绑定
		this.bindDelEvent();
		
		//回车
		$(document).keypress(function(e) {
			if (e.keyCode == 13 && $("#addSiteDialog").is(":visible")){
				$("#addSiteDialog .confirm").trigger('click');
			}
		});
	};
	/**
	 * do something
	 * @override
	 */
	MyNav.prototype.run = function(){
		//添加登录，登出事件监听
		this.userMrg.addListener('login', this.renderPage);
		this.userMrg.addListener('logout', this.renderPage);
	};
	
	/**
	 * 渲染页面
	 */
	MyNav.prototype.renderPage = function(){
		var instance = haoqq.mz.getMyNavInstance();
		if(!$("#myNavDov").is(":visible")){//不可见则返回
			return;
		}
		instance.curHis = 0;//清0
		if(!instance.userMrg.hasLoged()){//未登录
			$("#myNavDov .nodata").hide();
			$("#myNavDov .hasdata").hide();
			$("#myNavDov .nologin").show();
			//加载图片
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
		}else{//已经登录
			//请求列表
			$.requestJson("getfavsitelist.htm", function(data){
				if(!data && data.code != '0'){
					alert("当前访问用户太多了，暂时获取不到您的数据:)");
					return;
				}
				var list = data.sitelist;
				$("#myNavDov .nologin").hide();
				if(list && list.length > 0){//渲染页面
					instance.curHis = list.length;
					if(instance.curHis > instance.MAX_HIS){
						instance.curHis = instance.MAX_HIS;
					}
					//清掉旧的
					var listDiv = $("#myNavDov ul.madeList");
					listDiv.find("li.item").remove();
					// 循环添加历史网站
					for(var i = 0; i < list.length; i++){
						if(i == instance.MAX_HIS){
							break;
						}
						var tempUrl = list[i].url.replace("http://", "");//http:www.qq.com
						tempUrl = tempUrl.replace("http:", "");
						tempUrl = tempUrl.replace("https://", "");
						tempUrl = tempUrl.replace("https:", "");
						var _li = $("<li id='nav_"+list[i].id+"' class='item'></li>");
						var _a1 = $("<a class='cont' href='"+haoqq.util.getUrl(tempUrl)+"' _stag='dhv1.mynav.favsite"+(i+1)+"'></a>");
						var _img = $("<img height='16' width='16'/>");
						setIconUrl(haoqq.util.getUrl(tempUrl), _img);
						var _em = $("<em>"+list[i].name+"</em>");
						var _a2 = $("<a _id='"+list[i].id+"' class='closedSelect-icon delMynav' href='#' _stag='dhv1.mynav.del.cer'></a>");
						listDiv.prepend(_li);
						_li.append(_a1).append(_a2);
						_a1.append(_img).append(_em);
					}
					$("#myNavDov .nodata").hide();
					$("#myNavDov .hasdata").show();
					//重新绑定
					instance.unbindDelEvent();
					instance.bindDelEvent();
				}else{//该用户没有数据
					$("#myNavDov .hasdata").hide();
					$("#myNavDov .nodata").show();
				}
				//加载图片
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}, {}, 'post');
		}
	};
	
	MyNav.prototype.addNav = function(name, url){
		var instance = this;
		if(this.curHis+1 > this.MAX_HIS){
			alert("最多收藏"+this.MAX_HIS+"个网站");
			this.hideAddDialog();
			return;
		}
		$("#addSiteDialog .confirm").attr('disabled','disabled');
		//请求添加
		$.requestJson("addfavsite.htm", function(data){
			$("#addSiteDialog .confirm").removeAttr("disabled");
			if(!data || data.code != '0'){
				alert("当前访问用户太多了，没能成功保存:)");
				instance.hideAddDialog();
				return;
			}
			var _li = $("<li id='nav_"+data.siteId+"' class='item'></li>");
			var _a1 = $("<a class='cont' href='"+haoqq.util.getUrl(url)+"' _stag='dhv1.mynav.favsite'></a>");
			var _img = $("<img height='16' width='16'/>");
			setIconUrl(haoqq.util.getUrl(url), _img);
			var _em = $("<em>"+name+"</em>");
			var _a2 = $("<a _id='"+data.siteId+"' class='closedSelect-icon delMynav' href='#' _stag='dhv1.mynav.del.cer'></a>");
			$("#myNavDov ul.madeList").prepend(_li);
			_li.append(_a1).append(_a2);
			_a1.append(_img).append(_em);
			$("#myNavDov .nodata").hide();
			$("#myNavDov .nologin").hide();
			$("#myNavDov .hasdata").show();
			//加载图片
			haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			instance.curHis++;
			instance.hideAddDialog();
			//重新绑定
			instance.unbindDelEvent();
			instance.bindDelEvent();
		}, {
			'sitename' : name,
			'siteurl' : url,
			'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid"))
		}, 'post');
	};
	
	MyNav.prototype.delNav = function(id){
		var instance = this;
		$.requestJson("delfavsite.htm", function(data){
			if(!data || data.code != '0'){
				alert("当前访问用户太多了，没能成功删除:)");
				return;
			}
			$("#myNavDov ul.madeList").find("#nav_"+id).remove();
			if(data.size <= 0){
				return;
			}
			if(--instance.curHis == 0){
				$("#myNavDov .hasdata").hide();
				$("#myNavDov .nologin").hide();
				$("#myNavDov .nodata").show();
				$("#myNavDov .controlBtn").find(".finish").hide();
				$("#myNavDov .hasdata").find(".add").show();
				$("#myNavDov .controlBtn").find(".cancel").show();
				//加载图片
				haoqq.imgloadtrigger.getTriggerInstance().loadImg();
			}
			//重新绑定
			instance.unbindDelEvent();
			instance.bindDelEvent();
		}, {
			'siteId' : id,
			'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid"))
		}, 'post');
	};
	
	MyNav.prototype.bindDelEvent = function(){
		var instance = this;
		$("#myNavDov ul.madeList").find(".delMynav").bind('click', function(e){
			e.preventDefault();
			instance.delNav($(this).attr("_id"));
		});
	};
	
	MyNav.prototype.unbindDelEvent = function(){
		$("#myNavDov ul.madeList").find(".delMynav").unbind('click');
	};
	
	MyNav.prototype.clearAddDialogError = function(){
		var siteNameInput = $("#addSiteDialog input:eq(0)");
		var siteUrlInput = $("#addSiteDialog input:eq(1)");
		siteUrlInput.parent("li").removeClass().addClass("normal");
		siteUrlInput.next("span").text("");
		siteNameInput.parent("li").removeClass().addClass("normal");
		siteNameInput.next("span").text("");
	};
	
	MyNav.prototype.showAddDialog = function(){
		this.clearAddDialogError();
		$("#addSiteDialog .leftSite").text(this.MAX_HIS-this.curHis);
		$("#addSiteDialog").css("top", (document.documentElement.clientHeight - $("#addSiteDialog").height()) / 2 + "px");
		$("#addSiteDialog").css("left", (document.documentElement.clientWidth - $("#addSiteDialog").width()) / 2 + "px");
		$("#addSiteDialog").show();
		this.mask.show();
	};
	
	MyNav.prototype.hideAddDialog = function(){
		var siteNameInput = $("#addSiteDialog input:eq(0)");
		var siteUrlInput = $("#addSiteDialog input:eq(1)");
		$("#addSiteDialog").hide();
		this.mask.hide();
		siteNameInput.val("");
		siteUrlInput.val("");
	};
	
	namespace.getMyNavInstance = haoqq.common.Singleton(function(){
		return new MyNav();
	});
	
	namespace.createMyNav = function(){
		return new MyNav();
	};
	
}(haoqq.namespace('mz')));