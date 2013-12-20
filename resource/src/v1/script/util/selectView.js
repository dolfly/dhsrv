(function(namespace) {

    /**
     * 下拉列表视图类
     *
     * @class 下拉列表视图类，自定义的select控件
     * @name SelectView
     * @exports SelectView as haoqq.SelectView
     */
    var SelectView = function(currentItemEle, listEle,row,onshow, onClick) {

        if (!currentItemEle || ! listEle) return null;

        this.selectedIndex = -1;
        this.showing = false;
        var instance = this;
        this.options = listEle[0].getElementsByTagName('li');
//        this.options = listEle.find('li');
        this.links = listEle[0].getElementsByTagName('a');
//        this.links = listEle.find('a');
        this.maxIndex = this.options.length;
        this.defaultValue = currentItemEle.html();//.innerHTML;
        this.onShow=onshow||function(select){return true;};
        this.onClick=onClick||$.noop;
        /**
         * 获取当前选定项的索引
         * @function
         * @name SelectView#getSelectIdx 
         * @returns {int} index 选定项的索引，从0开始。-1代表恢复默认
         */
        function getSelectIdx() {
            return this.selectedIndex;
        }

        /**
         * 设置当前选定项
         * @function
         * @name SelectView#setSelectIdx 
         * @param {int} index 选定项的索引，从0开始。-1代表恢复默认
         */
        function setSelectIdx(index) {
            this.selectedIndex = index;
            if( index === -1 ){
                currentItemEle.html(this.defaultValue);//.innerHTML = ;
            }else{
                currentItemEle.html(this.links[index].innerHTML);//.innerHTML = this.links[index].innerHTML;//.truncate_cn(10);
            }
            return true;
        }
        
        /**
         * 切换当前的打开状态,当前下拉列表打开，则将其关闭。反之亦然
         * @function
         * @name SelectView#toggle 
         */
        function toggle() {
            this.showing ? this.close() : this.show();
        }

        this.show = function() {
            if(this.onShow(listEle)){
                listEle.show();
                this.showing = true;
            }
        }

        this.close = function() {
        	listEle.hide();
            this.showing = false;
        }

        function init() {
        	currentItemEle.click(function(e){
        		instance.toggle();
        		e.preventDefault();
                e.stopPropagation();
                if(onClick){
                	onClick();
                }
        	});
            if(row){
                row.click(function(e){
                    instance.toggle();
                    e.preventDefault();
                    e.stopPropagation();
                    if(onClick){
                    	onClick();
                    }
                });
            }
        	listEle.click(function(e){
                e.preventDefault();
                e.stopPropagation();
                var target = e.target;
                while (target.tagName != 'LI') {
                    if (target === document.body) return;
                    target = target.parentNode;
                }
                instance.close();
                var options = instance.options;
                for (var i = 0; i < options.length; ++i) {
                    if (options[i] === target) {
                        if (i === instance.selectedIndex) return;
                        instance.setSelectIdx(i);
                        if (typeof(instance.onchange) == 'function') {
                            instance.onchange();
                        }
                        return;
                    }
                }
        	});

        	$(document).click(function(e){
        		var target = e.target;
        		if(!haoqq.util.isAncestor(currentItemEle[0], target)){
        			instance.close();
        		}
        	});

        }

        /**
         * 当前选项的值
         * @function
         * @name SelectView#getOptions 
         * @param {int} index 选定项的索引，从0开始。
         * @returns {string} 索引对应选项的值。
         * @defaultValue ''
         */
        function getOptions(index) {
            var r = this.options[index].getAttribute('optionvalue');
            if (typeof(r) == 'undefined') r = '';
            return r;
        }

        /**
         * 当前选项值对应的索引
         * @function
         * @name SelectView#getOptionIndex
         * @param {string} option 选项值
         * @returns {int} 选项值对应的索引。没有该选项返回-1
         */
        function getOptionIndex(option){
            var i, n;
            for(i=0,n=this.options.length;i<n;++i){
                if(this.options[i].getAttribute('optionvalue')===option){
                    return i;
                }
            }
            return -1;
        }

        init();

        this.setSelectIdx= setSelectIdx;
        this.getSelectIdx= getSelectIdx;
        this.getOptions= getOptions;
        this.getOptionIndex = getOptionIndex;
        this.toggle= toggle;
    };

    namespace.SelectView = SelectView;

} (haoqq));