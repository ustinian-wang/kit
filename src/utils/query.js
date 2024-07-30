/**
 * @param {object} params
 * @return {string}
 */
export const searchParamsToQueryString = (params = {})=>{
    let searchParams = new URLSearchParams(params);
    return searchParams.toString();
}