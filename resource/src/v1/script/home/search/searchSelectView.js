/**
 * 搜索引擎选择器视图
 * @author ronizhang
 */
(function(namespace) {
	
	var SearchSelectView = function(){
		
	};
	
	SearchSelectView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	SearchSelectView.prototype.init = function(param){
		this.param = param || {};
		if(!param[0].searchModel || !param[0].container){
			return;
		}
		this.searchModel = param[0].searchModel;//搜索引擎模型
		this.container = param[0].container;//容器
		this.searchEngineLogo = $("#searchEngineLogo");
		//切换回调
		this.onSelectChange = (typeof(param[0].onSelectChange) == 'function') ? param[0].onSelectChange: function() {};
		
		this.curChannel = 'web';
	};
	/**
	 * 初始化事件
	 * @override
	 */
	SearchSelectView.prototype.initEvent = function(){
	};
	/**
	 * do something
	 * @override
	 */
	SearchSelectView.prototype.run = function(){
	};
	
	/**
	 * 根据channel修改视图
	 */
	SearchSelectView.prototype.changeView = function(channel, defaultEngin){
		var objInstance = this;
		this.container.empty();
		//获取该channl下的引擎集合
		var t_config = this.searchModel.configuration;
        var chl = t_config[channel];
		var engins = chl.enginEunm;
		//<li><a href="#" class="enginePic soso"></a></li>
		for(var i = 0; i < engins.length; i++){
            (function(engine){
            	var li = $("<li>");
                var a = $("<a>");
                var e_t = chl[engine];
                a.attr({
                    'href':'javascript:;',
                    'target':'_self',
                    'class': 'enginePic ' + e_t.logoClassNmae,
                    'title': "切换到'" + e_t.name + "'引擎",
                    'engine':engine
                }).click(function(e){
                	var eg = $(this).attr("engine");
                	objInstance.searchEngineLogo.removeClass();
                	objInstance.searchEngineLogo.addClass('enginePic ' + chl[eg].logoClassNmae);
//                    if(window.DD_belatedPNG){
//                        window.DD_belatedPNG.fixPng(searchEngineLogo.get(0))
                        searchEngineLogo.focus();
//                    }
                    objInstance.onSelectChange(e, eg);
                });
                objInstance.container.append(li);
                li.append(a);
            })(engins[i]);

			 if(defaultEngin == engins[i]){
				//修改图片和文字 
				 objInstance.searchEngineLogo.removeClass();
				 objInstance.searchEngineLogo.addClass("enginePic " + chl[defaultEngin].logoClassNmae);
			 }
//             if(window.DD_belatedPNG){
//                 window.DD_belatedPNG.fixPng(searchEngineLogo.get(0))
//                 searchEngineLogo.focus();
//             }
		}
		objInstance.curChannel = channel;
	};
	
	namespace.getSelectViewInstance = haoqq.common.Singleton(function(){
        return new SearchSelectView();
	});
	
	namespace.createSelectView = function(){
		return new SearchSelectView();
	};
	
} (haoqq.namespace('search')));