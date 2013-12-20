/**
 * QQ登录视图
 * @author ronizhang
 * getUserProfile.htm
 */
(function(namespace){
	
	var QqView = function(){
		
	};
	
	QqView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	QqView.prototype.init = function(){
		this.userMrg = haoqq.user.getUserManagerInstance();
		this.userMrg.addListener("login", this.requestUserInfo);
		this.userMrg.addListener("logout", this.logout);
		//是否宽屏
		this.isWideScreen = window.screen.width > 1024 ? true : false;
		if(this.isWideScreen){
			this.rightSideArea = $("#wideScreenSide");
		}else{
			this.rightSideArea = $("#norScreenSide");
		}
		this.rightSideArea.show();
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	QqView.prototype.initEvent = function(){
		var instance = this;
		$("#loginOutArea a").click(function(e){
			e.preventDefault();
			instance.userMrg.login();
		});
		$("#loginedArea a.exit").click(function(e){
			e.preventDefault();
			instance.userMrg.logout();
		});	
	};
	/**
	 * do something
	 * @override
	 */
	QqView.prototype.run = function(){
		this.userMrg.start();
		if(this.userMrg.hasLoged()){
			this.requestUserInfo();
		}else{
			this.logout();
		}
	};
	
	/**
	 * 请求用户数据
	 */
	QqView.prototype.requestUserInfo = function(){
		var instance = this;
		$.requestJson('getUserProfile.htm',function(data){
			if(!data || data.code != '0'){
				return;
			}
			$("#loginedArea img").attr("src", data.qqlogon);
			$("#loginedArea a.user-name").text(data.qqnick);
			$("#loginOutArea").hide();
			$("#loginedArea").show();
			
			if(instance.isWideScreen){//宽屏
				var _qzone = instance.rightSideArea.find(".qzone");
				var _weibo = instance.rightSideArea.find(".weibo");
				var _qmail = instance.rightSideArea.find(".qmail");
				if(data.qzone != '0'){
					_qzone.find("span").text(data.qzone > 10 ? "10+" : data.qzone);
				}else{
					_qzone.find("span").text("");
				}
				if(data.qweibo != '0'){
					_weibo.find("span").text(data.qweibo > 10 ? '10+' : data.qweibo);
				}else{
					_weibo.find("span").text("");
				}
				if(data.qmail != '0'){
					_qmail.find("span").text(data.qmail > 10 ? "10+" : data.qmail);
				}else{
					_qmail.find("span").text("");
				}
				_qzone.show();
				_weibo.show();
				_qmail.show();
			}else{//普通屏
				var _qzone = instance.rightSideArea.find(".qzone");
				var _weibo = instance.rightSideArea.find(".weibo");
				var _qmail = instance.rightSideArea.find(".qmail");
				if(data.qzone != '0'){
					_qzone.find(".red-notice").show();
				}else{
					_qzone.find(".red-notice").hide();
				}
				if(data.qweibo != '0'){
					_weibo.find(".red-notice").show();
				}else{
					_weibo.find(".red-notice").hide();
				}
				if(data.qmail != '0'){
					_qmail.find(".red-notice").show();
				}else{
					_qmail.find(".red-notice").hide();
				}
				_qzone.show();
				_weibo.show();
				_qmail.show();
			}
        },{
        	'g_tk':haoqq.util.getACSRFToken(g_cookie.get("skey"))
        },'post');
	};
	/**
	 * 退出登录
	 */
	QqView.prototype.logout = function(){
		var instance = haoqq.user.getQqViewInstance();
		$("#loginedArea").hide();
		$("#loginOutArea").show();
		
		instance.rightSideArea.find(".qzone").hide();
		instance.rightSideArea.find(".weibo").hide();
		instance.rightSideArea.find(".qmail").hide();
	};
	
	namespace.getQqViewInstance = haoqq.common.Singleton(function(){
		return new QqView();
	});
	
	namespace.createQqView = function(){
		return new QqView();
	};
	
}(haoqq.namespace('user')));