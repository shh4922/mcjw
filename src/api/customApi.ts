import axios from "axios";
import {API} from "./config"

const customAxios = axios.create({
    baseURL: API.BASE_URL,
    timeout: 5000,
})

customAxios.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem("accessToken")
        
        config.headers["Content-Type"] = "application/json"
        config.headers["Authorization"] = `Bearer ${access}`
        config.withCredentials = true
        
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

customAxios.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        switch (error?.response?.status) {
            case 401:
                try {
                    const result = await axios.get(`${API.BASE_URL}${API.REFRESH_TOKEN}`, {
                        withCredentials: true
                    })
                    localStorage.setItem("accessToken", result.data.accessToken)

                    error.config.headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    };
                    
                    return axios.request(error.config);

                } catch (error) {
                    alert("세션이 만료되었습니다.")
                    return Promise.reject("402")
                }
            case 403:
                alert("유저정보기 없습니다.")
                return Promise.reject(error)
            case 404:
                console.error("url정보없음")
                return Promise.reject(404)
            case 500:
                alert("500:서버로부터 에러가 발생했습니다.")
                return Promise.reject(500)
            default:
                alert(error)
                return Promise.reject(error)
        }
    }
);

export {customAxios} 