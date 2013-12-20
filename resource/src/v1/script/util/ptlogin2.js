/**
 * ptlogin
 * @author ronizhang
 */
(function(namespace) {

	var Ptlogin2 = function() {

		var iframe = null,
		iframecontainer = null,
		_callback = null;

		window.ptlogin2_onResize = ptlogin2_onResize;
		window.ptlogin2_onClose = ptlogin2_onClose;

		function ptlogin2_onResize(width, height) {
			iframe.style.width = width + 'px';
			iframe.style.height = height + 'px';
			iframecontainer.style.top = (document.documentElement.clientHeight - height) / 2 + $(window).scrollTop() + "px";
			iframecontainer.style.left = (document.documentElement.clientWidth - width) / 2 + "px";
			return;
		}

		function ptlogin2_onClose() {
//			haoqq.dom.addClass(iframecontainer, 'nodisplay');
			iframecontainer.style.display = "none";
			(typeof(_callback) === 'function') && _callback(false);
		}

		this.open = function(callback) {
			if (!iframe) {
				iframecontainer = document.createElement('div');
				iframecontainer.style.display = "none";
				iframecontainer.style.position = "absolute";
				iframecontainer.style.zIndex = "9999";
//				haoqq.dom.addClass(iframecontainer, 'loginDiv nodisplay');
				iframe = document.createElement('iframe');
				iframe.setAttribute('scrolling', 'no');
				iframe.setAttribute('frameBorder', 0);
				document.body.appendChild(iframecontainer);
				iframecontainer.appendChild(iframe);
				ptlogin2_onResize(490, 330);
			}
			iframecontainer.style.display = "block";
//			haoqq.dom.removeClass(iframecontainer, 'nodisplay');
			iframe.src = "http://ui.ptlogin2.qq.com/cgi-bin/login?appid=653024904&s_url=" + encodeURIComponent(location.href) + "&f_url=loginerroralert&target=parent&link_target=blank&low_login=1&rd=" + Math.random();
            _callback = callback;
		};
	};

	namespace.Ptlogin2 = Ptlogin2;
}(haoqq) );

