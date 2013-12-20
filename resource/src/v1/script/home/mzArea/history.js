/**
 * 浏览历史
 * @author ronizhang
 */
(function(namespace){
	
	var History = function(){
		
	};
	
	History.prototype = new haoqq.common.Template();
	
	/**
	 * 初始化变量
	 * @override
	 */
	History.prototype.init = function(){
		this.his = [];
		this.PAGE_HIS_LENGTH = 5;
		
	};
	/**
	 * 初始化事件
	 * @override
	 */
	History.prototype.initEvent = function(){
		var instance = this;
		$("#clearHis").click(function(e){
			e.preventDefault();
			instance.clearPageHis($(this));
		});
	};
	/**
	 * do something
	 * @override
	 */
	History.prototype.run = function(){
		this.readPageHis();
		this.updateHisView();
	};
	
	/**
	 * 更新界面视图
	 */
	History.prototype.updateHisView = function(){
		var historyArea = $("#historyArea");
		$("#historyArea li").remove();
		var hasHis = false;
		for(var h=0; h < this.his.length; h++){
			if(this.his[h] === '' || this.his[h] == 'undefined' || !this.his[h]){
				continue;
			}
			var _array = this.his[h].split('||');
			if(!_array[0] || !_array[1]){
				continue;
			}
			var _li = $("<li>");
			historyArea.append(_li);
			var _img = $("<img height='16' width='16'/>");
			setIconUrl(_array[1], _img);
			var _domA = $("<a></a>").attr({
				'href' : _array[1],
				'_stag' : 'dhv1.history.'+(h+1)
//				'class' : 'setlink '
			}).text(_array[0]);
			_li.append(_img);
			_li.append(_domA);
			hasHis = true;
		}
		if(hasHis){
			$("#clearHis").show();
		}else{
			$("#clearHis").hide();
		}
	};
	
	/**
	 * 更新浏览历史
	 */
	History.prototype.updatePageHis = function(name, url){
//		$("#historyArea .hisLi").empty();
		this.savePageHis(name, url);
		this.updateHisView();
	};
	
	/**
	 * 保存浏览历史
	 */
	History.prototype.savePageHis = function(name, url){
		var _val = name + "||" + url;
		for(var _h in this.his){
			if(this.his[_h] == _val){
				return;
			}
		}
		var _temp = [];
		_temp[0] = _val;
		for(var i = 0; i < this.PAGE_HIS_LENGTH - 1; i++){
			_temp[i+1] = this.his[i];
		}
		this.his = _temp;
		//保存到本地
		for(var i = 0; i < this.PAGE_HIS_LENGTH; i++){
			g_storge.set('his'+i, this.his[i]);
		}
	};
	
	/**
	 * 清空浏览历史
	 */
	History.prototype.clearPageHis = function(obj){
		$("#historyArea li").remove();
		this.his = [];
		obj.hide();
		for(var i = 0; i < this.PAGE_HIS_LENGTH; i++){
			g_storge.del('his'+i);
		}
	};
	
	History.prototype.readPageHis = function(){
		for(var i = 0; i < this.PAGE_HIS_LENGTH; i++){
			this.his[i] = g_storge.get('his'+i) || '';
		}
	}
	
	namespace.getHistoryInstance = haoqq.common.Singleton(function(){
		return new History();
	});
	
	namespace.createHistory = function(){
		return new History();
	};
	
}(haoqq.namespace('mz')));