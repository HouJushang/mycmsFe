/**
 * Created by hou on 2017/4/13.
 */
import Vue from 'vue'
import config from '../config'
import NProgress from 'nprogress'
import { Notification } from 'element-ui'

function request (type, data) {
  NProgress.start()
  let requestUrl = config.baseUrl + data.url
  let requestParam = {
    timeout: 4 * 1000,
    headers: {
      token: sessionStorage.getItem('token') || ''
    }
  }
  if (type === 'get') {
    requestParam.params = data.data || {}
  }
  if (type === 'delete') {
    requestParam.body = data.data || {}
  }
  return new Promise((resolve, reject) => {
    if (type === 'get' || type === 'delete') {
      Vue.http[type](requestUrl, requestParam)
        .then(response => {
          let responseData = response.body
          if (responseData.code === 0) {
            resolve(responseData.data)
          } else {
            reject(responseData.message)
          }
          NProgress.done()
        }, error => {
          Notification.error({
            title: `错误`,
            message: error.body.message,
            duration: 3000
          })
          NProgress.done()
        })
    }
    if (type === 'post' || type === 'put') {
      Vue.http[type](
        config.baseUrl + data.url,
        data.data || {},
        {
          headers: {
            token: sessionStorage.getItem('token') || ''
          }
        }).then(response => {
          let responseData = response.body
          if (responseData.code === 0) {
            resolve(responseData.data)
          } else {
            Notification.error({
              title: `错误`,
              message: responseData.message,
              duration: 3000
            })
          }
          NProgress.done()
          reject(responseData.message)
        }, error => {
          Notification.error({
            title: `错误`,
            message: error.body.message,
            duration: 3000
          })
          NProgress.done()
        })
    }
  })
}
function getRequest (data) {
  return request('get', data)
}
function deleteRequest (data) {
  return request('delete', data)
}
function putRequest (data) {
  return request('put', data)
}
function postRequest (data) {
  return request('post', data)
}

export {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest
}
