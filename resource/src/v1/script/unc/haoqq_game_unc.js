/**
 *
 * User: liubangchen
 * Date: 13-4-27
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */
(function ($) {

    /**
     * 提取请求参数
     * @type {Object}
     */
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
    /**
     * 洛克王国提示框
     */
    var luokewangguoBar=function(){
        this.unc=['u500874_s1_g5','u500874_s1_g6'];
    }

    luokewangguoBar.prototype={
        run:function(){
            if(!this.canShow()){
                return ;
            }
            this.init();
        },
        init:function(){
            var divcss={
                'border':'1px solid #79BBFF',
                'width':988,
                'overflow':'hidden',
                'height':429,
                'margin':'10px auto 0'
            };
            var imgcss={
               'width':988,
               'height':429
            };
            var link='http://scdown.qq.com/download/CoolGame/CoolGameSetup.exe';
            var imgmap=$("<map name='lkwg_imgmap' id='lkwg_imgmap'><area shape='rect' coords='600,122,818,187'stype='cursor: pointer' target='_blank' href ='"+link+"'/></map>");
            var div=$("<div></div>");
            var image=$("<img src=\"http://3gimg.qq.com/haoqq/bimg/lkwg.png\" usemap='#lkwg_imgmap'/>");
            image.css(imgcss).appendTo(div);
            imgmap.appendTo(div);
            div.css(divcss);
            $(".content").find(".pushbox").before(div);
        },
        canShow:function(){
            var lunc=haoqqtools.getParamValue("unc");
            for(var i=0;i<this.unc.length;i++){
                if(this.unc[i]==lunc){
                    return true;
                }
            }
            return false;
        }
    }
    $(document).ready(function () {
        var bar=new luokewangguoBar();
        bar.run();
    })
})(jQuery);