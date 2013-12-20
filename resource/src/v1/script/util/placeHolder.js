/**
 * 使得各个浏览器均兼容html5的 PlaceHolder 解决方案
 * @author ronizhang
 */
(function(namespace) {

    var PlaceHolder = {
    	/**
    	 * 检测是否支持h5的placeholder
    	 */
        _support: (function() {
        	return 'placeholder' in document.createElement('input');
        })(),
        /**
         * 为页面所有的input创建必要的placeholder
         * @param className holder的样式名
         */
        init : function(className){
        	if (!PlaceHolder._support) {
                var inputs = $("input");
                PlaceHolder.create(inputs, className);
            }
        },
        /**
         * 为一个输入框创建placeholder
         * @param className holder的样式名
         */
        create: function(inputs, className) {
            var input;
            var className = className || "placeholder";
            if (!inputs.length) {
                inputs = [inputs];
            }
     
            for (var i = 0; i < inputs.length; i++) {
                input = $(inputs[i]);
                if (!PlaceHolder._support && input.attr("placeholder")) {
                    PlaceHolder._setValue(input, className);
                    
                    input.focus(function(e){
                    	if ($(this).val() === $(this).attr("placeholder")) {
                          $(this).val("");
                          $(this).removeClass(className);
                    	}
                    });
     
                    input.blur(function(e){
                    	if ($(this).val() === '') {
                            PlaceHolder._setValue($(this), className);
                        }
                    });
                    
                }
            }
        },
     
        _setValue: function(input, className) {
        	if(input.attr("type") == "password"){
        		input.val("");
        	}
        	else{
        		input.val(input.attr("placeholder"));
        	}
            input.addClass(className);
        }
    };

    namespace.PlaceHolder = function() {
        return PlaceHolder;
    };

} (haoqq));