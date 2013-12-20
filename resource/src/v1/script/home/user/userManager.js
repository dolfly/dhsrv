/**
 * 用户管理
 * @author ronizhang
 */
(function(namespace) {

	var UserManager = function(){
		
	};
	
	UserManager.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	UserManager.prototype.init = function(){
		this.cache = haoqq.util.getCacheInstance();
		this.hasLogin = false;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	UserManager.prototype.initEvent = function(){
		
	};
	/**
	 * do something
	 * @override
	 */
	UserManager.prototype.run = function(){
		this.checkLogin();
	};
	
	/**
	 * 登录
	 */
	UserManager.prototype.login = function(){
		var instance = this;
		var ptl = new haoqq.Ptlogin2();
		var mask = new haoqq.PageMask();
		mask.show();
		ptl.open(function(){
			//关闭
			mask.hide();
			instance.checkLogin();
			instance.trigger('login');
		});
	};
	/**
	 * 登出
	 */
	UserManager.prototype.logout = function(){
		var info = ["uin", "skey", "luin", "lskey", "__nick", "__face"];
        for (var i = 0; i < info.length; ++i) {
        	g_cookie.del(info[i], 'qq.com', '/');
        }
        this.checkLogin();
        this.trigger('logout');
	};
	
	UserManager.prototype.checkLogin = function(){
		var uin = g_cookie.get('uin');
		var skey = g_cookie.get('skey');
		var luin = g_cookie.get('luin');
		var lskey = g_cookie.get('lskey');
//		if(!(uin && skey || luin && lskey)){
//			this.hasLogin = false;
//		}else{
//			this.hasLogin = true;
//		}
		if(!skey){
			this.hasLogin = false;
		}else{
			this.hasLogin = true;
		}
		this.cache.set('uin', uin);
		this.cache.set('skey', skey);
		this.cache.set('luin', luin);
		this.cache.set('lskey', lskey);
	};
	
	UserManager.prototype.hasLoged = function(){
		return this.hasLogin;
	}
	
	namespace.getUserManagerInstance = haoqq.common.Singleton(function(id){
		return haoqq.common.Event.extendEvent(new UserManager());
	});
	
	namespace.createUserManager = function(){
		return haoqq.common.Event.extendEvent(new UserManager());
	};
    
} (haoqq.namespace('user')));