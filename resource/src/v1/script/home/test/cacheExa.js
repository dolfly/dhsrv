
$(document).ready(function(){
	alert($.isFunction(undefined));
	
	var cache1 = haoqq.util.getCacheInstance();
	alert("cache1 k1:"+cache1.get('1'));//0
	alert("cache1.length:"+cache1.size());//0
	
	cache1.add('1', '11');
	alert("cache1 k1:"+cache1.get('1'));//11
	alert("cache1.length:"+cache1.size());//1
	
	cache1.add('2', '22');
	alert("cache1 k2:"+cache1.get('2'));//22
	alert("cache1.length:"+cache1.size());//2
	
	cache1.add('1', '12');
	alert("cache1 k1:"+cache1.get('1'));//11
	alert("cache1.length:"+cache1.size());//2
	
	cache1.mod('1', '12');
	alert("cache1 k1:"+cache1.get('1'));//12
	alert("cache1.length:"+cache1.size());//2

	var cache2 = haoqq.util.getCacheInstance();
	alert("cache2 k1:"+cache2.get('1'));//12
	alert("cache2.length:"+cache2.size());//2
	
	cache2.remove('1');
	alert("cache2 k1:"+cache2.get('1')+" " + cache1.get('1'));//null null
	alert("cache2.length:"+cache2.size());//1
	
	var cache3 = haoqq.util.createCache();
	cache3.add('1', '111');
	alert("cache3 k1:"+cache3.get('1')+" " + cache2.get('2'));//111 22
	alert("cache3.length:"+cache3.size() + " " + cache1.size());//1 1
	
	cache2.clear();
	alert("cache2 k1:"+cache2.get('1')+" " + cache1.get('1')==null);//undefined true
	alert("cache2.length:"+cache2.size() + " " + cache1.size());//0 0
	alert("cache3.length:"+cache3.size());//1
	
});