/*
 * @Author: ustinian-wang wangjser@gmail.com
 * @Date: 2024-07-31 08:58:41
 * @LastEditors: ustinian-wang wangjser@gmail.com
 * @LastEditTime: 2024-12-25 00:18:03
 * @FilePath: \kit\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @typedef {Object} Response
 * @property {number} rt
 * @property {string} msg
 * @property {boolean} success
 * @property {*} data
 */

import axios from "axios";
import {
    setContentTypeOfPostRequest,
    serializeObjParamOfGetRequest,
    setTokenOfRequest
} from "./interceptors.js";
import { jsonStringify } from "../utils/cast.js";
import { isObject, isString } from "../utils/typer.js";
import { isUrl } from "../utils/url.js";
import axiosRetry from 'axios-retry';

/**
 *
 * @description 克隆请求库
 * @return {*}
 */
export function cloneRequest() {
    //vuepress引入这个会出现global错误
    let instance = axios.create({
        timeout: 15000,
        headers: {
            post: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    });

    axiosRetry(instance, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error) => {
            return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
                   (error.response && error.response.status >= 500);
        }
    });

    setContentTypeOfPostRequest(instance);
    setTokenOfRequest(instance);
    serializeObjParamOfGetRequest(instance);

    return instance
}
/**
 * @description 请求库
 * @type {*}
 */
export const request = cloneRequest();

/**
 * @deprecated
 * @description 对request包装一层，支持适配老项目的ajax参数格式请求和响应，
 * @param {object} options ajax参数
 * @param {object} options.type 请求方法，默认为get，可以选择get或post，目前只支持这两种
 * @param {object} options.url 请求url
 * @param {string | object} options.data 参数对象
 * @param {object} cusRequest 自定义的请求axios对象，你也可以通过cloneRequest获取request二次包装，弄一个适配业务的request库
 * @return {Promise<string>} 返回值和ajax一样，都是json格式
 */
export function ajaxOfRequest(options, cusRequest = request) {
    let { type = 'get', url = '', data = '', success = function () {}, error = function () {} } = options;
    
    if(!isUrl(url)){
        console.error(`[url] is not a valid url`);
        return;
    }
        
    let params = {};
    if (isObject(data)) {
        params = data;
    } else if (isString(data)) {
        let hasQuestion = url.includes('?');
        if (hasQuestion) {
            url += data;
        } else {
            url += '?' + data;
        }
    }
    const resolveOfSuccess = (response) => {
        let data = response.data;
        let json = jsonStringify(data);
        return success(json);
    };
    //默认只有get和post两种
    if (type === 'get') {
        return cusRequest
            .get(url, {
                params,
            })
            .then(resolveOfSuccess, error);
    } else {
        return cusRequest.post(url, params).then(resolveOfSuccess, error);
    }
};
