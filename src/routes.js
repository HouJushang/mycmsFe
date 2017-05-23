/**
 * Created by hou on 2017/4/13.
 */
import main from './main.vue'
import login from './page/login.vue'
import welcome from './page/welcome.vue'
import smssend from './page/sms/smssend.vue'
import smsips from './page/sms/smsips.vue'
import smstemp from './page/sms/smstemp.vue'
import smssys from './page/sms/smssys.vue'
import showoplogs from './page/oplog/operlog.vue'

import cfzinfo from './page/cfz/cfzinfo.vue'

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
      {path: 'smslog', component: smssend, name: 'smslog'},
      {path: 'smsips', component: smsips, name: 'smsips'},
      {path: 'smstemp', component: smstemp, name: 'smstemp'},
      {path: 'smssys', component: smssys, name: 'smssys'},
      {path: 'cfzinfo', component: cfzinfo, name: 'cfzinfo'},
      {path: 'showoplogs', component: showoplogs, name: 'showoplogs'}
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
