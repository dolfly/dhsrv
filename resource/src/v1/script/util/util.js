/**
 * @name haoqq.util
 * @namespace
 * @exports namespace as haoqq.util
 */
(function(namespace) {

	namespace.filterFuckWord = function(str){
		if(!(typeof str=='string')){
			 return str;
		}
		var fuckwords=[{
			'echar':/</g,
			'ochar':'&lt;'
		},{
			'echar':/>/g,
			'ochar':'&gt;'
		},{
			'echar':/"/g,
			'ochar':'&quot;'
		},{
			'echar':/(^\s*)|(\s*$)/g,
			'ochar':''
		},{
			'echar':/'/g,
			'ochar':'&acute;'
		}
		];
		 if(str){
		 	  var  index=0;
		 	  for(index=0;index<fuckwords.length;index++){
		 	  	     var echar=fuckwords[index].echar;
		 	  	     str=str.replace(echar,fuckwords[index].ochar)
		 	  }
		 }
		 return str;
	};
	/**
	 * 获取字符长度
	 */
	namespace.len = function len(s){
		var l = 0; 
		var a = s.split(""); 
		for (var i=0;i<a.length;i++) { 
			if (a[i].charCodeAt(0)<299) { 
				l++; 
			} else { 
				l+=2; 
			} 
		} 
		return l; 
	}
	/**
	 * 获取标准格式的url
	 */
	namespace.getUrl = function(url) {
        if (!/^(http|https|ftp):\/\//.test(url)) {
            //用户若没以协议开头，则补上http://
        url = 'http://' + url;
        }
        return url;
    };
    
    /**
	 * 获取标准格式的url
	 */
	namespace.getFavIcon = function(url) {
		return url.replace(/(.+?:\/\/.+?\/).*$/g, '$1') + "/favicon.ico";
    };
    
	/**
	* 判断ans元素是否sub的祖先元素
	* @function
	* @param ans 祖先元素
	* @param sub 子元素
	* @returns {boolean} 
	*/
	namespace.isAncestor = function(ans, sub) {
	   if (!sub || ! ans) return false;
	   while (sub && sub !== ans) {
	         sub = sub.parentNode;
	   }
	   return sub === ans;
	}; 
	    
	
	/**
	 * 获取url参数
	 */
	namespace.readGet = function() {
		var uriStr = window.location.href.replace(/&amp;/g, '&').replace(/\#.*$/, '');
		var _GET = {};
		var paraArr, paraSplit;
		if (uriStr.indexOf('?') > - 1) {
			uriArr = uriStr.split('?');
			paraStr = uriArr[1];
		}
		else {
			return _GET;
		}
		if (paraStr.indexOf('&') > - 1) {
			paraArr = paraStr.split('&');
		}
		else {
			paraArr = new Array(paraStr);
		}
		for (var i = 0; i < paraArr.length; i++) {
			try {
				paraArr[i] = paraArr[i].indexOf('=') > - 1 ? paraArr[i] : paraArr[i] + '=';
				paraSplit = paraArr[i].split('=');
				_GET[paraSplit[0]] = decodeURIComponent(paraSplit[1].replace(/\+/g, ' '));
			}
			catch(e) {
				//may have malform url error
			}
		}
		return _GET;
	};

    namespace.getBrowser = function(){
        if(typeof window['_bro_v'] != 'undefined'){ return window['_bro_v']; }
        var bro;
        var ua = navigator.userAgent.toLowerCase();
        if (window.ActiveXObject)
            bro = 'msie '+ua.match(/msie (\d+)/)[1];
        else if (window.opera)
            bro = 'opera '+(typeof window.opera.version=='function' ? window.opera.version().match(/\d+/)[0] : ua.match(/opera.(\d+)/)[1]);
        if(!bro){
            bro = (ua.match(/firefox\/([\d]+)/)) ? 'firefox '+RegExp.$1 :
                (ua.match(/chrome\/(\d+)/)) ? 'chrome '+ RegExp.$1 :
                (ua.match(/version\/(\d+).*safari/)) ? 'safari '+ RegExp.$1 : null;
        }
        window['_bro_v'] = bro;
        return bro;
    }
    
    namespace.convertDate = function(date){
		var _array = date.split('-');
		var _month = _array[1].indexOf('0') == 0? _array[1].substring(1) : _array[1];
		var _day = _array[2].indexOf('0') == 0? _array[2].substring(1) : _array[2];
		return _month+"月"+_day+"日";
	}
    
    namespace.getUiid = function(){
//    	var str_rev = this.getRunNum(2);
    	//var str_suid = (new Date()).valueOf().toString(36) + "_" + this.random().toString(36) + this.random().toString(36) + str_rev.toString(36);
    	var f = new Date().getUTCMilliseconds();
    	var s = (Math.round(Math.random()*2147483647)*f)%10000000000;
    	var str_suid = (new Date()).valueOf().toString().substr(5) + s;
    	return str_suid;
    };

    namespace.getACSRFToken=function(skey){
    	if(!skey){
    		return "";
    	}
    	var hash = 8618;   
        for(var i = 0, len = skey.length; i < len; ++i){   
            hash += (hash << 5) + skey.charAt(i).charCodeAt();   
        }   
        return hash & 0x7fffffff; 
    };
    
    namespace.paramsLocation=function(params){
    	var url= window.location.href;
    	var p={};
    	if(params){
    		if(url.indexOf("?") > 0){
    			 var _u=url.substring(url.indexOf("?")+1,url.length);
    			 var ary=_u.split("&");
    			 for(var i=0;i<ary.length;i++){
    				if(ary[i]&&(ary[i]).length>1){
    					 var _p=ary[i].split('=');
        				 if(!params[_p[0]]){
        					   p[_p[0]]=_p[1];
        				 }
    				}
    			 }
    			 p=$.extend(p,params);
    			 url=url.substring(0,url.indexOf("?")+1);
    			 var index=0;
     			for(var key in p){
     				if(index==0){
     					url=url+key+"="+p[key];
     				}else{
     					url=url+"&"+key+"="+p[key];
     				}
     				index++;
     			}
    		}else{
    			p=$.extend(p,params);
    			url=url+"?"
    			var index=0;
    			for(var key in p){
    				if(index==0){
    					url=url+key+"="+p[key];
    				}else{
    					url=url+"&"+key+"="+p[key];
    				}
    				index++;
    			}
    		}
    	}
    	return url;
    }
} (haoqq.namespace('util')));