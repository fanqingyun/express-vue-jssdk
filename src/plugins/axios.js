"use strict";

import Vue from 'vue';
import axios from "axios";
// 下载和上传的请求头设置
const downloadHeaders = {
  responseType: 'blob'
}
const uploadHeaders = {
  'Content-Type': 'multipart/form-data'
}

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 全局配置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'
// 实例配置信息
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
// 实例
const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 这里可以根据请求方式设置请求头headers
    console.log(config)
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// 默认的异常处理
const handleException = (e) => {
  console.log(e)
}
// 下载文件处理
const downloadFile = response => {
  if (!response || !response.headers.exportsuccess) {
    // if (!response.data.success) {
    //   this.$message({
    //     showClose: true,
    //     message: response.data.message,
    //     type: 'error'
    //   })
    // }
    // return
  }
  // 在response.data前面加\ufeff是为了表示编码格式为UTF-8，否则导出的文件中文会乱码
  let url = window.URL.createObjectURL(
    new Blob(['\ufeff' + response.data])
  )
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', decodeURIComponent(response.headers.exportfilename))
  link.click()
  window.URL.revokeObjectURL(url)
}
// // 封装请求的option 
// const getOption = () => {
//    let option = {
//     method,
//     url,
//     data: method === 'POST' || method === 'PUT' ? params : null,
//     params: method === 'GET' || method === 'DELETE' ? params : null
//   }
//   return option
// }
// 封装统一的方法
function httpApi (option, callback = handleException, errHandle = downloadFile) {
  _axios(option)
    .then(callback)
    .catch(errHandle)
}

// 在实例上添加方法
_axios.get = (url, params, callback, errHandle) => {
  return httpApi({ method: 'GET', url, params }, callback, errHandle)
}
_axios.post = (url, params, callback, errHandle) => {
  return httpApi({ method: 'POST', url, data: params }, callback, errHandle)
}
_axios.put = (url, params, callback, errHandle) => {
  return httpApi({ method: 'PUT', url, data: params }, callback, errHandle)
}
_axios.delete = (url, params, callback, errHandle) => {
  return httpApi({ method: 'DELETE', url, params }, callback, errHandle)
}
_axios.download = (url, params, callback, errHandle) => {
  return httpApi({ method: 'POST', url, data: params, headers: downloadHeaders }, callback, errHandle)
}
_axios.upload = (url, params, callback, errHandle) => {
  return httpApi({ method: 'POST', url, data: params, headers: uploadHeaders }, callback, errHandle)
}

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios;
      }
    },
    $axios: {
      get () {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
