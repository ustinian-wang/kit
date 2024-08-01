import {isDate, isObject, isString} from "./typer";
import {padZero} from "./str.js";

/**
 * @description get the day of the month
 * @param {number} year
 * @param {number} month
 * @returns {number} 1-31 or 1-30 or 1-28 or 1-29
 */
export function getDayOfMonth(year, month) {
    let d = new Date(year, month, 0);
    return d.getDate();
}

/**
 * @description get the day of the week
 * @param {number} year
 * @param {number} month
 * @param {number} date
 * @returns {number} 1-7
 */
export function getDayOfWeek(year, month, date) {
    let d = new Date(year, month - 1, date);
    return d.getDay();
}

/**
 * translate date instance to string
 * @param {string} fmt
 * @param {Date} date
 * @returns {*}
 */
export function dateFormat(fmt, date) {
    if(!isDate(date)){
        return;
    }
    let o = {
        'M+': date.getMonth() + 1,
        //月份
        'd+': date.getDate(),
        //日
        'h+': date.getHours(),
        //小时
        'm+': date.getMinutes(),
        //分
        's+': date.getSeconds(),
        //秒
        'q+': Math.floor((date.getMonth() + 3) / 3),
        //季度
        S: date.getMilliseconds(), //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length),
        );
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length),
            );
        }
    }

    return fmt;
}

/**
 * @description parse date string to object with 'YYYY-MM-DD' pattern
 * @param {string} str
 * @returns {{date: number, month: number, year: number}}
 */
export function parseDateStr(str) {
    if (!isString(str)) {
        str = '';
    }

    const [year, month, date] = str.split('-');
    return {
        year: +year,
        month: +month,
        date: +date,
    };
}

/**
 * @typedef {object} ParsedDate
 * @param {string} year
 * @param {string} month
 * @param {string} date
 */

/**
 * parse date instance to object
 * @param {Date} date
 * @returns {{date: number, month: number, year: number}}
 */
export function parseDate(date) {
    if (!isDate(date)) {
        return {
            month: undefined,
            year: undefined,
            date: undefined,
        };
    }
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
    };
}

/**
 * @description string to date instance
 * @param {ParsedDate} value
 * @returns {Date|undefined}
 */
export function toDate(value) {
    if(!isParsedDate(value)){
        return;
    }
    let {
        year,
        month,
        date,
    } = value;
    return new Date(year, month - 1, date);
}

/**
 * @description is ParsedDate
 * @returns {string}
 * @param obj
 * @returns {boolean}
 */
export function isParsedDate(obj) {
    if(!isObject(obj)){
        return false;
    }
    let {year, month, date} = obj;
    return year && month && date;
}

/**
 * @description get days between start end end
 * @param {string | Date} start
 * @param {string | Date} end
 * @returns {Number} 相隔天数
 */
export function getDaysBetween(start, end) {
    let startTimeStamp = toDate(start);
    let endTimeStamp = toDate(end);
    return (endTimeStamp - startTimeStamp) / 86400000;
}

/**
 * @description get today sting with 'YYYYMMDD' pattern
 * @returns {String}
 */
export function getToday() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    month = padZero(month)
    day = padZero(day);

    return year + month + day;
}
/**
 * @description get rest information of the time
 * @param {number} timestamp ms unit
 * @returns {{hours: string, seconds: string, totalHours: string, minutes: string, days: string}}
 */
export function getLeftTimeInfo(timestamp) {
    let days = timestamp => Math.trunc(timestamp / TimeDef.DAY); //计算剩余的天数
    let totalHours = timestamp => Math.trunc(timestamp / TimeDef.HOUR); //计算剩余总的小时
    let hours = timestamp => Math.trunc((timestamp / TimeDef.HOUR) % 24); //计算剩余的小时
    let minutes = timestamp => Math.trunc((timestamp / TimeDef.MINUTE) % 60); //计算剩余的分钟
    let seconds = timestamp => Math.trunc((timestamp / TimeDef.SECOND) % 60); //计算剩余的秒数

    return {
        days: padZero(days(timestamp)),
        hours: padZero(hours(timestamp)),
        minutes: padZero(minutes(timestamp)),
        seconds: padZero(seconds(timestamp)),
        totalHours: padZero(totalHours(timestamp)),
    };
}

/**
 * @description compare timestamp with now timestamp
 * @param { number } timestamp
 * @returns { number } timestamp offset with now date
 */
export function compareToNow (timestamp) {
    return timestamp - Date.now()
}

/**
 * @description 格式化时间
 * @return {*}
 * @constructor
 */
function DateFormatFactory() {
    return new DateFormatFactory.prototype.init();
}

DateFormatFactory.fn = DateFormatFactory.prototype = {
    _default: {
        formatFn: function (date, pattern) {
            date = date || 0;
            pattern = pattern.length;
            return pattern === 1
                ? date
                : (Math.pow(10, pattern) + date + '').slice(-pattern);
        },
        formatMap: {
            Y: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getFullYear(), f);
            },
            M: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getMonth() + 1, f);
            },
            D: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getDate(), f);
            },
            h: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getHours(), f);
            },
            m: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getMinutes(), f);
            },
            s: function (d, f) {
                return DateFormatFactory.fn._default.formatFn(d.getSeconds(), f);
            },
            w: function (d) {
                return d.getDay();
            },
        },
    },
    // 初始化
    init: function () {
        return this;
    },
    // 配置
    config: function (config) {
        for (let name in config) {
            this._default[name] = config[name];
        }

        return this;
    },
    // 格式化
    format: function (date, pattern) {
        if (!isString(pattern)) {
            pattern = 'YYYY-MM-DD HH:mm:ss';
        }
        if (isString(date)) {
            date = new Date(date.replace(/-/g, '/'));
        }
        date = new Date(date);

        if (/Invalid/i.test(date + '')) {
            console.error('provide valid date, please！');
            return;
        }

        let _self = this,
            char = '';

        return pattern.replace(/([YMDhsmw])\1*/g, function (format) {
            char = format.charAt();
            return _self._default.formatMap[char]
                ? _self._default.formatMap[char](date, format)
                : '';
        });
    },
};
DateFormatFactory.fn.init.prototype = DateFormatFactory.fn;

/**
 * @description format date to string for compat it with IOS mobile
 * @param {Date|String} date Date or time like '1995-01-01
 * @param {string} pattern like 'YYYY-MM-DD HH:mm:ss'
 * @returns {string}
 */
export function formatDate(date, pattern) {
    let df = new DateFormatFactory();
    return df.format(date, pattern);
}


const SECOND = 1000;
/**
 * @description time definition with millisecond unit
 * @type {{HOUR: number, SECOND: number, MINUTE: number, DAY: number}}
 */
export const TimeDef = {
    SECOND: SECOND,
    MINUTE: SECOND * 60,
    HOUR: SECOND * 60 * 60,
    DAY: SECOND * 60 * 60 * 24,
}