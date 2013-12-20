/**
 *
 * User: liubangchen
 * Date: 13-4-27
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    /**
     * 提示框
     * @return {Object}
     */
    var infobar = function (options) {
        var id=options.id;
        var onClosed=options.onClosed||function(e){};
        var onClick=options.onClick||function(e){};
        var autoClose=options.autoClose||false;
        return {
            getBarClass:function () {
                return {
                    'background-color':'#FEFDE8',
                    'color':'#D08708',
                    'font-size':'14px',
                    'font-weight':'bold',
                    'height':'32px',
                    'left':'0',
                    'line-height':'33px',
                    'position':'relative',
                    'text-align':'center',
                    'top':'0',
                    'width':'100%',
                    'min-width': '990px',
                    'z-index':'1000',
                    'border-bottom':'1px solid #dbc090'
                }
            },
            getBarTextClass:function () {
                return {
                    'border':'0 none',
                    'font':'inherit ',
                    'margin':'0',
                    'outline':'0 none',
                    'padding':'0',
                    'vertical-align ':'baseline',
                    'color ':'#D08708'
                }
            },
            getCloseClass:function () {
                var css= {
                    'background':'url("http://3gimg.qq.com/haoqq/v01/img/sprite-structure.png") no-repeat scroll -24px -346px transparent',
                    'height':'21px',
                    'position':'relative',
                    'left':'50px',
                    'top':'6px',
                    'width':'21px',
                    'color':'#1C1C1C',
                    'text-decoration':'none',
                    'cursor':'pointer'
                }
                var isie6=navigator.userAgent.toLowerCase().indexOf("msie 6.0")>0;
                var isie7=navigator.userAgent.toLowerCase().indexOf("msie 7.0")>0;
                if(isie6||isie7){
                    css= $.extend(css,{
                       'top':'3px'
                    });
                }
                return css;
            },
            init:function () {
                var div = $("<div></div>");
                var $this = this;
                div.attr({
                    'id':id
                }).css(this.getBarClass());
                var p = $("<p style='display:inline-block;*display:inline;*zoom:1'></p>");
                p.css(this.getBarTextClass()).html(options.html || "");
                var _close = $("<a style='display:inline-block;*display:inline;*zoom:1'></a>");
                p.find("a:eq(0)").click(function(e){
                    onClick.call(this,e);
                });
                _close.css(this.getCloseClass()).mouseover(function () {
                    $(this).css({
                        'background':'url("http://3gimg.qq.com/haoqq/v01/img/sprite-structure.png") no-repeat scroll 0px -346px transparent'
                    });
                }).mouseout(function () {
                        $(this).css({
                            'background':'url("http://3gimg.qq.com/haoqq/v01/img/sprite-structure.png") no-repeat scroll -24px -346px transparent'
                        });
                    }).click(function (e) {
                        $this.close();
                        onClosed(e);
                    });
                p.appendTo(div);
                _close.appendTo(div);
                if(window.DD_belatedPNG){
                    DD_belatedPNG.fixPng(_close.get(0));
                }
                return div;
            },
            show:function () {
                if ($("#" + id).length > 0) {
                    return;
                }
                $("body").find("div:eq(0)").before(this.init());
                if(autoClose){
                    setTimeout(this.close,10000);
                }
            },
            close:function () {
                var div = $("#" +id);
                if (div.length > 0) {
                    div.fadeOut(1000, function () {
                        $(this).remove();
                    });
                }
                if(window.g_storge){
                    window.g_storge.set("haoqq_gray_to_old_tag","showed");
                }
            }
        }
    }

    var haoqqtools = {
        getUrlParams:function () {
            var search = window.location.search;
            // 写入数据字典
            var tmparray = search.substr(1, search.length).split("&");
            var paramsArray = new Array;
            if (tmparray != null) {
                for (var i = 0; i < tmparray.length; i++) {
                    var reg = /[=|^==]/;    // 用=进行拆分，但不包括==
                    var set1 = tmparray[i].replace(reg, '&');
                    var tmpStr2 = set1.split('&');
                    var array = new Array;
                    array[tmpStr2[0]] = tmpStr2[1];
                    paramsArray.push(array);
                }
            }
            // 将参数数组进行返回
            return paramsArray;
        },
        getParamValue:function (name) {
            var paramsArray = this.getUrlParams();
            if (paramsArray != null) {
                for (var i = 0; i < paramsArray.length; i++) {
                    for (var j in paramsArray[i]) {
                        if (j == name) {
                            return paramsArray[i][j];
                        }
                    }
                }
            }
            return null;
        }
    }
    $(document).ready(function () {
        var tbh_unc="u500874_s1_g2";
        var lunc=haoqqtools.getParamValue("unc");
       if(tbh_unc==lunc){
           var options={
        		   'id':'haoqq_unc_m_div',
                   autoClose:false,
        		   'html':"您输入的<span style=\"color: #f50606;\">域名</span>无法访问，请尝试为您提供的网址导航服务或者重新搜索访问."
           }
           var errsite=haoqqtools.getParamValue("errsite");
           errsite = haoqq.util.filterFuckWord(errsite);
           if(errsite){
               if(errsite.indexOf('http://')!=0){
                   errsite="http://"+errsite;
               }
        	   $("#soso_input").focus(function(){
        		   	if($(this).val()==''){
        		   		$(this).val(errsite);
        		   	}
        		   	$(this).unbind('focus');
        	   });
        	   options=$.extend(options,{
        		   'html':"您输入的<a href='"+errsite+"' style=\"vertical-align: middle;overflow: hidden;color: #f50606;max-width:300px;text-overflow:ellipsis;white-space: nowrap;display:inline-block;*display:inline;*zoom:1\">"+errsite+"</a>无法访问，请尝试为您提供的网址导航服务或者重新搜索访问."
        	   });
           }
           var bar = new infobar(options);
           bar.show();
       }
        var host = window.location.host;
        if(!window.g_storge){
            window.g_storge={
                get:function(k){},
                set:function(k,v){}
            }
        }

        if(host.toLowerCase()=='hao.qq.com'){
//        	if(haoqq.Statis){
//                /*统计初始化*/
//                var statis = new haoqq.Statis();
//                statis.init();
//            }
//            var ishow=window.g_storge.get("haoqq_gray_to_old_tag");
//            if(ishow){
//                return ;
//            }
//            var o={
//            	'id':'haoqq_back_m_div',
//                onClick:function(e){
//                    if(statis){
//                        statis.ancestorClick(e,"1.1.0.10",'http://www.hao.qq.com/',"");
//                    }
//                },
//                onClosed:function(e){
//                    if(statis){
//                        statis.ancestorClick(e,"1.1.0.11",'',"");
//                    }
//                },
//                autoClose:true,
//                'html':"QQ导航新版正式发布，若需回到旧版请点击<a href='http://www.hao.qq.com/' style='vertical-align: middle;overflow: hidden;color: #f50606;max-width:300px;text-overflow:ellipsis;white-space: nowrap;display:inline-block;*display:inline;*zoom:1'>此处</a>"
//            }
//            var bar1 = new infobar(o);
//            bar1.show();
        }
    })
})(jQuery);