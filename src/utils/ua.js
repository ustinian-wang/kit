
/**
 * Marcoli check is Weixin
 * @return boolean :true/false
 *     $.isWeixin()
 */
export function isWeixin() {
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	return isWeixin;
};


export function isAppleWebKit() {
	var ua = window.navigator.userAgent;
	if (ua.indexOf('AppleWebKit') >= 0) {
		return true;
	}
	return false;
};


//判断是PC端还是mobi端
export function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ['Android', 'iPhone',
		'SymbianOS', 'Windows Phone',
		'iPad', 'iPod'];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
};