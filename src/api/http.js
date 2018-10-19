import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';
axios.defaults.timeout = 10000;

//http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': token ?'JWT '+token:null,
        };
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log(response);
        return response;
    },
    error => {
        console.log("+++++++++");
        console.log(error.response);
        console.log(error);
        if(error.response){
            if(error.response.status == 401){
                Message.error('登录信息已失效，请重新登录');
                router.push({
                    path:"/login"
                });
            }else if(error.response.status == 404){
                Message.error('请求资源不存在')
            }
        }if(!error.response){
            Message.error('请求失败');
        }
        return Promise.reject(error)
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
                params:params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
