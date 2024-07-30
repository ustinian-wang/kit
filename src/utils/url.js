/**
 * @description 将url解析
 * @param url
 * @return {{search: string, headOfUrl, hash: string}}
 */
export function parseUrl(url){
    let headOfUrl = url;
    let search = "";
    let hash = "";
    let searchIndex = url.indexOf('?');
    if (searchIndex !== -1) {
        headOfUrl = url.substring(0, searchIndex);
        search = url.substring(searchIndex+1);
    }
    let hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {

        hash = url.substring(hashIndex+1);
        let hashIndexOfSearch = search.indexOf('#');
        if(hashIndexOfSearch !== -1){
            search = search.substring(0, hashIndexOfSearch);
        }else{
            headOfUrl = url.substring(0, hashIndex);
        }
    }

    return {
        headOfUrl,
        search,
        hash
    }
}

export function toUrl(options){
    let {
        headOfUrl,
        search,
        hash
    } = options;

    let url = headOfUrl;
    if(search){
        url += '?' + search;
    }
    if(hash){
        url += '#' + hash;
    }
    return url;
}

/**
 * 获取url中的search参数
 * @param {string} url
 * @return {URLSearchParams}
 */
export const getUrlSearchParam = (url)=>{
    let res = parseUrl(url);
    return new URLSearchParams(res.search);
}
/**
 * 获取url中的get参数
 * @param {string} url
 * @param {string} key
 * @return {string}
 */
export const getUrlParam = (url, key)=>{
    let searchParams = getUrlSearchParam(url);
    return searchParams.get(key);
}
/**
 * 获取当前url中的get参数
 * @param {string} key
 * @return {string}
 */
export const getCurrUrlParam = (key)=>{
    return getUrlParam(location.href, key);
}
/**
 * 设置url中的get参数
 * @param {string} url
 * @param {string} key
 * @param {any} value
 * @return {string}
 */
export const setUrlParam = (url, key, value)=>{
    let res = parseUrl(url);
    let searchParams = new URLSearchParams(res.search);
    searchParams.set(key, value);
    res.search = searchParams.toString();
    
    return toUrl(res);
}
/**
 * 设置当前url中的get参数
 * @param {string} key
 * @param {string} value
 * @return {string}
 */
export const setCurrUrlParam = (key, value)=>{
    return setUrlParam(location.href, key, value);
}

export const setUrlRandomParam = (url, key)=>{
    return setUrlParam(url, key, Math.random());
}

/**
 * @description 用params设置url中的get参数
 * @param url
 * @param params
 * @return {*}
 */
export function setUrlParams(url, params={}){
    let nowUrl = url
    // let urlObj =
    Object.keys(params).forEach(key=>{
        nowUrl = setUrlParam(nowUrl, key, params[key])
    })
    return nowUrl;
}

/**
 * @description 判断字符串是否为url
 * @param url
 * @return {boolean}
 */
export const isUrl = (url)=>{
    try{
        new URL(url);
        return true;
    }catch ( e ) {
        return false;
    }
}

/**
 * @description 判断是否为绝对路径
 * @param {String} url url
 * @return {Boolean} 是否为绝对路径
 */
export function isAbsoluteURL( url ) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    if ( typeof url === 'string' ) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test( url )
    } else {
        return false
    }
}