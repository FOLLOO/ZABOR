// import axios from "axios";
// import { Cookies } from 'react-cookie'
//
// const token = window.localStorage.getItem("token");
//
// const instance = axios.create({
//   baseURL: 'http://192.168.1.121:5000/api/',
//   // baseURL: 'https://official-joke-api.appspot.com'
//   headers: {
//     Authorization: `Bearer ${token}` // Устанавливаем заголовок Authorization с токеном
//   }
// });
//
//
//
//
// export default instance;


import axios from "axios" ;
import {getAccessToken, removeFromStorage} from "../services/AuthServices";
import userService from "../services/UserService";
const token = localStorage.getItem("token");

// console.log(token)
const options = {
  // baseURL: 'http://192.168.1.121:5000/api',
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`, // Устанавливаем заголовок Authorization с токеном
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()
  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

const errorCatch = (error) => {
  const message = error?.response?.data?.message
  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

axiosWithAuth.interceptors.response.use(config => config, async error => {
  const originalRequest = error.config;
  console.log(errorCatch(error))
  if((error?.response?.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') && error.config && !error.config._isRetry){
    originalRequest._isRetry = true
    try {
      await userService.getNewTokens()
      return axiosWithAuth.request(originalRequest)
    }
    catch (error) {
      if (errorCatch(error) === 'jwt expired') removeFromStorage();
    }
  }
  throw error
})

export {axiosClassic, axiosWithAuth}