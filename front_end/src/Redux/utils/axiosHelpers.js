import axios from 'axios';
import config from '../../config/default.json';


export const axios_instance=axios.create({
    baseURL:config.APIurl,
    headers:{
        Authorization:`Bearer ${localStorage.getItem("access_token")}`
    }
});


axios.interceptors.response.use(
    (response)=>new Promise((resolve,reject)=>{
        resolve(response);
    }),
    (error)=>{
        if(!error.response){
            return new Promise((response,reject)=>{
                reject(error);
            });
        }
        if(error.response.status===401){
            localStorage.removeItem("access_token");
            window.location.href="/login";
        }
    }
);

