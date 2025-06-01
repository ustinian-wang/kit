// utils start
export {
    createNodeInDocumentBody,
    renderVueComponentInDocumentBody,
    setSelectorOfDOM,
    bindNativeEvent,
    removeNode
} from "./src/utils/browser/dom.js";
export {
    openFileSelectionWindow,
    openOneFileSelectionWindow,
    completeMime,
    MimeShortDef,
    MimeDef,
    getShortMimeByMime,
    FileSizeDef,
    convertMimes,
} from "./src/utils/browser/file.js";
export {
    before,
    after,
    memorize,
    delay,
    debounce,
    throttle,
    asyncRetry,
} from "./src/utils/aop.js";
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
} from "./src/utils/arr.js";
export {
    awaitPromiseRes,
    promisify,
    sleep,
    sleepSecond,
} from "./src/utils/async.js";
export {
    CacheFactory,
    MemoryCache,
    DiskCache,
    SessionStorageCache,
} from "./src/utils/cache";
export {
    setCookie,
    getCookie,
    getObjCookie,
    setObjCookie,
} from "./src/utils/cookie";
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
} from "./src/utils/date";
export {
    getFileExtension,
    getUrlFileExtension
} from "./src/utils/file";
export {
    forEach
} from "./src/utils/Iterate";
export {
    TriggerLock,
    getTriggerLock,
    LockerWrapper
} from "./src/utils/lock";
export {
    cloneByJSON,
    setter,
    eachObject,
    getCombinationOfObject,
    toObject,
    getter,
    isObjErr,
} from "./src/utils/obj";
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
} from "./src/utils/str";
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
} from "./src/utils/typer";
export {
    cloneDeep,
    deepAssign,
} from "./src/utils/clone";

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
} from "./src/utils/url";
export { checkBit } from "./src/utils/bit.js";
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
} from "./src/libs/moment.js";
// libs end