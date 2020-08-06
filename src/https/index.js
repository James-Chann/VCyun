import Axios from 'axios';
import router from '../router';
import { resolve } from 'url';

export default {
    getAjax(apiUrl, data) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "get",
                url: apiUrl,
                params: data
            }).then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    postAjax(apiUrl, data) {
        return new Promise((resolve, reject) => {
            Axios({
                method: "post",
                url: apiUrl,
                data: data
            }).then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
}

// http request 请求拦截器， 有token值则配置上token值
Axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem("token");
    config.headers.common["access-token"] = token;

    return config;
}, err => {
    console.log("request 超时了......");
})
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登录页重新获取token
Axios.interceptors.response.use(response => {
    if (response.data.code == 401) {
        router.push('/login');
    }
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: 'login',
                    query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
        }
    }
    return Promise.reject(error.response)
})