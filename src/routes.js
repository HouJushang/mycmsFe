/**
 * Created by hou on 2017/4/13.
 */
import main from './main.vue'
import login from './page/login.vue'
import welcome from './page/welcome.vue'
import model from './page/model/index.vue'
import addModel from './page/model/add.vue'
import NotFound from './404.vue'
let routes = [
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/',
    component: login,
    name: 'login'
  },
  {
    path: '/main',
    component: main,
    children: [
      {path: 'welcome', component: welcome, name: 'welcome'},
      {path: 'model', component: model, name: 'model'},
      {path: 'addmodel', component: addModel, name: 'addModel'}

    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
]
export default routes
