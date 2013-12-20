/**
 * 城市存储
 * @namespace
 */
(function(namespace) {
		
		var CityStore = function(){
			//最近城市
			this.arrayList = haoqq.util.ArrayList();
            this.max_cache = 3;
            this.cache_key_l = "wlCity";
            this.cache_key_default = "wlCity_default";

            CityStore.prototype.getDefaultCity=function(){
                var city=g_storge.get(this.cache_key_default);
                if(!city){
                    city="";
                }
                return city;
            }

            CityStore.prototype.reloadData=function(){
                var $this=this;
                for(var i = 0; i <this.max_cache; i++){
                    (function(i){
                        var city=g_storge.get($this.cache_key_l+i);
                        if(city){
                            $this.arrayList.add(city);
                        }
                    })(i);
                }
            }
			/**
			 * 读取最近城市
			 */
			CityStore.prototype.readLatestCitys = function(){
				return this.arrayList.toArray();
			};

            /**
             * 从内存list刷新到本地存储
             */
            CityStore.prototype.flush=function(){
                var i=0;
                var $this=this;
                /**clear**/
                for(var i = 0; i <this.max_cache; i++){
                    g_storge.del($this.cache_key_l+i);
                }
                for(i=0;i<this.arrayList.size();i++){
                    (function(index,city){
                        g_storge.set($this.cache_key_l+index,city);
                    })(i,this.arrayList.get(i));
                }
            }
			/**
			 * 保存最近城市
			 */
			CityStore.prototype.saveLatestCitys = function(city){
			 try{
                 if(this.checkCityExsit(city)){
                     return ;
                 }
                 if(this.arrayList.size() < this.max_cache){
                     g_storge.set(this.cache_key_default,city);
                     this.arrayList.add(city);
                     this.flush();
                 }
			 }catch (e) {
			 }
			};

            /**
             * 删除城市
             * @param city
             */
            CityStore.prototype.deleteCity=function(city){
               var index=this.arrayList.indexOf(city);
                if(index>=0){
                    this.arrayList.removeValue(city);
                    this.flush();
                }
            }
			/**
			 * 判断定制城市是否已存在
			 */
			CityStore.prototype.checkCityExsit = function(city){
//                var $this=this;
                var result=false;
                if(this.arrayList.indexOf(city) >= 0){//如果城市已经存在，则设为默认城市
                    g_storge.set(this.cache_key_default,city);
                    return true;
                }
                return result;
			};
		};
		

	namespace.CityStore = function(){
		return new CityStore();
	};

} (haoqq.namespace('city')));

