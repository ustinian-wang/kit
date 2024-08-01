/**
 * @description 创建节点并且插入body下
 * @param {string} tagName node tag name
 * @return {HTMLElement}
 */
import {getWindow} from "../env.js";
import {isObject, isString} from "../typer.js";

/**
 * @description create Node and insert it into body
 * @param {string} [tagName='div]
 * @returns {HTMLDivElement}
 */
export function createNodeInDocumentBody(tagName = 'div') {
    let window = getWindow();
    if(window && document){
        let dom = document.createElement(tagName);
        let nowFloat = performance.now();
        dom.id = 'MM' + parseInt(nowFloat.toFixed(11).replace('.', ''));
        document.body.appendChild(dom);
        return dom;
    }
}

/**
 * @description 创建一个vue实例并且插入到body里面
 * @param {object} component
 * @param {object} options
 * @return {VNode|undefined}
 */
export function renderVueComponentInDocumentBody(component, options) {
    let dom = createNodeInDocumentBody();
    if(dom){
        return new global.Vue({
            el: `#${dom.id}`,
            store: window.$store,
            render(h) {
                return h(component, options);
            },
        });
    }
}

/**
 * @description 用css选择符设置到node上
 * @param {HTMLElement} dom
 * @param {string} selector
 * @returns {undefined}
 */
export function setSelectorOfDOM(dom, selector) {
    if(!isObject(dom) || !isString(selector)){
        return;
    }
    if(!getWindow()){
        return;
    }
    selector = selector.trim();
    if (selector.startsWith('#')) {
        dom.id = selector.substring(1);
    } else if (selector.startsWith('.')) {
        let list = selector.split('.').filter(item => !item.includes(' '));
        dom.classList.add(...list);
    }
}

/**
 * @description bind native event
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {function} eventHandler
 * @returns {undefined}
 */
export function bindNativeEvent(element, eventName, eventHandler) {
    if(element){
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        } else {
            element['on' + eventName] = eventHandler;
        }
    }
}

/**
 * @description remove node from container
 * @param {HTMLElement} container
 * @param {HTMLElement} node
 */
export function removeNode(container, node) {
    let window = getWindow();
    if (!container) {
        container = window?.document?.body;
    }

    if (node && container.contains(node)) {
        container.removeChild(node);
    }
}
