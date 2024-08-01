/**
 * @description factory function of cache
 * @param {object} cache
 * @param {number} lifeCycle
 */
import { jsonStringify, safeJsonParse } from './str.js';
import { isObject } from "./typer";
import {getter} from "./obj.js";
import {getWindow} from "./env.js";

/**
 * @typedef {Object} CacheObject - A cache object with methods to manage cache data.
 * @property {object} cache - The cache object that holds the cache data.
 * @property {function} getData - Returns the cache data.
 * @property {function} containsKey - Checks if the cache contains a specific key.
 * @property {function} getCache - Retrieves the value associated with a specific key from the cache.
 * @property {function} setCache - Sets a value in the cache for a specific key.
 * @property {function} clearCache - Clears the entire cache.
 * @property {function} init - Initializes the cache with a new cache object.
 * @property {function} clearExpire - Clears expired cache entries based on the defined life cycle.
 */

/**
 * @description create object to manage cache
 * @param {object} [cache={}] cache data object
 * @param {number} [lifeCycle=0] cache time ms
 * @returns {CacheObject}
 */
export function CacheFactory(cache, lifeCycle) {
    return {
        cache: cache,

        getData() {
            return this.cache;
        },

        containsKey(key){
            return this.cache.hasOwnProperty(key);
        },

        getCache(key) {
            this.clearExpire();

            if (this.cache[key]) {
                // console.log('hit cache', key);
                return this.cache[key].value;
            } else {
                // console.log('init ');
                return {}.value;
            } // return (this.cache[key] || {}).value;
        },

        setCache(key, value) {
            this.clearExpire();
            this.cache[key] = {
                timestamp: new Date().getTime(),
                value: value,
            };
        },

        clearCache() {
            Object.keys(this.cache).forEach(key => {
                delete this.cache[key];
            });
        },

        init(newCache) {
            Object.assign(this.cache, newCache);
        },

        clearExpire() {
            let now = new Date().getTime();
            Object.keys(this.cache).forEach(key => {
                let info = this.cache[key] || {};

                if (!info.timestamp) {
                    delete this.cache[key];
                    return;
                }

                let oldTimeStamp = info.timestamp;

                if (now - oldTimeStamp > lifeCycle) {
                    delete this.cache[key];
                }
            });
        },
    };
}

/**
 * @typedef {Object} DiskCache
 * @property {CacheObject} Cacher
 * @property {Function} getCache
 * @property {Function} setCache
 * @property {Function} getTotalData
 * @property {Function} reportError
 * @property {Function} clearCache
 */

/**
 * @description create object to manage cache by localStorage
 * @param {string} DISK_CACHE_KEY - cache group key
 * @param {number|Function} [lifeCycle=0] cache time
 * @returns {CacheObject & DiskCache} 。
 */
function createDiskCacher(DISK_CACHE_KEY, lifeCycle) {
    let nowWindow = getWindow();
    let localStorageObject = getter(nowWindow || {}, "localStorage");
    let localStorage = localStorageObject ? localStorageObject
        : {
              getItem() {},
              setItem() {},
              removeItem() {},
          };
    let isMethodExist = localStorage.getItem instanceof Function;
    let result = isMethodExist ? localStorage.getItem(DISK_CACHE_KEY) : '{}';
    let cache = safeJsonParse(result, {}) || {}; //初始化的时候从本地缓存读取数据
    let Cacher = CacheFactory(cache, lifeCycle);
    return {
        Cacher,

        getCache(key) {
            //读的时候，从内存读取，
            return Cacher.getCache(key); //再从内存数据里面获取
        },

        setCache(key, value) {
            //写的时候，才写入本地缓存
            Cacher.setCache(key, value); //缓存进行去
            let cacheData = Cacher.getData();
            try {
                localStorage.setItem(DISK_CACHE_KEY, jsonStringify(cacheData)); //写入本地
            } catch (e) {
                console.error(
                    `setCache exception; key=${key}, value=${value}; error=`,
                    e,
                );
                this.reportError(key, value);
            }
        },
        getTotalData() {
            return Cacher.getData();
        },
        reportError(key, value) {
            key = key + '';
            value = value + '';
            let totalData = Cacher.getData();
            let maxKey = '';
            let maxValue = '';
            //统计最大和最小的key
            Object.keys(totalData).forEach(key => {
                let originValue = getter(totalData, `${key}.value`);
                let value =
                    (isObject(originValue)
                        ? jsonStringify(originValue)
                        : originValue) + '';
                if (maxValue.length < value.length) {
                    maxKey = key;
                    maxValue = value;
                }
            });
            //不使用ESM的方式，是为了解耦代码
            MallApp.logFdpTrack('mall_gdn_cache', {
                mall_free_text_0: key,
                mall_free_text_1: value,
                mall_free_text_2: maxKey,
                mall_free_text_3: maxValue,
            });
        },

        clearCache() {
            Cacher.clearCache();
            localStorage.removeItem(DISK_CACHE_KEY);
        },
    };
}

/**
 * @description 内存缓存
 * @type {CacheObject}
 */
export const MemoryCache = (function () {
    let cache = {};
    let lifeCycle = 60 * 1000; //默认缓存1分钟

    return CacheFactory(cache, lifeCycle);
})(); // 磁盘缓存

/**
 * @description 磁盘缓存，底层是localStorage
 * @type {CacheObject & DiskCache}
 */
export const DiskCache = (function () {
    const DISK_CACHE_KEY = '_diskCache';
    let lifeCycle = 60 * 1000 * 60 * 24 * 365; //默认缓存一年
    return createDiskCacher(DISK_CACHE_KEY, lifeCycle);
})();


