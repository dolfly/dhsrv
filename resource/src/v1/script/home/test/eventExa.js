function adultTv(){
	
}

$(document).ready(function(){
	//监听器测试
//	var adultTv = new adultTv();
	haoqq.util.Event.extendEvent(adultTv);
	
	adultTv.addListener('play', function(data){
		alert("今天一频道播放"+data+"的电影");
	});
	
	adultTv.addListener('play', function(data){
		alert("今天二频道也播放"+data+"的电影");
	});
	
	adultTv.addListener('forbiden', function(data){
		alert("广电禁播"+data+"的电影");
	});
	
	adultTv.trigger('play', '苍井空');
	adultTv.trigger('forbiden', '小泽玛莉亚');
	
	alert("修改播放频道");
	adultTv.modListener('play', function(data){
		alert("今天所有频道都播放"+data+"的电影");
	});
	adultTv.trigger('play', '苍井空');
	adultTv.trigger('forbiden', '小泽玛莉亚');
	
	alert("删除播放");
	adultTv.removeListener('play');
	adultTv.trigger('play', '苍井空');
	adultTv.trigger('forbiden', '小泽玛莉亚');
	
	alert("删除禁播");
	adultTv.removeListener('forbiden');
	adultTv.trigger('play', '苍井空');
	adultTv.trigger('forbiden', '小泽玛莉亚');
});