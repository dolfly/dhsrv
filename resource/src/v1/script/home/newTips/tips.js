/**
 * tip操作
 * @author ronizhang
 */
(function(namespace){
	
	var Tips = function(){
		
	};
	
	Tips.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	Tips.prototype.init = function(){
//		g_storge.del('tipkey1');
		var instance = this;
		this.tips = {
			'tipkey1' : [{
				'init' : function(){
					var tip = haoqq.tips.getCalendarTipInstance();
					tip.start();
					tip.addListener('close', function(){
						instance.saveTips(1);
//						g_storge.set('tipkey1', 1);
						instance.next('tipkey1');
					});
				},
				'tip' : haoqq.tips.getCalendarTipInstance()
			}, {
				'init' : function(){
					var tip = haoqq.tips.getLoginTipInstance();
					tip.start();
					tip.addListener('close', function(){
						instance.saveTips(2);
//						g_storge.set('tipkey1', 2);
						instance.next('tipkey1');
					});
				},
				'tip' : haoqq.tips.getLoginTipInstance()
			}, {
				'init' : function(){
					var tip = haoqq.tips.getSkinTipInstance();
					tip.start();
					tip.addListener('close', function(){
						instance.saveTips(3);
//						g_storge.set('tipkey1', 3);
						instance.next('tipkey1');
					});
				},
				'tip' : haoqq.tips.getSkinTipInstance()
			}, {
				'init' : function(){
					var tip = haoqq.tips.getComponentTipInstance();
					tip.start();
					tip.addListener('close', function(){
						instance.saveTips(4);
//						g_storge.set('tipkey1', 4);
						instance.next('tipkey1');
					});
				},
				'tip' : haoqq.tips.getComponentTipInstance()
			}]	
		};
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	Tips.prototype.initEvent = function(){
		var instance = this;
		//初始化第一批tips
		var _tips = this.tips['tipkey1'];
		for(var i = 0; i < _tips.length; i++){
			_tips[i].init();
		}
		var key1 = parseInt(g_cookie.get('tipkey1'));
		if(!key1){
			if(this.tips['tipkey1'][0].tip.show() === false){
				this.saveTips(1);
//				g_storge.set('tipkey1', 1);
				this.next('tipkey1');
			}
		}else{
			if(this.tips['tipkey1'][key1] && this.tips['tipkey1'][key1].tip.show() === false){
				this.saveTips(key1 + 1);
//				g_storge.set('tipkey1', key1 + 1);
				this.next('tipkey1');
			}
		}
		
		//添加重绘tips事件
		haoqq.tips.getTipsTriggerInstance().addListener('reloadTips', function(){
			var _tips = instance.tips['tipkey1'];
			for(var i = 0; i < _tips.length; i++){
				if(_tips[i].tip.isShow()){
					_tips[i].tip.show();//重新计算位置
				}
			}
		});
		
//		//事件冒泡
//		$(document).click(function(e){
//			var _tips = instance.tips['tipkey1'];
//			for(var i = 0; i < _tips.length; i++){
//				if(_tips[i].tip.isShow()){
//					_tips[i].tip.show();//重新计算位置
//				}
//			}
//		});
	};
	/**
	 * do something
	 * @override
	 */
	Tips.prototype.run = function(){
		
	};
	
	Tips.prototype.next = function(tipkey){
		var _tips = this.tips[tipkey];
		var _nextPos = parseInt(g_cookie.get(tipkey));
		for(var i = 0; i < _tips.length; i++){
			if(i == _nextPos){
				if(_tips[i].tip.show() === false){
//					g_storge.set(tipkey, _nextPos + 1);
					this.saveTips(_nextPos + 1);
					this.next(tipkey);
				}
			}
		}
	};
	
	Tips.prototype.saveTips = function(tipsNo){
		g_cookie.set("tipkey1", tipsNo, 'long');
		//发请求保存
		$.requestJson('saveUserProfile.htm', function(json){
    		return;
        },{
           'g_tk' : haoqq.util.getACSRFToken(g_cookie.get("uiid")),
           'type' : 3,
           'data' : tipsNo
        },'post');
	};
	
	namespace.getTipsInstance = haoqq.common.Singleton(function(){
		return new Tips();
	});
	
	namespace.createTips = function(){
		return new Tips();
	};
	
}(haoqq.namespace('tips')));