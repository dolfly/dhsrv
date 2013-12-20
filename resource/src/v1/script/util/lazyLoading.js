/**
 * 懒加载触发器：
 * 如果遇到异步下载的图片，需要调用多次lazyload，各自lazyload里只包含自己的图片列表，不好统一触发每个
 * lazyload里面的图片全部同时更新，因此增加一个监听器，将每个lazyload里面的update注册到监听器中，
 * 通过调用监听器适时触发所有图片的加载。
 * @author ronizhang
 */
(function(namespace){
	
	var Trigger = function(){
		
		Trigger.prototype.loadImg = function(){
			this.trigger('loadImg');
		};
	};
	
	namespace.getTriggerInstance = haoqq.common.Singleton(function(){
		//继承监听器
		return haoqq.common.Event.extendEvent(new Trigger());
	});
	
	namespace.createTrigger = function(){
		return haoqq.common.Event.extendEvent(new Trigger());
	};

})(haoqq.namespace('imgloadtrigger'));
/**
 * 懒加载
 * @author ronizhang
 * 2013.04.10兼容性调整：ie8以下不允许图片特效
 */
(function($, window, document, undefined) {
    var $window = $(window);
    
    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            reload          : false //ronzhang添加：是否是重加载
        };

        function update() {
            var counter = 0;
			//对于每一个图片
            elements.each(function() {
                var $this = $(this);
				//跳过设置为不可见的图片
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {//图片在可视区域上或者左边（已经加载过）
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {//在可视区域内则加载图片
                        $this.trigger("appear");
                        /* 如果找到一个需要加载的图片，则重置计数器 */
                        counter = 0;
                } else {
				/*图片在可视区域下或者右边（找到不在可视区域的limit张图片后停止搜索）：
					ronizhang注：为减少搜索次数，此处的原理是默认网页图片加载的顺序和在html中的顺序一致（流式布局），如果找到第一个图片不在可视区域内，
					则认为后面的图片都不在可视区域内了，停止搜索。如果页面布局比较特殊，那么可以把这个值设大一些，可以往后继续多搜索limit张
					图片，如果这limit张图片中找到需要一张加载的图片，counter重置为0，继续往后搜索。
				*/
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }
            $.extend(settings, options);
            //ronizhang增加: 检查是否ie6或者ie7，不允许特效显示
            var bInfo = $.getBrowserInfo();
            if ((bInfo['brower'] == 'msie' && bInfo['ver'] < 8.0)) {
            	settings.effect = "show";
            }
        }

        /* 缓存容器 */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function(event) {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
					//定义了appear函数则先调用appear函数
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                        	
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* 已经加载的图片移除 */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);
							//定义了load函数则调用
                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });
        
        $window.bind("nowload", function(event) {
            update();
        });
        
        //将更新方法添加到监听器中
        var imgTrigger = haoqq.imgloadtrigger.getTriggerInstance();
        imgTrigger.addListener('loadImg', update);
              
        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(window).load(function() {
            update();
        });
        
        if(settings.reload){
        	update();
        }
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);