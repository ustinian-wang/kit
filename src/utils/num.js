/**
 * @description get width by Proportion
 * @param {number} proportion
 * @param {number} refHeight
 * @returns {number}
 */
export const getWidthByProportion = (proportion, refHeight) => {
    return refHeight * proportion;
};
/**
 * @description get height by Proportion
 * @param {number} proportion
 * @param {number} refWidth
 * @returns {number}
 */
export const getHeightByProportion = (proportion, refWidth) => {
    return refWidth / proportion;
};
