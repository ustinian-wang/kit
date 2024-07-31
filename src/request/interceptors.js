import qs from "./qs.js";
import { deepAssign } from "../utils/clone.js";
import { isArray, isObject } from "../utils/typer.js";
import { jsonStringify } from "../utils/str.js";

/**
 * @description 设置post请求的content-type的拦截器
 * @param instance
 * @return {void}
 */
export const setContentTypeOfPostRequest = ( instance ) => {
    instance.interceptors.request.use( config => {
        // 在发送请求之前做些什么
        // 将 data 转换为 JSON 字符串，并设置 Content-Type 头部
        if ( config.method === 'post' ) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            let newData = {};
            Object.keys( config.data ).forEach( key => {
                let value = config.data[key];
                if ( typeof value === 'object' ) {
                    newData[key] = JSON.stringify( value );
                } else {
                    newData[key] = value;
                }
            } );
            config.data = qs.stringify( newData );
        }
        return config;
    }, error => {
        // 处理请求错误
        return Promise.reject( error );
    } );
}
/**
 * @description 设置TOKEN的拦截器，每个页面的token都不一样，只能这样子拿
 * @param instance
 * @return {void}
 */
export const setTokenOfRequest = ( instance ) => {

    instance.interceptors.request.use( ( config ) => {
        let _TOKEN = getToken();
        if ( _TOKEN ) {
            config.params = deepAssign( {}, config.params, {
                _TOKEN
            } )
        }

        return config;
    } )
}

function getToken(){
    try{
        return window.document.querySelector( '#_TOKEN' ).getAttribute( 'value' );
    }catch ( e ) {
        return "";
    }
}

/**
 * @description 将get的对象参数转成字串的拦截器
 */
export const serializeObjParamOfGetRequest = ( instance ) => {
    instance.interceptors.request.use( ( config ) => {
        if ( config.method === 'get' ) {
            config.params = serializeObjParamOfGet( config.params );
        }
        return config;
    } )
}
/**
 * @description 将get的对象参数转成字串
 * @param params
 * @return {{}}
 */
export const serializeObjParamOfGet = (params)=>{
    if ( !params ) {
        params = {};
    }
    Object.keys( params ).forEach( key => {
        let value = params[key]
        if ( isObject( value ) || isArray( value ) ) {
            value = jsonStringify( value );
        }
        params[key] = value
    } )
    return params;
}