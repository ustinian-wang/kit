/**
 * @description 解码
 * @export
 * @param {*} html
 * @return {*}
 */
export function decodeHtml(html) {
    return html && html.replace
        ? html
            .replace(/&nbsp;/gi, ' ')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#92;/gi, '\\')
            .replace(/&#39;/gi, "'")
            .replace(/&quot;/gi, '"')
            .replace(/<br\/>/gi, '\n')
            .replace(/&amp;/gi, '&')
        : html;
}

/**
 * @description 编码
 * @export
 * @param {*} html
 * @return {*}
 */
export function encodeHtml(html) {
    return html && html.replace
        ? html
            .replace(/&/g, '&amp;')
            .replace(/ /g, '&nbsp;')
            .replace(/\b&nbsp;+/g, ' ')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            // eslint-disable-next-line no-useless-escape
            .replace(/\'/g, '&#39;')
            // eslint-disable-next-line no-useless-escape
            .replace(/\"/g, '&quot;')
            .replace(/\n/g, '<br/>')
            .replace(/\r/g, '')
        : html;
}

// 把字符串转换为写在html标签中javascript的字符串，例如<div onclick="alert('xxx')">
export function encodeHtmlJs(html) {
	return html && html.replace ? (html.replace(/\\/g, '\\\\').replace(/\'/g, '\\x27').replace(/\"/g, '\\x22').replace(/\n/g, '\\n').replace(/</g, '\\x3c').replace(/>/g, '\\x3e')) : html;
};

// 把字符串转换为写在html中属性值，例如<div title="xxx">
export function encodeHtmlAttr(html) {
	return html && html.replace ? (html.replace(/\"/g, '&#x22;').replace(/\'/g, '&#x27;').replace(/</g, '&#x3c;').replace(/>/g, '&#x3e;').replace(/&/g, '&#x26;')).replace(/\\/g, '&#5c;') : html;
};


// 进行url编码
export function encodeUrl(url) {
	return typeof url === 'undefined' ? '' : encodeURIComponent(url);
};

// 进行url解码
export function decodeUrl(url) {
	var backUrl = '';
	try {
		// 如果decodeURIComponent失败, 会爆Uncaught URIError
		backUrl = (typeof url === 'undefined' ? '' : decodeURIComponent(url));
	} catch (e) {
		backUrl = '';
	}
	return backUrl;
};



//  解码在html中属性值，例如<div title="xxx">
export function decodeHtmlAttr(html) {
	return html && html.replace ? (html.replace(/&#x22;/gi, '"').replace(/&#x27;/gi, '\'').replace(/&#x3c;/gi, '<').replace(/&#x3e;/gi, '>').replace(/&#x26;/gi, '&')).replace(/&#5c;/gi, '\\') : html;
};
