/**
 * @Created by: Chenjh
 * @Date: 2018/10/14
 * @Project: tdms
 */
// 配置API接口地址
var root = process.env.API_ROOT
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */

function apiAxios (method, url, params, token, success, failure, errorMethod) {
  if (params) {
    params = filterNull(params)
  }
  console.log("调用  ------")
  axios({
    method: method,
    url: url,
    //url: 'http://127.0.0.1:8000/login/',
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? token:null,
    },
    withCredentials: false
  })
    .then(function (res) {

      if (res.status === 200) {
        if (success) {

          success(res.data)
        }
      } else {
        if (failure) {
          failure(res.data)
        } else {
          window.alert('error: ' + JSON.stringify(res.data))
        }
      }
    })
    .catch(function (error) {
      console.log('--------------')

      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(errorMethod)
        if (errorMethod){
          errorMethod(error.response)
        }else {
          window.alert(error.response.status)
        }
      } else {
        // Something happened in setting up the request that triggered an Error

        window.alert(error.message)
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, token, success, failure, errorMethod) {
    return apiAxios('GET', url, params, token, success, failure, errorMethod)
  },
  post: function (url, params, token, success, failure, errorMethod) {
    return apiAxios('POST', url, params, token, success, failure, errorMethod)
  },
  put: function (url, params, token, success, failure, errorMethod) {
    return apiAxios('PUT', url, params, token, success, failure, errorMethod)
  },
  delete: function (url, params, token, success, failure, errorMethod) {
    return apiAxios('DELETE', url, params, token, success, failure, errorMethod)
  }
}
