/* // Vue自定义插件一定会暴露一个对象
let myPlugin = {};

myPlugin.install = function (Vue, options) {
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.component 全局组件
    // 全局指令
    Vue.directive(options.name, (element, params) => {
        // console.log(123, b);
        element.innerHTML = params.value.toLowerCase();
        console.log(params);
    })
}

export default myPlugin */