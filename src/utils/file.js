import { isUrl } from "./url";

/**
 * @description 解析文件后缀名，而且会强制转换小写，例如有的客户会jpg改为JPG等非法文件,导致后端接口失败
 * @param {string} filename
 * @return {string}
 */
export function getFileExtension(filename) {
    if(!filename.includes(".")){
        return "";
    }
    // 获取最后一个点之后的字符串作为扩展名
    let ext = filename.substring(filename.lastIndexOf('.') + 1);

    ext = ext.split("?")[0];
    ext = ext.split("#")[0];

    return ext.toLowerCase();
}

/**
 * @description 解析url资源后缀，而且会强制转换小写，例如有的客户会jpg改为JPG等非法文件,导致后端接口失败
 * @param {string} url
 * @return {string}
 */
export function getUrlFileExtension(url) {
    if(!url){
        return "";
    }
    // 使用内置的URL对象来解析URL
    url = (url.startsWith("http:") || url.startsWith("https:")) ? url : "https:" + url;
    if(!isUrl(url)){
        return "";
    }
    const parsedUrl = new URL(url);

    // 获取pathname（不包括查询参数和哈希部分）
    const pathname = parsedUrl.pathname;
    if(!pathname.includes(".")){
        return "";
    }
    // 从pathname中获取最后一个点之后的字符串
    return pathname.substring(pathname.lastIndexOf('.') + 1).toLowerCase();
}