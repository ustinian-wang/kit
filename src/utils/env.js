/**
 * @description get window
 * @returns {Window}
 */
export function getWindow(){
    if(typeof global !== "undefined"){
        return global.window;
    }else if(typeof window !== "undefined") {
        return window;
    }
}
