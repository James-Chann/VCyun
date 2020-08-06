import Vue from 'vue'
import Router from 'vue-router'
import ICDModel from 'pages/ICD-model'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ICDModel',
      component: ICDModel
    }
  ]
})
