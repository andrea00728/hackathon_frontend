import React from 'react';
import axios from 'axios';

const axiosClient=axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}`
})

axiosCLient.interceptors.request.use((config)=>{
    const token=sessionStorage.getItem("ACCESS_TOKEN")
    config.headers.Authorization=`Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    const{response}=error;
    if(response.status===401){
        sessionStorage.removeItem("ACCESS_TOKEN");
    }

    throw error;
});

export default axiosCLient;
