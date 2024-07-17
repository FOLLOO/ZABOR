import {IUserLogin} from "../interfaces/interfaces";
import {axiosClassic, axiosWithAuth} from "../r-axios/axios";
import {saveTokenStorage, removeFromStorage} from './AuthServices';

class UserService {
  async login(email, password) {
    try {
      const user = IUserLogin(email, password)
      const {data} = await axiosClassic.post(`/auth/login`, user)
      axiosWithAuth.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      return data
    } catch (e) {
      return e
    }
  }

  async createNewUser(user) {
    try {
      const {data} = await axiosClassic.post(`/auth/registration`, user)
        .catch(error => {
        throw error.response.data
      })
      return data
    } catch (e) {
      throw Error(e)
    }
  }

  async getNewTokens() {
    const response = await axiosClassic.post('/auth/login/access-token')
    // const response = await axiosClassic("/user/login/access-token", {
    //   method: "post",
    //   withCredentials: true
    // })
    if (response.data.token) {
      axiosWithAuth.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      saveTokenStorage(response.data.token)
    }
    return response
  }

  async logout() {
    const response = await axiosClassic.post('/auth/logout')
    if (response.data)
      removeFromStorage();
    return response;
  }
}

export default new UserService()