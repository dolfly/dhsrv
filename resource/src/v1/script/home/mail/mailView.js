/**
 * 邮箱模块
 * @author ronizhang
 */
(function(namespace){
	
	var configuration = [{
		mail: "163",
		name: "@163.com",
		action: "https://reg.163.com/CheckUser.jsp",
		params: {
			url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15",
			username: "#{u}",
			password: "#{p}"
		}
	},
	{
		mail: "126",
		name: "@126.com",
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "126.com",
			username: "#{u}@126.com",
			password: "#{p}",
			url: "http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"
		}
	},
	{
		mail: "sina",
		name: "@sina.com",
		action: "https://login.sina.com.cn/sso/login.php",
		params: {
			username: "#{u}@sina.com",
			password: "#{p}",
            entry:'freemail',
            gateway:'0',
            encoding:'UTF-8',
            url:'http://mail.sina.com.cn/',
            returntype:'META'
		}
	},
	{
		mail: "yahoocomcn",
		name: "@yahoo.com.cn",
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "#{u}@yahoo.com.cn",
			passwd: "#{p}",
			domainss: "yahoo",
			".intl": "cn",
			".src": "ym"
		}
	},
	{
		mail: "yahoocn",
		name: "@yahoo.cn",
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "#{u}@yahoo.cn",
			passwd: "#{p}",
			domainss: "yahoocn",
			".intl": "cn",
			".done": "http://mail.cn.yahoo.com/inset.html"
		}
	},
	{
		mail: "sohu",
		name: "@sohu.com",
		action: "http://passport.sohu.com/login.jsp",
		params: {
			loginid: "#{u}@sohu.com",
			passwd: "#{p}",
			fl: "1",
			vr: "1|1",
			appid: "1000",
			ru: "http://login.mail.sohu.com/servlet/LoginServlet",
			ct: "1173080990",
			sg: "5082635c77272088ae7241ccdf7cf062"
		}
	},
	{
		mail: "yeah",
		name: "@yeah.net",
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "yeah.net",
			username: "#{u}@yeah.net",
			password: "#{p}",
			url: "http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"
		}
	},
	{
		mail: "139",
		name: "@139.com",
		action: "https://mail.10086.cn/Login/Login.ashx?clientid=5013",
		params: {
			UserName: "#{u}",
			Password: "#{p}",
			clientid: "5013"
		}
	},
	{
		mail: "tom",
		name: "@tom.com",
		action: "http://web.mail.tom.com/webmail/login/loginServicePost.action",
		params: {
			username: "#{u}@tom.com",
			password: "#{p}"
		}
	},
	{
		mail: "21cn",
		name: "@21cn.com",
		action: "http://passport.21cn.com/maillogin.jsp",
		params: {
			UserName: "#{u}@21cn.com",
			passwd: "#{p}",
			domainname: "21cn.com"
		}
	},
	{
		mail: "renren",
		name: "\u4eba\u4eba\u7f51",
		action: "http://passport.renren.com/PLogin.do",
		params: {
			email: "#{u}",
			password: "#{p}",
			origURL: "http://www.renren.com/Home.do",
			domain: "renren.com"
		}
	},
	{
		mail: "baidu",
		name: "\u767b\u5f55\u767e\u5ea6",
		action: "https://passport.baidu.com/?login",
		params: {
			u: "http://passport.baidu.com/center",
			username: "#{u}",
			password: "#{p}"
		}
	},
	{
		mail: "51",
		name: "51.com",
		action: "http://passport.51.com/login.5p",
		params: {
			passport_51_user: "#{u}",
			passport_51_password: "#{p}",
			gourl: "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"
		}
	},
	{
		name: "@qq.com",
		jump: true,
		action: "http://mail.qq.com"
	},
	{
		name: "@foxmail.com",
		jump: true,
		action: "http://mail.qq.com/cgi-bin/loginpage?t=fox_loginpage"
	},
	{
		name: "@gmail.com",
		jump: true,
		action: "http://gmail.com"
	},
	{
		name: "@hotmail.com",
		jump: true,
		action: "https://login.live.com"
	}];
	
	var reportMailParam = {
		'@163.com' : '1',
		'@126.com' : '2',
		'@sina.com' : '3',
		'@139.com' : '4',
		'@sohu.com' : '5',
		'@yeah.net' : '6',
		'@21cn.com' : '7',
		'@tom.com' : '8'
	};
	
	var Mail = function(){
		
	};
	
	Mail.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Mail.prototype.init = function(){
		this.selectView = new haoqq.SelectView($('#currentMail'), $('#mailSelectList'), undefined, undefined, function(){
	    	haoqq.getStatisInstance().reportClick(null, "dhv1.pac.area4.click1", {
	    		"type" : 'mail'
	    	});
	    	haoqq.getDjlStatisInstance().reportClick(null, "dhv1.pac.area4.click1");
		});
        this.emailStorageKey = 'emailSelect';//选择邮箱存储key
        this.userStorageKey = 'emailUserName';//用户名存储key
        this.cur_mail_params = null;//当前邮件post参数
        this.mailWrap = $("#module3");
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Mail.prototype.initEvent = function(){
		var instance = this;
		
		var lastOption = g_storge.get(this.emailStorageKey);
        if(lastOption){
            if(this.changeMail(lastOption)){//修改当前邮箱配置成功
                var lastUser = g_storge.get(this.userStorageKey);
                if(lastUser){
                    $("#mailUserName").val(lastUser);
                }
                //修改选择器
                this.selectView.setSelectIdx(this.selectView.getOptionIndex(lastOption));
            }
        }
        //邮箱选择事件
        this.selectView.onchange = function() {
            var option = instance.selectView.getOptions(instance.selectView.getSelectIdx());
            if (!instance.changeMail(option)) {
            	instance.selectView.setSelectIdx(-1);
            }else{
            	$("#emailPwd").val("");
//            	instance.showEmailView.call($this);
            }
            //上报
            var _stag = "dhv1.pac.area4.opt" + reportMailParam[option];
    		haoqq.getStatisInstance().reportClick(null, _stag, {
    			"type" : 'mail'
    		});
    		haoqq.getDjlStatisInstance().reportClick(null, _stag);
        }
		
        /**form处理**/
        var form = this.mailWrap.find("#emailForm").get(0);
        form.onsubmit = function(){
           return instance.submitForm();
        };
        /**hide**/
//        $(document).click(function(e){
//            var target= e.target;
//            if(!haoqq.util.isAncestor(instance.mailWrap.find(".mail-inputwrap").get(0), target)){
//            	instance.hide();
//            }
//        });
	};
	/**
	 * do something
	 * @override
	 */
	Mail.prototype.run = function(){
		
	};
	
	/**
	 * 配置当前邮箱
	 */
	Mail.prototype.configCurrentMail = function(conf){
		if (!conf) {
            return false;
        }
        //新开窗口登录
        if (conf.jump) {
            window.open(conf.action);
            //上报
//            new haoqq.Statis().mailReport(conf.name);
            return false;
        }
        var form = this.mailWrap.find("#emailForm");
        form.attr('action', conf.action);
        this.cur_mail_params = conf.params;
        return true;
	};
	
	/**
	 * 修改邮箱
	 */
	Mail.prototype.changeMail = function(option){
        for (var i = 0; i < configuration.length; ++i) {
            if ($.trim(configuration[i].name) == option) {
                return this.configCurrentMail(configuration[i]);
            }
        }
        return false;
	};
	
	/**
	 * 提交
	 */
	Mail.prototype.submitForm = function(){
		var emailIndex = this.selectView.getSelectIdx();
		var usernameInput = $("#mailUserName");
		var passwoedInput = $("#emailPwd");
        if(emailIndex == -1){
            alert("请选择邮箱");
            return false;
        }
        if($.trim(usernameInput.val())=='' || usernameInput.val() == usernameInput.attr("placeholder")){
            alert("请输入账号");
            return false;
        }
        if($.trim(passwoedInput.val())==''){
            alert("请输入密码");
            return false;
        }
        if (this.cur_mail_params) {
            var password = $.trim(passwoedInput.val());
            var username = $.trim(usernameInput.val());
            this.mailWrap.find("#mail-hidden-input").empty();
            for (var key in this.cur_mail_params) {
                if(this.cur_mail_params.hasOwnProperty(key)){
                    this.buildFormParams(key, this.cur_mail_params[key].replace('#{p}', password).replace('#{u}', username));
                }
            }
        }
        var email = this.selectView.getOptions(emailIndex);
        g_storge.set(this.emailStorageKey, email);
        g_storge.set(this.userStorageKey, $.trim(usernameInput.val()));
        //上报
        var _stag = "dhv1.pac.area4.login" + reportMailParam[email];
		haoqq.getStatisInstance().reportClick(null, _stag, {
			"type" : 'mail',
			"email" : email
		});
		haoqq.getDjlStatisInstance().reportClick(null, _stag);
        passwoedInput.val("");
        return true;
	};
	
	/**
	 * 构建参数
	 */
	Mail.prototype.buildFormParams = function(name, value){
		var area = this.mailWrap.find("#mail-hidden-input");
        var inputs = area.find("input[type=hidden]");
        inputs.each(function(obj){
             if(obj.name==name){
                 $(obj).val(value);
             }
        });
        var new_input = $("<input/>");
        new_input.attr({
        	type:'hidden',
        	name:name,
        	value:value
        }).appendTo(area);
	};
	
	
	Mail.prototype.toggleShow = function(){
		if($("#mailSelectList").is(":visible")){
			this.hide();
		}else{
			this.show();
		}
	};
	
	Mail.prototype.show = function(){
		$("#mailSelectList").show();
	};
	
	Mail.prototype.hide = function(){
		$("#mailSelectList").hide();
	};
	
	namespace.getMailInstance = haoqq.common.Singleton(function(){
		return new Mail();
	});
	
	namespace.createMail = function(){
		return new Mail();
	};
	
}(haoqq.namespace('module')));