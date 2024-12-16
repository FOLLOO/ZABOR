import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const lastPath = localStorage.getItem("lastPath") || null;

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setToken(savedToken);
      setIsAuth(true);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } else {
      setIsAuth(false);
      setUser(null);
    }
  }, []);

  const loginAction = async (email, password) => {
    try {
      const response = await userService.login(email, password);
      if (response.token) {
        const { token, profile } = response;
        setToken(token);
        setUser(profile);
        setIsAuth(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(profile));
        return { path: lastPath || "/", token };
      } else {
        throw new Error(response.message || "Ошибка авторизации");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message || "Ошибка авторизации" };
    }
  };

  const registerAction = async (data) => {
    try {
      const response = await userService.register(data);
      if (response.token) {
        const { token, profile } = response;
        setToken(token);
        setUser(profile);
        setIsAuth(true);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(profile));
        return { message: "Пользователь успешно зарегистрирован", success: true };
      } else {
        return { message: response.message || "Ошибка регистрации", success: false };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { message: "Ошибка регистрации", success: false };
    }
  };

  const logOut = async () => {
    const response = await userService.logout()
    if (response.status === 200) {
      setToken("");
      setUser(null);
      setIsAuth(false);
      localStorage.clear();
      navigate("/login");
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await userService.updateUser(data);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
      }
      return { success: true, response };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: error.message || "Ошибка обновления данных" };
    }
  };

  return (
      <AuthContext.Provider value={{ token, user, isAuth, loginAction, logOut, updateUser, registerAction }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
