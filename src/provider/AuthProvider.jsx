import {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import {useCookies} from "react-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const lastPath = localStorage.getItem('lastPath') || null
  const [cookie, setCookie] = useCookies()
  const refreshAction = async () => {
    try {
      const response = await userService.getNewTokens().then(res => res.data)
      if (response) {
        // setUser(response.profile);
        setToken(response.token);
        setIsAuth(true)
        return navigate(lastPath ? lastPath : "/");
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setToken(localStorage.getItem('token'));
    setCookie('token', localStorage.getItem('token'), { path: '/' })
    setIsAuth(true) //временное решение
    // refreshAction()
    // return () => refreshAction()
  }, [])

  const loginAction = async (email, password) => {
    try {
      const response = await userService.login(email, password).then(res => res)
      if (response.token) {
        setUser(response.profile);
        localStorage.setItem('user', JSON.stringify(response.profile))
        setToken(response.token);
        setCookie('token', response.token, { path: '/' })
        setIsAuth(true)
        return {path: lastPath ? lastPath : "/", token: response.token, email: response.email};
      } else {
        throw {error: response.response.data.message};
      }
    } catch (e) {
      return e;
    }
  };


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

    const response = await userService.updateUser(data).then(res => res)
    if (response.status === 200) {
      setUser(response.profile);
    }
    throw new Error(response.message);
    }
    catch (e) {
      return e;
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuth, loginAction, logOut, updateUser }} >
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