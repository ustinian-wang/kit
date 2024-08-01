

/**
 * @description px转换为rpx
 * @param {number} value
 * @param {number} pageWidthPx
 * @return {number}
 */
export function pxToRpx(value, pageWidthPx) {
    let oneRpx = 750 / pageWidthPx;
    return value * oneRpx;
}

export function noop() {}

