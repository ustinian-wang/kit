/**
 * @description query string 的处理对象
 * @type {{parse: ((function(*): ({}))|*), stringify: (function(*): string)}}
 */
const qs = (() => {
    function parse(queryString) {
        if (!queryString) {
            return {};
        }
        const query = {};
        // 去除开头可能的'?'
        const pairs = (queryString[0] === '?' ? queryString.substring(1) : queryString).split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            const key = decodeURIComponent(pair[0]);
            const value = pair.length === 2 ? decodeURIComponent(pair[1]) : null;
            if (query[key] === undefined) {
                query[key] = value;
            } else if (Array.isArray(query[key])) {
                query[key].push(value);
            } else {
                query[key] = [query[key], value];
            }
        }
        return query;
    }

    function stringify(object) {
        const keys = Object.keys(object);
        const pairs = keys.map((key) => {
            const value = object[key];
            if (Array.isArray(value)) {
                return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        });
        return '' + pairs.join('&');
    }

    return { parse, stringify };
})();

export default qs;
