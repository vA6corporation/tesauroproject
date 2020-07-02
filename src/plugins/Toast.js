import ToastComponent from './Toast.vue';

let vm = {};
const Toast = {
  install(Vue, options) {
    options = options || {};
    const ToastPlugin = Vue.extend(ToastComponent);
    vm = new ToastPlugin({
      data: { options },
    }).$mount();
    document.body.appendChild(vm.$el);
    Vue.prototype.$message = function(message) {
      vm.pushMessage(message);
    }
  }
}

export default Toast;