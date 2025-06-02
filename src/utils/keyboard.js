import {isIE} from "./ua.js";

export function isEnterKey(e) {
	if (isIE()) {   
		if (event.keyCode == 13) {   
			return true;   
		} else {   
			return false;   
		}   
	} else {   
		if (e.which == 13) {   
			return true;   
		} else {   
			return false;   
		}   
	}   
};

export function isNumberKey(e, iSminus) {//按下数字键则返回true,用法：<input type="text" onkeypress="javascript:return export isNumberKey(event);"/>
	if (isIE()) {
		if (iSminus && event.keyCode == 45) {
			return true; 
		}
		if (((event.keyCode > 47) && (event.keyCode < 58)) ||   
			(event.keyCode == 8)) {   
			return true;   
		} else {   
			return false;   
		}   
	} else {
		if (iSminus && e.which == 45) {
			return true; 
		}
		if (((e.which > 47) && (e.which < 58)) ||   
			(e.which == 8)) {   
			return true;   
		} else {   
			return false;   
		}   
	} 
};

//按下数字键则返回true,用法：<input type="text" onkeypress="javascript:return export isNumberKey(event);"/>
//在isNumberKey函数下增加一个","逗号键入，兼容直拨分机号
export function isPhoneNumberKey(e, iSminus) {
	if (isIE()) {
		if (iSminus && event.keyCode == 45) {
			return true; 
		}   
		if (((event.keyCode > 47) && (event.keyCode < 58)) ||   
              (event.keyCode == 8) || (event.keyCode == 44)) {   
			return true;   
		} else {   
			return false;   
		}   
	} else {
		if (iSminus && e.which == 45) {
			return true; 
		}
		if (((e.which > 47) && (e.which < 58)) ||   
              (e.which == 8) || (e.which == 44)) {   
			return true;   
		} else {   
			return false;   
		}   
	} 
};

//控制只能输入小数点后两位
export function checkTwoDecimal(e, id) {
	var val = $('#' + id).val();
	var reg = /^[0-9]\d*(?:\.\d{1,2}|\d*)$/;
	var keyVal;
	if (isIE()) {
		if (event.keyCode > 47 && event.keyCode < 58) {
			keyVal = String.fromCharCode(e.which);  
			val = val + '' + keyVal;
			return reg.test(val);
		}
		
	} else {
		if (e.which > 47 && e.which < 58) {
			keyVal = String.fromCharCode(e.which);  
			val = val + '' + keyVal;
			return reg.test(val);
		}
		
	} 
};

//控制只能输入小数点后一位
export function checkOneDecimal(e, id) {
	var val = $('#' + id).val();
	var reg = /^[0-9]\d*(?:\.\d{1}|\d*)$/;
	var keyVal;
	if (isIE()) {
		if (event.keyCode > 47 && event.keyCode < 58) {
			keyVal = String.fromCharCode(e.which);  
			val = val + '' + keyVal;
			return reg.test(val);
		}
		
	} else {
		if (e.which > 47 && e.which < 58) {
			keyVal = String.fromCharCode(e.which);  
			val = val + '' + keyVal;
			return reg.test(val);
		}
		
	} 
};


export function isFloatKey(e) {//按下数字键和小数点则返回true,用法：<input type="text" onkeypress="javascript:return export isFloatKey(event);"/>
	if (isIE()) {   
		if (((event.keyCode > 47) && (event.keyCode < 58)) ||   
              (event.keyCode == 8) || (event.keyCode == 46)) {   
			return true;   
		} else {   
			return false;   
		}   
	} else {   
		if (((e.which > 47) && (e.which < 58)) ||   
              (e.which == 8) || (e.which == 46)) {   
			return true;   
		} else {   
			return false;   
		}   
	}   
};