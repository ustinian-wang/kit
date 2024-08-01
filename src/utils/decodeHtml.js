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