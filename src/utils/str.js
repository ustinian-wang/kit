import {isNumber, isString} from "./typer";

/**
 * @description add leading zero if value <10
 * @param {number} value
 * @returns {string}
 */
export function padZero(value) {
    if(!isNumber(value)){
        return "00";
    }
    return value < 10 ? '0' + value : value + '';
}

/**
 * @description value can't includes some values
 * @param {string} value
 * @returns {boolean}
 */
function isNormalStr(value = '') {
    if (value === '') {
        return false;
    }

    let invalidList = [
        void 0,
        new Promise(() => {}),
        () => {},
        function () {},
        null,
        {},
        true,
        false,
    ].map(item => item + '');

    for (let item of invalidList) {
        if (value.includes(item)) {
            return false;
        }
    }

    return true;
}

/**
 * @description check if value is normal event name like 'click.myEvent' with jQuery event name style
 * @param {string} value
 * @returns {boolean}
 */
export function isNormalEventName(value) {
    if (!isString(value)) {
        value = '';
    }
    let valuePair = value.split('.');
    return valuePair.every(item => isNormalStr(item));
}

/**
 * @description a function like css's ellipsis
 * @param {string} text
 * @param {number} maxNum
 * @returns {string}
 */
export function ellipsis(text, maxNum) {
    if (!isString(text)) {
        text = text + '';
    }
    if (!isNumber(maxNum) || isNaN(maxNum)) {
        maxNum = text.length;
    }

    if (text.length > maxNum) {
        return text.substring(0, maxNum) + '...';
    } else {
        return text;
    }
}

/**
 * @description check if the value is json string
 * @param {string} str
 * @returns {boolean}
 */
export function isJSON(str) {
    if (isString(str)) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

/**
 * @description compute string length including Chinese and English chars
 * @param {string} str
 * @returns {number}
 */
export function getGbLen(str) {
    if(!isString(str)){
        return 0;
    }
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}

/**
 * @description slice specified length of string with EN, CN chars
 * @param {string} str
 * @param {number} index
 * @param {boolean} [point=true]
 * @returns {string}
 */
export function subGbStr(str, index, point = true) {
    if (index >= getGbLen(str)) {
        return str;
    }

    let rtStr = '';
    for (let i = 0, count = 0; count < index; i++, count++) {
        rtStr += str[i];
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            count++;
        }
    }
    if (point) {
        return rtStr + '...';
    } else {
        return rtStr;
    }
}



/*
 * 判断是否字母
 */
export function isLetter(val) {
	if ((val < 'a' || val > 'z') && (val < 'A' || val > 'Z')) {
		return false;
	}
	
	return true;
};

/*
 * 判断是否中文
 */
export function isChinese(val) {
	if (val < '一' || val > '龥') {
		return false;
	}
	
	return true;
};

export function isIp(ipaddr) {
	if (typeof ipaddr != 'string' || $.trim(ipaddr) == '') {
		return false;
	}
	var ss = ipaddr.split('.');
	if (ss.length != 4) {
		return false;
	}
    for(let e of ss){
        if (!isNumber(e) || parseInt(e) < 0 || parseInt(e) > 255) {
			return true;
		}
    }
    return false;
};

export function isDomain(obj) {
	if (/^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]$/.test(obj)) {
		if (obj.indexOf('--') >= 0) {
			return false;
		}
		return true;
	} else { 
		return false;
	}
};

export function isWord(word) {
	var pattern = /^[a-zA-Z0-9_]+$/;   
	return pattern.test(word);
};

export function isEmail(email) {
	var pattern = /^[a-zA-Z0-9][a-zA-Z0-9_=\&\-\.\+]*[a-zA-Z0-9]*@[a-zA-Z0-9][a-zA-Z0-9_\-\.]+[a-zA-Z0-9]$/;
	return pattern.test(email);
};

export function isEmailDomain(email) {
	var pattern = /^[a-zA-Z0-9][a-zA-Z0-9_\-]*\.[a-zA-Z0-9\-][a-zA-Z0-9_\-\.]*[a-zA-Z0-9]$/;
	return pattern.test(email);
};

// 校验手机号（针对大陆手机 11位号码，新增对16和19开头的校验）
export function isMobile(mobile) {
	var pattern = /^1[3456789]\d{9}$/;
	return pattern.test(mobile);
};

export function isPhone(phone) {
	var pattern1 = /^([^\d])+([^\d])*([^\d])$/;
	var pattern2 = /^([\d\+\s\(\)-])+([\d\+\s\(\)-])*([\d\+\s\(\)-])$/;
	//var p1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	if (pattern1.test(phone)) {
		return false;
	}
	return pattern2.test(phone);
};

// 校验手机号（海内外）
export function isNationMobile(mobile) {
	var pattern = /^\d{7,11}$/;
	return pattern.test(mobile);
};

//验证身份证号码
export function isCardNo(card) {
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	return pattern.test(card);
};

//supAbsuRoot   是否支持绝对路径
export function isUrl(str_url, supAbsuRoot) {
	if (typeof supAbsuRoot == 'undefined') {
		supAbsuRoot = true;
	}
	if (supAbsuRoot && str_url.length >= 1 && str_url.charAt(0) == '/') {
		return true;
	}
	if (supAbsuRoot && str_url.length >= 1 && str_url.charAt(0) == '#') {
		return true;
	}

	var re = /^(\w+:).+/;
	var result = re.test(str_url);	
	return result;
};