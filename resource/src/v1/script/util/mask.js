/**
 * PageMask 类
 */
(function(namespace) {

    /**
    * @name PageMask
    * @class 蒙版
    * @exports PageMask as haoqq.PageMask
    */
    var pageMask = {
        div: null,
        /** 
         * 打开PageMask 
         * @function
         * @name PageMask#show
         */
        show: function() {
            if (this.div == null) {
                this.div = document.createElement('div');
                $(this.div).css({
                	'background-color': '#FFFFFF',
                	'position': 'absolute',
                	'opacity': '0.5',
                	'top': '0',
                	'z-index': '1000',
                	'display': 'none'
                });
                document.body.appendChild(this.div);
            }
            this.div.style['width'] = document.body.clientWidth + "px";
            this.div.style['height'] = document.body.clientHeight + "px";
            this.div.style["display"] = "block";
        },
        /** 
         * 隐藏PageMask 
         * @function
         * @name PageMask#hide
         */
        hide: function() {
            if (this.div) {
                this.div.style["display"] = "none";
            }
        }
    };

    namespace.PageMask = function() {
        return pageMask;
    };

} (haoqq));