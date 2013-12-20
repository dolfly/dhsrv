/**
 * cookie操作和一个本地持久化存储的方案
 * @author ronizhang
 * @namespace 
 */
(function(namespace) {

	/**
     * @name Cookie
     * @class Cookie类
     * @exports Cookie as haoqq.Cookie
     */
	var cookieObj = {

		/**
         * 设置cookie值
         * @function
         * @name Cookie#set
         * @param {string }name 键
         * @param {string} value 值
         * @param {Date} expires 过期时间
         */
		set: function(name, value, expires, domain, path) {
			if (expires == 'long') {
				var date = new Date();
				date.setTime(date.getTime() + (3650 * 24 * 60 * 60 * 1000));
				expires = date.toUTCString();
			}
			else if (typeof expires == 'object') {
				expires = expires.toUTCString();
			}
			document.cookie = (name + '=' + value + (expires ? '; expires=' + expires: '') + (domain ? ';domain=' + domain : '') + (path ? ';path=' + path : ''));
		},

		/**
         * 读取cookie值
         * @function
         * @name Cookie#get
         * @param {string }name 键
         * @returns {string|null} value 值
         */
		get: function(name) {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = $.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		},

		/**
         * 删除cookie值
         * @function 
         * @name Cookie#del
         * @param {string }name 键
         * @returns {string|null} value 值
         */
		del: function(name, domain, path) {
			this.set(name, null, new Date(1970, 1, 1), domain, path);
		}
	};

	/**
    * @class 本地存储对象.对支持LocalStorage的浏览器用localStorage,ie下用userdata.其他用cookie
    * @name Storage
    * @exports Storage as haoqq.Storage
    */
	var storageObj = (function() {
		var f_get, f_set, f_del;
		if (typeof window.localStorage == 'object') {
			var s = window.localStorage;
			f_get = function(key) {
				return s.getItem(key);
			};
			f_set = function(key, val) {
				s.setItem(key, val);
			};
			f_del = function(key) {
				s.removeItem(key);
			};
			//ie8下,delete s[key]语法,若s[key]不存在会报错!
		}
		else if (document.body.addBehavior) {
			var d = document.body,
			fname = 'faxin';
			var load = function() {
				try {
					d.load(fname);
				} catch(e) {}
			}
			var save = function() {
				try {
					d.save(fname);
				} catch(e) {}
			}
			d.addBehavior("#default#userData");

			f_get = function(key) {
				load();
				return d.getAttribute(key);
			};
			f_set = function(key, val) {
				load();
				d.setAttribute(key, val);
				save();
			};
			f_del = function(key) {
				load();
				d.removeAttribute(key);
				save();
			};
		}
		if (!f_del) {
			return cookieObj;//cookie roni修改:改为返回封装的cookie
		} else {
			return {
				/**
                 * 读取键值
                 * @function
                 * @name Storage#get
                 * @param {string }name 键
                 * @returns {string|null} value 值
                 */
				get: f_get,
				/**
                 * 设置键值
                 * @function
                 * @name Storage#set
                 * @param {string }name 键
                 * @param {string }value 值
                 */
				set: f_set,
				/**
                 * 删除键值
                 * @function
                 * @name Storage#del
                 * @param {string }name 键
                 */
				del: f_del
			};
		}
	})();

	namespace.Storage = function() {
		return storageObj;
	};

	namespace.Cookie = function() {
		return cookieObj;
	};

} (haoqq));
