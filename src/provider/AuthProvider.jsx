import {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import { Provider } from 'react-redux'
import store from '../redux/store'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const lastPath = localStorage.getItem('lastPath') || null
  const refreshAction = async () => {
    try {
      const response = await userService.getNewTokens().then(res => res.data)
      if (response) {
        setUser(response.profile);
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
    refreshAction()
    return () => refreshAction()
  }, [])

  const loginAction = async (email, password) => {
    try {
      const response = await userService.login(email, password).then(res => res)
      if (response.token) {
        setUser(response.profile);
        setToken(response.token);
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

  return (
    <AuthContext.Provider value={{ token, user, isAuth, loginAction, logOut }} >
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