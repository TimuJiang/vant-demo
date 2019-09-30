import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import './components'
import store from './vuex/store'
import '@/api/interceptor'
import '@/api'
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
