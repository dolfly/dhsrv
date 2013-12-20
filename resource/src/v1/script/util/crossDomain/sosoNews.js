//window.onload = function(){
	var haoqq_iframe = document.createElement("iframe");
	haoqq_iframe.style.width = "100%";
	haoqq_iframe.style.height = "100%";
	haoqq_iframe.id = "haoqq_iframe";  
	haoqq_iframe.style.display = "none";
	document.body.appendChild(haoqq_iframe);   
	var b_height = document.body.clientHeight > 0? document.body.clientHeight : document.body.scrollHeight;
//	var b_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
	//var b_iframe = document.getElementById("haoqq_iframe");
	haoqq_iframe.src = "http://3gimg.qq.com/haoqq/output/sosoAgent.html#"+b_height;
//};

