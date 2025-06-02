
/**
 * 返回屏幕宽高
 */
export function getScreen() {
	return {
		'width': window.screen.width,
		'height': window.screen.height
	};
};

export function getScreenType(width, height) {
	/**
	 * 屏幕类型定义
	 * type的定义在JAVA的fai.web.Request中定义，要求一模一样
	 */
	var ScreenType = {
		'OTHER': 0,				// 其他分辨率
		'W1920H1080': 1,			// 1920*1080
		'W1680H1050': 2,			// 1680*1050
		'W1600H1200': 3,			// 1600*1200
		'W1600H1024': 4,			// 1600*1024
		'W1600H900': 5,			// 1600*900
		'W1440H900': 6,			// 1440*900
		'W1366H768': 7,			// 1366*768
		'W1360H768': 8,			// 1360*768
		'W1280H1024': 9,			// 1280*1024
		'W1280H960': 10,			// 1280*960
		'W1280H800': 11,			// 1280*800
		'W1280H768': 12,			// 1280*768
		'W1280H720': 13,			// 1280*720
		'W1280H600': 14,			// 1280*600
		'W1152H864': 15,			// 1152*864
		'W1024H768': 16,			// 1024*768
		'W800H600': 17				// 800*600
	};

	return ScreenType['W' + $.trim(String(width)) + 'H' + $.trim(String(height))] || ScreenType.Other;
};


/**
 * @description get browser width
 * @returns {number}
 */
export function getBrowserWidth() {
	return document.documentElement.clientWidth;
};



export function getBrowserHeight() {
	return document.documentElement.clientHeight;
};


/**
 * @description check if point is in rectangle
 * @param {Object} pt
 * @param {Object} rect
 * @returns {boolean}
 */
export function ptInRect(pt, rect) {
	if (pt.x >= rect.left && pt.x <= rect.left + rect.width &&
		pt.y >= rect.top && pt.y <= rect.top + rect.height) {
		return true;
	}
	return false;
};