import {useContext, createContext, useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import {useCookies} from "react-cookie";
import {axiosClassic} from "../r-axios/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false)

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  const lastPath = localStorage.getItem('lastPath') || null

  const [cookie, setCookie] = useCookies()



  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setToken(localStorage.getItem('token'));
    setCookie('token', localStorage.getItem('token'), { path: '/' })
    setIsAuth(true) //временное решение
  }, [])

  const loginAction = async (email, password) => {
    try {
      const response = await userService.login(email, password).then(res => res)
      if (response.token) {
        setUser(response.profile);
        localStorage.setItem('user', JSON.stringify(response.profile))
        // setToken(response.token);
        // console.log(token)
        // setCookie('token', response.token, { path: '/' })
        setIsAuth(true)
        return {path: lastPath ? lastPath : "/", token: response.token};
      } else {
        throw {error: response.response.data.message};
      }
    } catch (e) {
      return e;
    }
  };

  const registerAction = async (data) => {
    try {
      const res = await axiosClassic.post('/auth/registration', data);
      if (res.data) {
        const { token, profile } = res.data;
        setUser(profile);
        setIsAuth(true)
        localStorage.setItem('user', JSON.stringify(profile))
        localStorage.setItem('token', token);
        return ({message: 'Пользователь успешно зарегестировани', success: true});
      } else {
        return ({message: 'Пользователь с таким email или nickname уже существует!', success: false});
      }
    } catch (error) {
      return ({message: 'Произошла ошибка при регистрации', success: false});
    }
  }


  const logOut = async () => {
    const response = await userService.logout()
    if (response.status === 200) {
      setUser(null);
      setIsAuth(false)
      setToken("");
      navigate("/login");
    }
  };

  const updateUser = async(data) => {
    try{
      const response = await userService.updateUser(data)
        if (response) {
          setUser(response);
          localStorage.setItem('user', JSON.stringify(response))
        }
        throw new Error(response.message);
    }
    catch (e) {
      return e;
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuth, loginAction, logOut, updateUser, registerAction }} >
      {/*<Provider store={store}>*/}
      {children}
      {/*</Provider>*/}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};