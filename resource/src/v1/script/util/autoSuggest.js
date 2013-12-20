/**
 * 搜索建议
 * @author ronizhang
 * 参数还可以定义：
 * parse：解析json数据为此控件指定的格式的函数
 * postParam：自定义的查询post参数
 * 有一些搜索专用的项，jsonp部分不太通用
 */
(function($) {
$.fn.extend({
	autocomplete: function(options) {
		var isUrl = true;
		options = $.extend({}, $.Autocompleter.defaults, {
			url: options.dataUrl||null,
			data: options.data||null,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			//max: options && !options.scroll ? 10 : 150
			//搜索专用
//			getCurChannel : options.getCurChannel || $.noop,//获取当前频道
//			getCurEngin : options.getCurEngin || $.noop,//获取当前引擎
//			getSmartInfo : options.getSmartInfo || $.noop,//获取url，jsonp信息等
//			getSmartDataParser : options.getSmartDataParser || $.noop,//返回数据解析器
//			getSmartPostParam : options.getSmartPostParam || $.noop//获取post的数据
			enginModel : options.enginModel,
			enginController : options.enginController
		}, options);
		options.highlight = options.highlight || function(value) { return value; };
		options.formatMatch = options.formatMatch || options.formatItem;
		
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {
	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
	var timeout;
	var previousValue = "";
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	var blockSubmit;
	//ronizhang:jquery从1.9开始不再支持$.browser.opera等方法,替换为/opera/.test(navigator.userAgent.toLowerCase())
	/opera/.test(navigator.userAgent.toLowerCase()) && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	//ronizhang:jquery从1.9开始不再支持$.browser.opera等方法,替换为/opera/.test(navigator.userAgent.toLowerCase())
	$input.bind((/opera/.test(navigator.userAgent.toLowerCase()) ? "keypress" : "keydown") + ".autocomplete", function(event) {
		hasFocus = 1;
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	}).bind("input", function() {  //ronizhang：针对firefox中文输入bug的处理
        if ( hasFocus++ > 1 ) {//&& !select.visible() ) {
			onChange(0, true);
		}
    });
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected ){
			return false;
		}
		var v = selected.name;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		if(options.callback){
			options.callback(selected.name,selected.value);
		}
		return true;
	}
	/**
	 * 
	 */
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( skipPrevCheck && currentValue == previousValue )
			return;
		previousValue = currentValue;
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
			options.callback('','');
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	function autoFill(q, sValue){
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			$input.search(
				function (result){
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase){
			term = term.toLowerCase();
		}
		var data = {};
	    if( (typeof options.url == "string") && (options.url.length > 0) ){
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			/*ronizhang:请求处理*/
			if(options.forSearch === true){ //如果是搜索用，特殊处理
				//获取post的数据
//				var _chanel = options.getCurChannel()();
//				var _engin = options.getCurEngin()();
//				var _qInfo = options.getSmartInfo(_chanel, _engin);
				var _chanel = options.enginController.getCurChannel();
				var _engin = options.enginController.getCurEngin();
				var _qInfo = options.enginModel.getSmartInfo(_chanel, _engin);
				if(_qInfo.type == 'jsonp'){//是jsonp请求
					$.requestJsonp(_qInfo.smartUrl, _qInfo.jsonpName, function(data){
						var parsed = options.enginModel.getSmartDataHandler && options.enginModel.getSmartDataHandler(data, _chanel, _engin) || parse(data);
						if(parsed.length == 0){
	           	    	  options.callback("","-1");
						}
						success(term, parsed);
					}, options.enginModel.getSmartPostParam(lastWord(term), _chanel, _engin), options.postType, $.noop, _qInfo.jpCallbackName);
				}
				else if(_qInfo.type == 'json'){
					$.requestJson(_qInfo.smartUrl, function(data){
	             	    var parsed = options.enginModel.getSmartDataHandler && options.enginModel.getSmartDataHandler(data, _chanel, _engin) || parse(data);
	             	    if(parsed.length==0){
	             	    	  options.callback("", "-1");
	             	    }
	             	    success(term, parsed);
					}, options.enginModel.getSmartPostParam(lastWord(term), _chanel, _engin), options.postType);
				}
			}
			else{
				if(options.jsonp){
					$.requestJsonp(options.url, options.jsonpName, function(data){
						var parsed = options.parse && options.parse(data) || parse(data);
						if(parsed.length == 0){
	           	    	  options.callback("","-1");
						}
						success(term, parsed);
					}, {
						w: lastWord(term),//TODO 不太通用的地方，为搜索专门指定名字为w
						limit: options.max 
					},options.postType);
				}
				else{
					$.requestJson(options.url,function(data){
	             	    var parsed = options.parse && options.parse(data) || parse(data);
	             	    if(parsed.length==0){
	             	    	  options.callback("","-1");
	             	    }
	             	    success(term, parsed);
					},{
						autoword: lastWord(term),
						limit: options.max
					},options.postType);
				}
			}	
		} else {
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		var rows=data.datalist;
		for (var i=0; i <rows .length; i++) {
			var row = rows[i];
			if (row) {
				parsed[parsed.length] = {
					name: row.name,
					value: row.value,
				    result: options.formatResult && options.formatResult(row, row[0]) || row.value
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	callback:function(name,value){},
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180,
    jsonp: false,//ronizhang：添加以支持jsonp
    jsonpName: "callback",
    forSearch : false,//是否用于搜索提示，
    postType : 'POST'
};
$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		if(!element)
			return [];
		return element;
	}
	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		for (var i=0; i < data.length; i++) {
			if (!data[i]){
				 continue;
			}
			var li = $("<li/>").html( options.highlight((data[i]).name, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : ($(input).width()+4),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
              //ronizhang:jquery从1.9开始不再支持$.browser.msie等方法,替换为/msie/.test(navigator.userAgent.toLowerCase())
                if(/msie/.test(navigator.userAgent.toLowerCase()) && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);