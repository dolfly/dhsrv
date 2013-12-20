/**
 * 搜索引擎的模型类
 * @author ronizhang
 */
(function(namespace) {
	
	var SearchEnginModel = function(){
		
	};
	
	SearchEnginModel.prototype = new haoqq.common.Template();
	
	SearchEnginModel.prototype.channelEunm = ['web', 'news', 'video', 'image', 'baike', 'music', 'map', 'wenwen', "gouwu", 'weibo'];
	//上报用
	SearchEnginModel.prototype.channelMap = {
			'web' : '1', 
			'news' : '2',
			'video' : '3', 
			'image' : '4', 
			'baike' : '5', 
			'music' : '6', 
			'map' : '7', 
			'wenwen' : '8', 
			"gouwu" : '9', 
			'weibo' : 'a'
	};
	SearchEnginModel.prototype.enginMap = {
			'soso' : '1', 
			'baidu' : '2',
			'google' : '3', 
			'etao' : '4', 
			'sina' : '5', 
			'soku' : '6', 
			'taobao' : '7', 
			'tmall' : '8', 
			"jd" : '9'
	};
	
//	SearchEnginModel.prototype.enginEunm = {
//			soso : "http://www.soso.com/",
//			baidu : "http://www.baidu.com/",
//			google : "http://www.google.com.hk/",
//			soku : "http://www.soku.com/",
//            etao:"http://www.etao.com/",
//            taobao:"http://www.taobao.com/",
//            tmall:"http://www.tmall.com/",
//            jd:"http://www.jd.com/",
//            sina:"http://s.weibo.com/"
//	};
	/**数据解析器**/
    var dataParserHandler={
        commonJson:function(data, channel, engin){
            var parsed = [];
            if (!data) {
                return parsed;
            }
            for (i = 0; i < data.length; i++) {
                if(i >= 10){
                    break;
                }
                parsed[parsed.length] = {
                    name: data[i],
                    value: i,
                    result: i
                }
            }
            return parsed;
        },
        mapDataJson:function(data, channel, engin){
            var parsed = [];
            if (!data) {
                return parsed;
            }
            var _data = data.detail;
            for (i = 0; i < _data.length; i++) {
                parsed[parsed.length] = {
                    name: _data[i].name,
                    value: i,
                    result: i
                }
            }
            return parsed;
        }
    };
	/**
     * 搜索引擎相关参数 
     */
	SearchEnginModel.prototype.configuration = {
		web: {
			enginEunm: ['soso', 'baidu', 'google'],
//			hasHotNews : true,
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'web',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://www.soso.com/q?",
				name : "搜搜",
                isdefault: true,
				logoClassNmae: 'soso'
			},
			baidu: {
				url: "http://www.baidu.com/s?",
				name : "百度",
				key: 'wd',
                logoClassNmae: 'baidu'
			},
			google: {
				url: "http://www.google.com.hk/search?",
				name : "谷歌",
				key: 'q',
                logoClassNmae: 'google'
			}
		},
		news: {
			enginEunm: ['soso', 'baidu', 'google'],
//			hasHotNews : true,
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'news',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://news.soso.com/n.q",
				name : "搜搜",
				isdefault: true,
                logoClassNmae: 'soso',
				params: {
					ty: 'c'
				}
			},
			baidu: {
				url: "http://news.baidu.com/ns?",
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu'
			},
			google: {
				url: "http://www.google.com.hk/search?",
				name : "谷歌",
				key: 'q',
				logoClassNmae: 'google',
				params: {
					tbm : 'nws',
					hl: 'zh-CN'
				}
			}
		},
		video: {
			enginEunm: ['soso', 'soku', 'baidu'],
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'video',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://video.soso.com/search/?",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso'
			},
			soku: {
				url: "http://www.soku.com/v?",
				name : "Soku",
				key: 'keyword',
				logoClassNmae: 'soku'
			},
			baidu: {
				url: "http://video.baidu.com/v?",
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu'
			}
		},
		image: {
			enginEunm: ['soso', 'baidu', 'google'],
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'image',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://image.soso.com/image.cgi?",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso',
				params: {
					sc: 'img'
				}
			},
			baidu: {
				url: 'http://image.baidu.com/i?',
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu',
				params: {
					tn: 'baiduimage'
				}
			},
			google: {
				url: "http://www.google.com.hk/search?",
				name : "谷歌",
				key: 'q',
				logoClassNmae: 'google',
				params: {
					tbm : 'isch',
					hl: 'zh-CN'
				}
			}
		},
		baike: {
			enginEunm: ['soso', 'baidu'],
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'baike',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://baike.soso.com/Search.e?",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso',
				key: 'sp'
			},
			baidu: {
				url: 'http://baike.baidu.com/search/word?',
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu'
			}
		},
		music: {
			enginEunm: ['soso', 'baidu'],
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'music',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://cgi.music.soso.com/fcgi-bin/m.q?",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso'
			},
			baidu: {
				url: 'http://music.baidu.com/search?',
				name : "百度",
				key: 'key',
				logoClassNmae: 'baidu'
			}
		},
		map: {
			enginEunm: ['soso', 'baidu', 'google'],
			smartUrl : "http://map.soso.com/",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					wd : word,
					output : 'jsonp',
					tp : '0',
//					c : '成都',//TODO
					qt : 'sg'
				};
			},
			dataParser : function(data, channel, engin){
                return dataParserHandler.mapDataJson(data, channel, engin);
			},
			soso: {
				url: "http://map.soso.com?",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso',
				params: {
					pid: 'haoqq.map'
				}
			},
			baidu: {
				url: 'http://map.baidu.com/m?',
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu'
			},
			google: {
				url: 'http://maps.google.com.hk/maps?',
				name : "谷歌",
				key: 'q',
				logoClassNmae: 'google'
			}
		},
		wenwen: {
			enginEunm: ['soso', 'baidu'],
			smartUrl : "smartBox.htm?",
			smartType : 'jsonp',
			jsonpName : 'cb',
			getPostData : function(word, channel, engin){
				return {
					st : 'wenwen',
					w : word
				};
			},
			dataParser : function(data, channel, engin){
				return dataParserHandler.commonJson(data, channel, engin);
			},
			soso: {
				url: "http://wenwen.soso.com/z/Search.e",
				name : "搜搜",
				isdefault: true,
				logoClassNmae: 'soso',
				params: {
					sp: function(key) {
						return 'S' + key;
					}
				}
			},
			baidu: {
				url: 'http://zhidao.baidu.com/search?',
				name : "百度",
				key: 'word',
				logoClassNmae: 'baidu'
			}
		},
        gouwu:{
            enginEunm: ['etao','taobao','tmall','jd'],
            smartUrl : "smartBox.htm?",
            smartType : 'jsonp',
            jsonpName : 'cb',
            getPostData : function(word, channel, engin){
                return {
                    st : 'shopping',
                    w : word
                };
            },
            dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
            },
            etao: {
                url: 'http://s.etao.com/search?',
                name : "一淘",
                isdefault:true,
                key: 'q',
                logoClassNmae: 'yt'
            },
            taobao: {
                url: 'http://s.taobao.com/search?',
                name : "淘宝",
                key: 'q',
                logoClassNmae: 'taobao'
            },
            tmall: {
                url: 'http://list.tmall.com/search_product.htm?',
                name : "天猫",
                key: 'q',
                logoClassNmae: 'tm',
                getQueryUrl:function(word){
                    return this.url+'q='+word;
                }
            },
            jd: {
                url: 'http://search.jd.com/Search?',
                name : "京东",
                key: 'keyword',
                logoClassNmae: 'jd',
                params:{
                    'enc':'utf-8'
                }
            }
        },
        weibo: {
            enginEunm: ['sina'],
            smartUrl : "smartBox.htm?",
            smartType : 'jsonp',
            jsonpName : 'cb',
            getPostData : function(word, channel, engin){
                return {
                    st : 'web',
                    w : word
                };
            },
            dataParser : function(data, channel, engin){
                return dataParserHandler.commonJson(data, channel, engin);
            },
            sina: {
                url: "http://s.weibo.com/weibo/",
                name : "新浪微博",
                isdefault: true,
                logoClassNmae: 'xlwb',
                getQueryUrl:function(word){
                    return this.url+word;
                }
            }
        }
	};

	/**
	 * 获取搜索提示的相关参数
	 */
	SearchEnginModel.prototype.getSmartInfo = function(channel, engin) {
		//获取url
		var smartUrl = this.configuration[channel].smartUrl;
		//是否jsonp
		var smartType = this.configuration[channel].smartType;
		//jsonp请求name
		var jsonpName = this.configuration[channel].jsonpName;
		//回调函数
		var jpCallbackName = this.configuration[channel].jpCallbackName;
		return {
			'smartUrl' : smartUrl,
			'type' : smartType,
			'jsonpName' : jsonpName,
			'jpCallbackName' : jpCallbackName
		};
    };
    
    SearchEnginModel.prototype.getSmartPostParam = function(word, channel, engin) {
    	return this.configuration[channel].getPostData(word, channel, engin);
    };
    /**
     * 返回数据处理器
     */
    SearchEnginModel.prototype.getSmartDataHandler = function(data, channel, engin) {
    	return this.configuration[channel].dataParser(data, channel, engin);
    };
	
    SearchEnginModel.prototype.setParam = function(key, value) {
        this.params[key] = encodeURIComponent(value);
        return this;
    };

    SearchEnginModel.prototype.getParam = function(key, value) {
        return this.params[key];
    };
    /**
     * 指定的渠道是否有该引擎
     * @param channel
     * @param engine
     */
    SearchEnginModel.prototype.hasEngin=function(channel,engine){
        var engins = this.configuration[channel].enginEunm;
        for(var k = 0; k < engins.length; k++){
            if(engins[k] === engine){
                return true;
            }
        }
        return false;
    }
    /**
     * 获取channel的默认引擎
     */
    SearchEnginModel.prototype.getDefaultEngin = function(channel){
    	var engins = this.configuration[channel].enginEunm;
        var chl=this.configuration[channel];
    	for(var k = 0; k < engins.length; k++){
            if(typeof chl[engins[k]].isdefault==='function'){
                if(engins[k] &&chl[engins[k]].isdefault() === true){
                    return engins[k];
                }
            }else{
                if(engins[k] &&chl[engins[k]].isdefault === true){
                    return engins[k];
                }
            }

    	}
    	return 'soso';
    };
    /**
     * 获取热点新闻链接
     */
//    SearchEnginModel.prototype.getHotNewsLink = function(channel){
//    	return "getHotWord.htm?t="+channel;
//    };
    /**
     * 是否有热点新闻
     */
//    SearchEnginModel.prototype.hasHotNews = function(channel){
//    	return this.configuration[channel].hasHotNews;
//    };
    /**
     * 获取搜索引擎对应的主页
     */
//    SearchEnginModel.prototype.getHomePageByEngin = function(engin){
//    	return this.enginEunm[engin];
//    };
    /**
     * 获取查询url
     */
    SearchEnginModel.prototype.getQueryUrl = function(keyword, channel, engin) {
    	if(!engin||engin=='undefined'){
            engin = 'soso';
        }
    	if(!channel||channel=='undefined'){
            channel = 'web';
        }

        var urlParams = {};
        
        var config = this.configuration[channel][engin];
        /**如果引擎有自己的产生URL函数**/
        if(config.getQueryUrl&&(typeof config.getQueryUrl==='function')){
            return config.getQueryUrl.call(config,keyword);
        }
        if (!config) {
            return '';
        }

        if(keyword == '' && channel =='wenwen' && engin == 'soso'){
            //wenwen搜索串为空时跳转有bug.无奈特殊处理
            return 'http://wenwen.soso.com';
        }

        for (var k in config.params) {
            if (typeof(config.params[k]) === 'function') {
                urlParams[k] = config.params[k](keyword);
            } else if (typeof(k) === 'string') {
                urlParams[k] = config.params[k];
            }
        }

        //透传的参数会覆盖默认的参数
        for (k in this.params) {
            urlParams[k] = this.params[k];
        }

        urlParams['ie'] = 'utf-8';
        if(urlParams[config.key || 'w']===undefined){
            urlParams[config.key || 'w'] = keyword;//ronizhang:不需要encodeURIComponent(keyword);
        }
        //构造url
        var url = config.url.indexOf('?') === -1 ? config.url + '?': config.url;
        return url + $.param(urlParams);
    };
	
	/**
	 * 初始化变量
	 * @override
	 */
	SearchEnginModel.prototype.init = function(){
		this.params = {};
	};
	/**
	 * 初始化事件
	 * @override
	 */
	SearchEnginModel.prototype.initEvent = function(){
	};
	/**
	 * do something
	 * @override
	 */
	SearchEnginModel.prototype.run = function(){
	};
	
	namespace.getEnginModelInstance = haoqq.common.Singleton(function(){
        return new SearchEnginModel();
	});
	
	namespace.createEnginModel = function(){
		return new SearchEnginModel();
	};
	
} (haoqq.namespace('search')));