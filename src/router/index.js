import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import detail from '@/page/detail';
import addDetail from '@/page/addDetail';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [{
    path: "/detail/:id",
    name: "detail",
    props: true,
    component: detail
  }, {
    path: "/addDetail",
    name: "addDetail",
    props: true,
    component: addDetail
  }]
})

export default router;