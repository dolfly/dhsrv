/**
 * 轮播视图组件
 * @author ronizhang
 */
(function(namespace){
	
	var LoopView = function(){
		
	};
	
	LoopView.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	LoopView.prototype.init = function(param){
		this.config = param[0];
		
		this.loopBlock = this.config.loopBlock;
		this.prevButton = this.config.prevButton;
		this.nextButton = this.config.nextButton;
		this.curIndex = this.config.curIndex || 0;
		this.total = this.loopBlock.length;
		
		this.loopWay = this.config.loopWay || 'show';//值：fade show
		this.loopMethod = this.config.loopMethod;
		this.stopWhenHover = this.config.stopWhenHover || false;
		
		this.loopInterval = this.config.loopInterval || 10000;//循环间隔：毫秒
		
		this.timer = 0;
		this.afterChange = this.config.afterChange;//切换后回调
		
		this.config = null;
	};
	/**
	 * 初始化事件
	 * @override
	 */
	LoopView.prototype.initEvent = function(){
		var instance = this;
		
		if(this.nextButton){
			this.nextButton.click(function(e){
				e.preventDefault();
				instance.change();
			});
		}
		
		if(this.prevButton){
			this.prevButton.click(function(e){
				e.preventDefault();
				instance.change(true);
			});
		}
		
		//hover时停止计时
		if(this.stopWhenHover){
			this.loopBlock.each(function(){
				$(this).hover(function(){
					instance.stop();
				}, function(){
					instance.reStart();
				});
			});
		}
	};
	/**
	 * do something
	 * @override
	 */
	LoopView.prototype.run = function(){
		/**
		 * 启动定时器
		 */
		this.reStart();
	};
	
	/**
	 * 重启计时
	 */
	LoopView.prototype.reStart = function(){
		var instance = this;
		if(this.timer > 0)	window.clearInterval(this.timer);
		this.timer = window.setInterval(function(){
			instance.change();
		}, this.loopInterval);
	};
	
	/**
	 * 停止计时
	 */
	LoopView.prototype.stop = function(){
		if(this.timer > 0)	
			window.clearInterval(this.timer);
		this.timer = 0;
	};
	
	/**
	 * 切换
	 */
	LoopView.prototype.change = function(toPrev){
		var nextNo = -1;
		if(toPrev === true){
			nextNo = this.getPrevNo();
		}else{
			nextNo = this.getNextNo();
		}
		if($.isFunction(this.loopMethod)){
			this.loopMethod(this.loopBlock, nextNo);
			return;
		}
		
		for(var i=0; i < this.total; i++){
			if(i === nextNo){
				if(this.loopWay === 'fade'){
					$(this.loopBlock[i]).fadeIn('slow');
				}else{
					$(this.loopBlock[i]).show();
				}
				continue;
			}
			if(this.loopWay === 'fade'){
				$(this.loopBlock[i]).fadeOut('slow');
			}else{
				$(this.loopBlock[i]).hide();
			}
		}
		
		if($.isFunction(this.afterChange)){
			this.afterChange(nextNo);
		}
	};
	
	/**
	 * 获取下一个序号
	 */
	LoopView.prototype.getNextNo = function(){
		if(++this.curIndex >= this.total){
			this.curIndex = 0;
			return 0;
		}
		return this.curIndex;
	};
	
	/**
	 * 获取上一个序号
	 */
	LoopView.prototype.getPrevNo = function(){
		if(--this.curIndex < 0){
			this.curIndex = this.total-1;
			return this.curIndex;
		}
		return this.curIndex;
	};

	
	namespace.getLoopViewInstance = haoqq.common.Singleton(function(){
		return new LoopView();
	});
	
	namespace.createLoopView = function(){
		return new LoopView();
	};
	
}(haoqq.namespace('util')));