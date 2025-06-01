// utils start
export {
    createNodeInDocumentBody,
    renderVueComponentInDocumentBody,
    setSelectorOfDOM,
    bindNativeEvent,
    removeNode
} from "./utils/browser/dom.js";
export {
    openFileSelectionWindow,
    openOneFileSelectionWindow,
    completeMime,
    MimeShortDef,
    MimeDef,
    getShortMimeByMime,
    FileSizeDef,
    convertMimes,
} from "./utils/browser/file.js";
export {
    before,
    after,
    memorize,
    delay,
    debounce,
    throttle,
    asyncRetry,
} from "./utils/aop.js";
export {
    array2Map,
    getFieldList,
    splitArrayByPredicate,
    getFirstByField,
    insertArrayToCircleArray,
    getElementsOfCircleArray,
    fixArrayIndex,
    isNumberArray,
    isArrayWithElements,
    isTypeArray,
    removeElementsOfArray,
    uniqueArray2Map,
    getFirstByFieldEquals,
    sortObjectArray,
    isStringArray,
    diffArrays,
} from "./utils/arr.js";
export {
    awaitPromiseRes,
    promisify,
    sleep,
    sleepSecond,
} from "./utils/async.js";
export {
    CacheFactory,
    MemoryCache,
    DiskCache,
    SessionStorageCache,
} from "./utils/cache.js";
export {
    setCookie,
    getCookie,
    getObjCookie,
    setObjCookie,
} from "./utils/cookie.js";
export {
    getDayOfMonth,
    getDayOfWeek,
    dateFormat,
    parseDateStr,
    parseDate,
    toDate,
    isParsedDate,
    getDaysBetween,
    getToday,
    getLeftTimeInfo,
    compareToNow,
    formatDate,
    TimeDef
} from "./utils/date.js";
export {
    getFileExtension,
    getUrlFileExtension
} from "./utils/file.js";
export {
    forEach
} from "./utils/Iterate.js";
export {
    TriggerLock,
    getTriggerLock,
    LockerWrapper
} from "./utils/lock.js";
export {
    cloneByJSON,
    setter,
    eachObject,
    getCombinationOfObject,
    toObject,
    getter,
    isObjErr,
} from "./utils/obj.js";
export {
    padZero,
    isNormalEventName,
    ellipsis,
    isJSON,
    safeJsonParse,
    jsonParse,
    jsonStringify,
    getGbLen,
    subGbStr,
} from "./utils/str.js";
export {
    isPromise,
    isMatch,
    isEmptyArr,
    isArray,
    isObject,
    isFunction,
    isNumber,
    isBoolean,
    isNull,
    isEmptyObj,
    equals,
    noEquals,
    isEmptyStr,
    isUndefined,
    isDate,
    isRegExp,
    isEmpty,
    isFalsy,
    isString,
    isObjectString,
    isClass,
} from "./utils/typer.js";
export {
    cloneDeep,
    deepAssign,
} from "./utils/clone.js";

export {
    parseUrl,
    toUrl,
    getUrlSearchParam,
    getUrlParam,
    getCurrUrlParam,
    setUrlParam,
    setCurrUrlParam,
    setUrlRandomParam,
    setUrlParams,
    isUrl,
    isAbsoluteUrl,
} from "./utils/url.js";
import { checkBit } from "./utils/bit.js";
// utils end


// libs start
export {
  stringToMoment,
  timestampToMoment,
  dateToMoment,
  dateArrToMoment,
  isoStrToMoment,
  objToMoment,
  utcStrToMoment,
  millisToDuration,
  momentToString,
  momentToTimestamp,
  momentToDate,
  momentToUTCString,
  durationToMillis,
  getWeek,
  str2Unix,
  isSameDay,
  isToday,
  getZeroMoment,
  isTodayBefore,
  extendTime
} from "./libs/moment.js";
// libs end

const f = () => {   
    console.log('f')
}
console.log(666)
export {
    checkBit,
    f
}