import { isString } from "./index.js";

window.addEventListener('DOMContentLoaded', (e) => {
    let button = document.getElementById('button');
    button.addEventListener('click', (e) => {
        console.log('button clicked', e);
        console.log("kit-lib", isString("123"));
    });
});
