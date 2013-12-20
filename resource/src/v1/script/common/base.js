/**
 * Base
 * @author ronizhang
 * @namespace 
 */
var haoqq = {};

/** 
  获得一个命名空间
  @function
  @param {string} ns 以.分隔的命名空间
  @example
  haoqq.namespace('weather.view');
  返回haoqq.weather.view命名空间对象
*/
haoqq.namespace = function(ns) {

	if (typeof ns !== 'string') {
		ns = 'anonymous';
	}

	var subspaces = ns.split('.');
	var current = haoqq;//ronizhang:不挂载在window下：window.haoqq;
	var result = current;

	var i, n;
	for (i = 0, n = subspaces.length; i < n; ++i) {
		if (subspaces[i]) {
			current = result[subspaces[i]] = result[subspaces[i]] || {};
			result = current;
		}
	}
	return result;

};

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}

String.prototype.toDate = function() {
    var _str = this;
    if (this.indexOf("-") < 0) {// 20120201这种格式的日期
        var _y = this.substring(0, 4);
        var _m = this.substring(4, 6);
        var _d = this.substring(6, 8);
        _str = _y + "-" + _m + "-" + _d;
    }
    var arry = _str.split("-");
    var year = parseInt(arry[0]);
    var month = 1;
    var day = 1;
    if (arry[1].indexOf('0') == 0) {
        month = parseInt(arry[1].substring(1, 2)) - 1;
    } else {
        month = parseInt(arry[1]) - 1;
    }
    if (arry[2].indexOf('0') == 0) {
        day = parseInt(arry[2].substring(1, 2));
    } else {
        day = parseInt(arry[2]);
    }
    return new Date(year, month, day);
};

String.prototype.endWith = function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
}

String.prototype.startWith = function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
}

function StringBuffer() {
	this._strs = new Array; 
}
	
StringBuffer.prototype.append = function (str) { 
	this._strs.push(str); 
};

StringBuffer.prototype.toString = function() { 
	return this._strs.join(""); 
};
