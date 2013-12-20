/**
 *
 * User: liubangchen
 * Date: 13-4-27
 * Time: ����3:19
 * To change this template use File | Settings | File Templates.
 */
(function ($) {
    /**
     * ��ʾ��
     * @return {Object}
     */
    var infobar = function (options) {
        var id="haoqq_unc_m_div";
        return {
            getBarClass:function () {
                return {
                    'background-color':'#FEFDE8',
                    'color':'#D08708',
                    'font-size':'14px',
                    'font-weight':'bold',
                    'height':'33px',
                    'left':'0',
                    'line-height':'33px',
                    'position':'relative',
                    'text-align':'center',
                    'top':'0',
                    'width':'100%',
                    'min-width': '990px',
                    'z-index':'1000'
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
                return {
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
                _close.css(this.getCloseClass()).mouseover(function () {
                    $(this).css({
                        'background':'url("http://3gimg.qq.com/haoqq/v01/img/sprite-structure.png") no-repeat scroll 0px -346px transparent'
                    });
                }).mouseout(function () {
                        $(this).css({
                            'background':'url("http://3gimg.qq.com/haoqq/v01/img/sprite-structure.png") no-repeat scroll -24px -346px transparent'
                        });
                    }).click(function () {
                        $this.close();
                    });
                p.appendTo(div);
                _close.appendTo(div);
                return div;
            },
            show:function () {
                if ($("#" + id).length > 0) {
                    return;
                }
                $("body").find("div:eq(0)").before(this.init());
//                setTimeout(this.close,10000);
            },
            close:function () {
                var div = $("#" +id);
                if (div.length > 0) {
                    div.fadeOut(1000, function () {
                        $(this).remove();
                    });
                }
            }
        }
    }

    var haoqqtools = {
        getUrlParams:function () {
            var search = window.location.search;
            // д�������ֵ�
            var tmparray = search.substr(1, search.length).split("&");
            var paramsArray = new Array;
            if (tmparray != null) {
                for (var i = 0; i < tmparray.length; i++) {
                    var reg = /[=|^==]/;    // ��=���в�֣���������==
                    var set1 = tmparray[i].replace(reg, '&');
                    var tmpStr2 = set1.split('&');
                    var array = new Array;
                    array[tmpStr2[0]] = tmpStr2[1];
                    paramsArray.push(array);
                }
            }
            // ������������з���
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
        },
        filterFuckWord:function(str){
        	if(!(typeof str=='string')){
   			 return str;
        	}
        if(!str){
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
        }
    }
    $(document).ready(function () {
        var tbh_unc="u500874_s1_g2";
        var lunc=haoqqtools.getParamValue("unc");
       if(tbh_unc==lunc){
           var options={
        		   'html':"�������<span style=\"color: #FF0000;\">����</span>�޷����ʣ��볢��Ϊ���ṩ����ַ�����������������������."
           }
           var errsite=haoqqtools.getParamValue("errsite");
           errsite=haoqqtools.filterFuckWord(errsite);
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
        		   'html':"�������<a href='"+errsite+"' style=\"vertical-align: middle;overflow: hidden;color: #FF0000;max-width:300px;text-overflow:ellipsis;white-space: nowrap;display:inline-block;*display:inline;*zoom:1\">"+errsite+"</a>�޷����ʣ��볢��Ϊ���ṩ����ַ�����������������������."
        	   });
           }
           var bar = new infobar(options);
           bar.show();
       }
       if(window.updateTencentArea){
    	   var myUpdateTencentArea=window.updateTencentArea;
    	   window.updateTencentArea=function(json){
    		    myUpdateTencentArea(json);
    		    $("#specialservice").find("a[href='http://17roco.qq.com/']").addClass('red');
    	   }
       }
    })
})(jQuery);