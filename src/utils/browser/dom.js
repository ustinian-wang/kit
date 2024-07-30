/**
 * @description 创建节点并且插入body下
 * @param {string} tagName node tag name
 * @return {HTMLElement}
 */
export function createNodeInDocumentBody(tagName = 'div') {
    let dom = document.createElement(tagName);
    let nowFloat = performance.now();
    dom.id = 'MM' + parseInt(nowFloat.toFixed(11).replace('.', ''));
    document.body.appendChild(dom);
    return dom;
}

/**
 * @description 创建一个vue实例并且插入到body里面
 * @param {object} component
 * @param {object} options
 * @return {VNode}
 */
export function renderVueComponentInDocumentBody(component, options) {
    let dom = createNodeInDocumentBody();
    return new global.Vue({
        el: `#${dom.id}`,
        store: window.$store,
        render(h) {
            return h(component, options);
        },
    });
}

/**
 * 异步挂载地图
 * @param {function} callback
 */
export function asyncLoadQQMapScript() {
    const id = 'qqMapScript';
    if (document.getElementById(id)) {
        console.log('已经引入腾讯地图脚本');
        return;
    }

    // 加载腾讯地图
    let script = document.createElement('script');
    const qqMapKey = window.$store.getters['commData/getQQMapKey'];
    script.type = 'text/javascript';
    script.id = id;
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${qqMapKey}&callback=Fai.updateLoadMap`;
    document.body.appendChild(script);

    // 引入封装好的JS模块，调起前端定位组件，通过封装好的接口获取位置信息。
    // 说明文案： https://lbs.qq.com/webApi/component/componentGuide/componentGeolocation
    let geoLocationScript = document.createElement('script');
    geoLocationScript.src =
        'https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js';
    geoLocationScript.id = 'geoLocationScript';
    document.body.appendChild(geoLocationScript);
}

/**
 * @description 用css选择符设置到node上
 * @param {HTMLElement} dom
 * @param {string} selector
 * @returns {undefined}
 */
export function setSelectorOfDOM(dom, selector) {
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
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    } else {
        element['on' + eventName] = eventHandler;
    }
}

/**
 * @description remove node from container
 * @param {HTMLElement} container
 * @param {HTMLElement} node
 */
export function removeNode(container, node) {
    if (!container) {
        container = document.body;
    }

    if (node && container.contains(node)) {
        container.removeChild(node);
    }
}
