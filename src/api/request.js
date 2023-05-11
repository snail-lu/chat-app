/**
 * 封装的ajax函数
 */
import axios from 'axios'
export default function request(url, data={},type='GET'){
    if(type==="GET"){
        let paramStr = '';
        Object.keys(data).forEach(key=>{
            paramStr += key + '=' + data[key] + '&';         //尾部多了一个“&”
        })
        if(paramStr){
            paramStr = paramStr.substring(0,paramStr.length-1);
        }
        if(paramStr) {
            return axios.get(url+'?'+paramStr);
        } else {
            return axios.get(url)
        }
    }else{
        return axios.post(url,data);
    }
}