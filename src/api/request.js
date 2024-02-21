import axios from 'axios'
import { Toast } from 'antd-mobile'
// 创建axios实例
const instance = axios.create({
    timeout: 5000,
    baseURL: ''
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        const {data: resData} = res

        const {code, message} = resData
        if (code && code !== 200) {
            Toast.show({
                icon: 'fail',
                content: `${message || '网络错误'}`,
            })
            return Promise.reject(resData)
        } else {
            return resData
        }
    },
    (error) => {
        let message = '请求失败'
        if(error){
            const {response} = error
            if(response.status >= 400 && response.status < 500){
                message = '资源不存在，请稍后重试'
            }else if(response.status >= 500){
                message = '服务异常，请稍后重试'
            }
            if(response.data.message === 'Network Error'){
                message = '网络异常，请稍后重试'
            }
        }
        // 错误提示
        Toast.show({
            icon: 'fail',
            content: message,
        })
        return Promise.reject(error)
    }
)

export default instance
// export default function request(url, data={},type='GET'){
//     if(type==="GET"){
//         let paramStr = '';
//         Object.keys(data).forEach(key=>{
//             paramStr += key + '=' + data[key] + '&';         //尾部多了一个“&”
//         })
//         if(paramStr){
//             paramStr = paramStr.substring(0,paramStr.length-1);
//         }
//         if(paramStr) {
//             return axios.get(url+'?'+paramStr);
//         } else {
//             return axios.get(url)
//         }
//     }else{
//         return axios.post(url,data);
//     }
// }