/**
 * @description convert color format to hex like "#105450"
 * @param {string} rgb '#000000', rgba(255,255,255,1) and rgb(255,255,255)'. the alpha will be ignored
 * @returns {string|*}
 */
import {isString} from "./typer.js";

/**
 * @description color string to hex like #000000, rgb(255,255,255) and rgba(255,255,255,0)
 * @param {string} rgb
 * @returns {string}
 */
export function colorToHex(rgb) {
    if(!isString(rgb)){
        return "#000000";
    }
    if (rgb.startsWith("#")) {
        return rgb;
    }
    let arr = rgb.replace("(").replace(")").split(",")
    return rgbStr2hex(arr[0], arr[1], arr[2]);
}

/**
 * @description rgb to hex string
 * @param {number|string} red
 * @param {number|string} green
 * @param {number|string} blue
 * @returns {string}
 */
export function rgbStr2hex(red, green, blue) {
    return '#' + [red, green, blue].map(value=>parseInt(value || '0').toString(16))
}