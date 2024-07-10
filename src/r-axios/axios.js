import axios from "axios";

const instance = axios.create({
  // baseURL: 'https://192.168.1.121:5000',
  baseURL: 'https://official-joke-api.appspot.com'
});

// axios.defaults.headers.common["Authorization"] = window.localStorage.getItem('token');

export default instance;