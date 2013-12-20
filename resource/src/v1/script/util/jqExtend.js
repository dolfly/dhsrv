/**
 * @author liubangchen extend jquery
 */
$.extend({
    params:function(ele){
        var i=0;
        var data=[];
        if(ele){
            var k;
            for(k in ele){
                data[i]=k+"="+ele[k];
                i++;
            }
        }
        return data.join('&');
    },
	/**
	 * ajax请求json
	 */
	requestJson : function(url, callback, data, method, onerror) {
		if(data){
			for(var pro in data){
				  data[pro] = $.filterXssWord(data[pro]);
			}
		}
        data['csrfmiddlewaretoken'] = $.getCookie('csrftoken');
		$.ajax({
			url : url,
			type : 'post',//method || 'post',
			dataType : 'json',
			data : data,
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(json, status) {
				if(json==''||json==null||json==undefined){
					alert('返回数据格式错误');//TODO 后期可以考虑埋点统计！！！！！！！！！！！！！
					return;
				}
				callback(json);
			},
			error : function(xMLHttpRequest, msg, e) {
				//TODO 取代为onerror方法
				if(msg=='error'){
					if(e=='Not Found'){//404错误
						//TODO 404错误
					}
					if(xMLHttpRequest.status==500){//500错误
						//TODO 404错误
					}
					if(xMLHttpRequest.status==0){//500错误
						//TODO 404错误
					}else{
						alert(e);
					}
				}
				else{
//					alert("发生错误："+msg);
				}
			}
		});
	},
	/**
	 * ajax请求jsonp
	 */
	requestJsonp : function(url, jsonpName, callback, data, method, onerror, jsonpCallback) {
//		if(data){
//			for(var pro in data){
//				  data[pro] = $.filterXssWord(data[pro]);
//			}
//		}
        data['csrfmiddlewaretoken'] = $.getCookie('csrftoken');
		$.ajax({
			url : url,
			type : method || 'post',
			dataType : 'jsonp',
//			crossDomain : crossDomain || false ,
			data : data,
			jsonp: jsonpName || "callback",
			jsonpCallback : jsonpCallback,
//			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				callback(result);
			},
			error : function(xMLHttpRequest, msg, e) {
				//TODO 取代为onerror方法
				if(msg=='error'){
					if(e=='Not Found'){//404错误
						//TODO 404错误
					}
					if(xMLHttpRequest.status==500){//500错误
						//TODO 404错误
					}
					if(xMLHttpRequest.status==0){//500错误
						//TODO 404错误
					}else{
						alert(e);
					}
				}
				else{
//					alert("发生错误："+msg+" "+xMLHttpRequest.status + " " +e);
				}
			}
		});
	},
	/**
	 * ajax请求text
	 */
//	requestText : function(url, callback, data, method, onerror) {
//		if(data){
//			for(var pro in data){
//				  data[pro] = $.filterXssWord(data[pro]);
//			}
//		}
//   data['csrfmiddlewaretoken'] = $.getCookie('csrftoken');
//		$.ajax({
//			url : url,
//			type : method || 'post',
////			dataType : 'html',
//			data : data,
////			contentType : "text/html; charset=utf-8",
//			success : function(json, status) {
//				if(json==''||json==null||json==undefined){
//					alert('返回数据格式错误');//TODO 后期可以考虑埋点统计！！！！！！！！！！！！！
//					return;
//				}
//				callback(json);
//			},
//			error : function(xMLHttpRequest, msg, e) {
//				//TODO 取代为onerror方法
//				if(msg=='error'){
//					if(e=='Not Found'){//404错误
//						//TODO 404错误
//					}
//					if(xMLHttpRequest.status==500){//500错误
//						//TODO 404错误
//					}
//					if(xMLHttpRequest.status==0){//500错误
//						//TODO 404错误
//					}else{
//						alert(e);
//					}
//				}
//				else{
//					alert("发生错误："+msg);
//				}
//			}
//		});
//	},
	/**
	 * 过滤xss
	 */
	filterXssWord : function(str){
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
		 	  var index=0;
		 	  for(index=0;index<fuckwords.length;index++){
		 	  	   var echar=fuckwords[index].echar;
		 	  	   str=str.replace(echar,fuckwords[index].ochar)
		 	  }
		 }
		 return str;
	},
    getCookie:function(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
	stringToJson:function(str){
		return JSON.parse(str);
	},
	getDocumentSize:function(){
		var scrW, scrH; 
		if(window.innerHeight && window.scrollMaxY) 
		{    // Mozilla    
				scrW = window.innerWidth + window.scrollMaxX;    
				scrH = window.innerHeight + window.scrollMaxY; 
		} 
		else if(document.body && (document.body.scrollHeight > document.body.offsetHeight))
		{    // all but IE Mac    
				scrW = document.body.scrollWidth;    
				scrH = document.body.scrollHeight; 
		}
		else if(document.body) 
		{ // IE Mac    
					scrW = document.body.offsetWidth;    
					scrH = document.body.offsetHeight;
		} 
		var winW, winH; 
		if(window.innerHeight) 
		{ // all except IE    
			winW = window.innerWidth; 
			winH = window.innerHeight; 
		} else if (document.documentElement && document.documentElement.clientHeight)
		{    // IE 6 Strict Mode    
			winW = document.documentElement.clientWidth;     
			winH = document.documentElement.clientHeight; 
		} else if (document.body) { // other    
			winW = document.body.clientWidth;    
			winH = document.body.clientHeight; 
		}    // for small pages with total size less then the viewport 
			var pageW = (scrW<winW) ? winW : scrW; 
			var pageH = (scrH<winH) ? winH : scrH;    
		return {pageWidth:pageW, pageHeight:pageH, winWidth:winW, winHeight:winH};
	},
	/**
	 * 获取浏览器信息
	 */
	getBrowserInfo:function(){
		var ua = navigator.userAgent.toLowerCase(); 
    	var brower = (ua.match(/\b(chrome|opera|safari|msie|firefox)\b/) || ['', 'mozilla'])[1]; 
    	var r = '(?:' + brower + '|version)[\\/: ]([\\d.]+)'; 
    	var ver = (ua.match(new RegExp(r)) || [])[1]; 
    	return { 
    		'brower': brower, 
    		'ver': ver 
    	};
	},
	/**
	 * 在元素以及父节点上查找是否具有属性值
	 * 参数：dom结点，属性名，向上深度
	 */
	findAttr:function(dom, attr, deep){
		if (!dom || !attr) return null;
		if(!deep) deep = 1000;
		while(dom && $.trim(dom.attr(attr)) == "" && deep-- > 0){
			dom = dom.parent();
		}
		return $.trim(dom.attr(attr)) == ""? null : dom;
	}
		
});