import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element)
import antDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(antDesign);

import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
HTMLElement.prototype.$empty = function () {
  this.innerHTML = ''
  return this
}
window.ELEMENT = Element
window.Vue = Vue
new Vue({
  render: h => h(App),
}).$mount('#app')
