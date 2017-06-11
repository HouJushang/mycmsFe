/**
 * Created by hou on 2017/4/13.
 */
import main from './main.vue'
import login from './page/login.vue'
import welcome from './page/welcome.vue'
import addArticle from './page/article/add.vue'
import article from './page/article/index.vue'
import noIsure from './page/article/noIsure.vue'
import spriderAtricle from './page/sprider/index.vue'
import category from './page/category/index.vue'
import addCategory from './page/category/add.vue'

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
      {path: 'addarticle', component: addArticle, name: 'addArticle'},
      {path: 'article', component: article, name: 'article'},
      {path: 'noisure', component: noIsure, name: 'noisure'},
      {path: 'category', component: category, name: 'category'},
      {path: 'addcategory', component: addCategory, name: 'addCategory'},
      {path: 'sprideratricle', component: spriderAtricle, name: 'spriderAtricle'}
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
