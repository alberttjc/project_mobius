import Vue from 'vue'
import App from './App.vue'
import titleMixin from './titleMixin'

Vue.config.productionTip = false
Vue.mixin(titleMixin)

// vue-simple-alert
import VueSimpleAlert from "vue-simple-alert"

import router from './router'
Vue.use(VueSimpleAlert)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
