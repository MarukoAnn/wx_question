import Vue from 'vue'
import App from './App'
// import './css/resetvant.less'
// Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
