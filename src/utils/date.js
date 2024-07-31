import {isDate, isString} from "./typer";

/**
 * get date by year and month
 * @param {number} year
 * @param {number} month
 * @returns {number}
 */
export function getTotalDayByMonth(year, month) {
    month = parseInt(month, 10);
    let d = new Date(year, month, 0);
    return d.getDate();
}

/**
 * get week day
 * @param {number} year
 * @param {number} month
 * @param {number} date
 * @returns {number}
 */
export function getWeek(year, month, date) {
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
 * parse date string to object
 * @param {string} str
 * @returns {{date: number, month: number, year: number}}
 */
export function parseStr(str) {
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
 * string to date instance
 * @param {string} year
 * @param {string} month
 * @param {Date} date
 */
export function toDate({year, month, date}) {
    return new Date(year, month - 1, date);
}

/**
 * @description is a date
 * @param {string} year
 * @param {string} month
 * @param {string} date
 * @returns {string}
 */
export function isADate({year, month, date}) {
    return year && month && date;
}

/**
 * @description add days
 * @param {Date} date
 * @param {number} num
 * @param {string} tag
 * @returns {Date|undefined}
 */
export function add(date, num, tag) {
    switch (tag) {
        case 'days':
            return new Date(date.getTime() + num * 86400000);

        default:
            break;
    }
}

/**
 * @description 两个日期相隔多少天
 * @param {Object} start
 * @param {Object} end
 * @returns {Number} 相隔天数
 */
export function howManyDaysBetween(start, end) {
    let startTimeStamp = toDate(start);
    let endTimeStamp = toDate(end);
    return (endTimeStamp - startTimeStamp) / 86400000;
}

/**
 * @description 获得当前日期（年月日）
 * @returns {String} 当前日期（年月日），如：20220517
 */
export function getToday() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    let formatDate = year + month + day;
    return formatDate;
}

// 这不算是日期，但是和日期相关，所以先放这里了
/**
 * @description 格式化时间
 * @param { number } time
 * @returns { string }
 */
export function formatTimeToStr(time) {
    time = isNaN(time) ? 0 : parseInt(time);
    return time < 0 ? '00' : `${time < 10 ? `0` : ``}${time}`;
};

/**
 * @description 更粒子化
 * @param { number } timestamp
 * @returns { number }
 */
export const getDateMap = {
    days: timestamp => parseInt(timestamp / 1000 / 60 / 60 / 24, 10), //计算剩余的天数
    allHours: timestamp => parseInt(timestamp / 1000 / 60 / 60, 10), //计算剩余总的小时
    hours: timestamp => parseInt((timestamp / 1000 / 60 / 60) % 24, 10), //计算剩余的小时
    minutes: timestamp => parseInt((timestamp / 1000 / 60) % 60, 10), //计算剩余的分钟
    seconds: timestamp => parseInt((timestamp / 1000) % 60, 10), //计算剩余的秒数
};

/**
 * @typedef {object} getLeftTimeObjReturn
 * @property {string} getLeftTimeObjReturn.days
 * @property {string} getLeftTimeObjReturn.hours
 * @property {string} getLeftTimeObjReturn.minutes
 * @property {string} getLeftTimeObjReturn.seconds
 * @property {string} getLeftTimeObjReturn.allHours
 */
/**
 * @description 获取剩余时间
 * @param { number } timestamp
 * @returns {getLeftTimeObjReturn}
 */
export function getLeftTimeObj(timestamp) {
    const {days, hours, minutes, seconds, allHours} = getDateMap;

    return {
        days: formatTimeToStr(days(timestamp)),
        hours: formatTimeToStr(hours(timestamp)),
        minutes: formatTimeToStr(minutes(timestamp)),
        seconds: formatTimeToStr(seconds(timestamp)),
        allHours: formatTimeToStr(allHours(timestamp)),
    };
};

/**
 * @description 比较两个时间戳
 * @param { number } time
 * @returns { boolean }
 */
export function compareToNowTime (time) {
    const nowTime = new Date();
    return time - nowTime.getTime();
}

/**
 * @description 格式化时间
 * @return {*}
 * @constructor
 */
function DateFormat() {
    return new DateFormat.prototype.init();
}

DateFormat.fn = DateFormat.prototype = {
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
                return DateFormat.fn._default.formatFn(d.getFullYear(), f);
            },
            M: function (d, f) {
                return DateFormat.fn._default.formatFn(d.getMonth() + 1, f);
            },
            D: function (d, f) {
                return DateFormat.fn._default.formatFn(d.getDate(), f);
            },
            h: function (d, f) {
                return DateFormat.fn._default.formatFn(d.getHours(), f);
            },
            m: function (d, f) {
                return DateFormat.fn._default.formatFn(d.getMinutes(), f);
            },
            s: function (d, f) {
                return DateFormat.fn._default.formatFn(d.getSeconds(), f);
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
            console.error('请提供一个合法日期！');
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
DateFormat.fn.init.prototype = DateFormat.fn;

/**
 * @description format date to string
 * @param {Date|String} date
 * @param {string} pattern
 * @returns {string}
 */
export function formatDate(date, pattern) {
    let df = new DateFormat();
    return df.format(date, pattern);
}


const SECOND = 1000;
/**
 * @description 毫秒单位的时间
 * @type {{HOUR: number, SECOND: number, MINUTE: number, DAY: number}}
 */
export const TimeDef = {
    SECOND: SECOND,
    MINUTE: SECOND * 60,
    HOUR: SECOND * 60 * 60,
    DAY: SECOND * 60 * 60 * 24,
}