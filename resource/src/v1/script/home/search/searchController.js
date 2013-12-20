/**
 * 搜索控制器
 * @author ronizhang
 */
(function(namespace) {
		
	var searchCtr = function(){
		
	};
	
	searchCtr.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	searchCtr.prototype.init = function(){
		var objInstance = this;
		this.form = $("#searchForm");//表单
		this.queryInput = $("#searchInput");//搜索框
		
		this.CHANNEL_STORAGE_KEY = 'searchChannel';
		
		/**
		 * 初始化引擎模型
		 */
		this.enginModel = new haoqq.search.getEnginModelInstance();
		this.enginModel.start();
		this.channels = this.enginModel.channelEunm;
		
		this.curChannel = this.channels[0];
		this.curEngin = g_storge.get(objInstance.CHANNEL_STORAGE_KEY + "_" + this.curChannel) || this.enginModel.getDefaultEngin(this.curChannel);
		this.form[0].action = this.enginModel.getQueryUrl('', this.curChannel, this.curEngin);//设置初始查询url
//		this.report = new haoqq.Statis();
		/**
		 * 初始化channel选择视图
		 */
		this.channelTab = new haoqq.tab.TabView({
			'container' : $("#search"),
			'currentClassName' : 'select',
			'tabChangeType' : 'click',
			'currentIndex' : 0,
			'isAllowClickCurTab' : false,
			'tabs' : $("#searchTab li"),
			'onMouseEnterTab' : function(index, e){
			},
			'onMouseLeaveTab' : function(index, e){
			},
			'beforeChangeTab' : function(index, e){
				var channel = objInstance.channels[index];
				var hisEngin = g_storge.get(objInstance.CHANNEL_STORAGE_KEY + "_" + channel);
				var tmp;
				/*有历史则用历史的，否则用默认的*/
				if(hisEngin && objInstance.enginModel.hasEngin(channel, hisEngin)){
					tmp = hisEngin;
				}else{
					tmp = objInstance.enginModel.getDefaultEngin(channel);
				}
				if(!tmp || !channel){
					return false;
				}
				/*修改搜索引擎视图*/
				objInstance.searchSelectView.changeView(channel, tmp);
				objInstance.curEngin = tmp;//设置当前引擎
				objInstance.curChannel = channel;//设置当前channel
				objInstance.queryInput.focus();
				return true;
			}
		});
		/**
		 * 初始化搜索引擎选择器
		 */
		this.searchSelectView = new haoqq.search.getSelectViewInstance();
		this.searchSelectView.start({
			'searchModel' : this.enginModel,
			'container' : $("#enginChange"),
			'onSelectChange' : function(e, engin){
				objInstance.curEngin = engin;
				//保存当前引擎
				g_storge.set(objInstance.CHANNEL_STORAGE_KEY + "_" + objInstance.curChannel, engin);
                objInstance.hideEngineList();// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //上报
                var _stag = "dhv1.so.change." + objInstance.enginModel.enginMap[engin] + objInstance.enginModel.channelMap[objInstance.curChannel];
				haoqq.getStatisInstance().reportClick(e, _stag, {
					'type' : 'search'
				});
				haoqq.getDjlStatisInstance().reportClick(e, _stag);
			}
		});
		
		this.searchWay = {
			'input_c' : 'input',
			'input_e' : 'input',
			'smart' : 'smart',
			'hotword' : 'hotword'
		};
		this.searchType = {
			'input_c' : '1',
			'input_e' : '2',
			'smart' : '1',
			'hotword' : ''
		};
	};
	/**
	 * 初始化事件
	 * @override
	 */
	searchCtr.prototype.initEvent = function(){
		var objInstance = this;
		//搜索提示
		objInstance.queryInput.autocomplete({
			dataUrl:'donothing',
			width: 564,
			max:10,
			forSearch:true,
			selectFirst:false,
			postType:'post',//原来是GET
			scrollHeight : 330,
//			getCurChannel : function(){
//				return objInstance.getCurChannel;
//			},
//			getCurEngin : function(){
//				return objInstance.getCurEngin;
//			},
//			getSmartInfo : function(_chanel, _engin){
//				return objInstance.enginModel.getSmartInfo(_chanel, _engin);
//			},
//			getSmartDataParser:function(data, _chanel, _engin){
//				return objInstance.enginModel.getSmartDataHandler(data, _chanel, _engin);
//			},
//			getSmartPostParam : function(word, _chanel, _engin){
//				return objInstance.enginModel.getSmartPostParam(word, _chanel, _engin);
//			},
			enginModel : objInstance.enginModel,
			enginController : objInstance,
			callback:function(name,value){//选中项回调
				if(value !== '' && value !== '-1' && value !== undefined){
					objInstance.doQuery(name, objInstance.curChannel, objInstance.curEngin, "smart");
				}
			}
		});
		//hover logo
		$("#searchEngineLogo").hover(function(e){
			timer = setTimeout(function(){
				objInstance.showEngineList();
				//搜索引擎logo hover上报
				var _stag = "dhv1.hover.so." + objInstance.enginModel.channelMap[objInstance.curChannel];
				haoqq.getStatisInstance().reportClick(e, _stag, {
					'type' : 'search'
				});
				haoqq.getDjlStatisInstance().reportClick(e, _stag);
            },300);
		}, function(e){
			clearTimeout(timer);
			var target = e.relatedTarget;
    		var enginChange = $("#enginChange");
    		if(enginChange && !haoqq.util.isAncestor(enginChange[0], target)){
    			objInstance.hideEngineList();
        	}
		});
		$("#enginChange").hover($.noop, function(e){
			var target = e.relatedTarget;
    		if(!haoqq.util.isAncestor($("#searchEngineLogo")[0], target)){
    			objInstance.hideEngineList();
    		}
		});
		
		this.queryInput.keypress(function(e){
			if(e.keyCode == 13){
				objInstance.doQuery(objInstance.queryInput.val(), objInstance.curChannel, objInstance.curEngin, "input_e");
				return false;
			}
		});
		//提交表单
		this.form[0].onsubmit = function(e){
			//执行查询url
			objInstance.doQuery(objInstance.queryInput.val(), objInstance.curChannel, objInstance.curEngin, "input_c");
			return false;
		};
        this.showEngineList=function(){
            $("#enginChange").show();
        };
        this.hideEngineList=function(){
            $("#enginChange").hide();
        }
		
		this.queryInput.mouseover(function(e){
			$(this).focus();
		});
	};
	/**
	 * do something
	 * @override
	 */
	searchCtr.prototype.run = function(){
		//初始化搜索引擎视图
		this.searchSelectView.changeView(this.curChannel, this.curEngin);
	};
	
	searchCtr.prototype.getCurChannel = function(){
		return this.curChannel;
	};
	
	searchCtr.prototype.getCurEngin = function(){
		return this.curEngin;
	};

	/**
	 * 执行查询
	 */
	searchCtr.prototype.doQuery = function(word, channel, engin, source){
		var instance= this;
		this.enginModel.setParam('_src', 'haoqq');
		if(source) {
			this.enginModel.setParam('source', source);
        }
		//如果有unc，soso的就带设置的unc,否则默认
		var _get = haoqq.util.readGet();
		var _unc = _get['unc'];
		if(engin == 'soso' && _unc && _unc != ''){
			this.enginModel.setParam('unc', _unc);
		}else if(engin == 'soso'){
			_unc = "u500874_s1_h1";
			this.enginModel.setParam('unc', _unc);
		}
		//cid上报
		var _cid = "";
		if(engin == 'soso'){
			var user = haoqq.user.getUserManagerInstance();
			var isLogin = user.hasLoged();
			if(source === "smart"){//登录
				_cid = "dh.so.smart";
			}else if(source.indexOf("input") >= 0){
				_cid = "dh.so.p";
			}else if(source === "hotword"){
				_cid = "dh.so.hotkey";
			}
			if(isLogin){
				_cid += ".q";
			}
			this.enginModel.setParam('cid', _cid);
		}
        //上报
		var _stag = "dhv1.so." + this.searchWay[source] + "." 
			+ this.enginModel.enginMap[engin] + this.enginModel.channelMap[channel]
			+ this.searchType[source];
		haoqq.getStatisInstance().reportClick(null, _stag, {
			'type' : 'search',
//			'unc' : _unc,
			'cid' : _cid,
			'channel' : channel,
			'engin' : engin,
			'source' : source
		});
		haoqq.getDjlStatisInstance().reportClick(null, _stag);
		
//        report.searchReport(channel, engin, source, _unc, _cid);
        //储存key
//        objInstance.storage.set(objInstance.CHANNEL_STORAGE_KEY + "_" + channel, engin);
        //soso百科特殊处理
        if(engin == 'soso' && channel == 'baike'){
        	word = "S" + word;
        }
        var queryUrl = this.enginModel.getQueryUrl(word, channel, engin);
        /**fuck tmall 天猫参数GBK，单独处理**/
        if(channel==='gouwu'&&engin==='tmall'){
            var	win	= window.open();
            $.requestJson('toolboxs.htm',function(data){
                var code=data.code;
                if(code=='0'){
                    var url = instance.enginModel.getQueryUrl(data.result, channel, engin);
                    window.setTimeout(function(){
                        win.location=url;
                    },0);
                }
            },{
                'tn':'en_gbk',
                'w':word
            },'post');
        }else{
            window.open(queryUrl);
        }
	};
	
	namespace.getSearchCtrInstance = haoqq.common.Singleton(function(){
        return new searchCtr();
	});
	
	namespace.createSearchCtr = function(){
		return new searchCtr();
	};
	
}(haoqq.namespace('search')));