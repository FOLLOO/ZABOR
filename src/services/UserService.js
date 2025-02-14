import axios from "../r-axios/axios";

const userService = {
  login: async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (data) => {
    const response = await axios.post("/auth/registration", data);
    return response.data;
  },
  logout: async () => {
    return await axios.post("/auth/logout");
  },
  updateUser: async (data) => {
    const response = await axios.put("/user/updateUser", data);
    return response.data;
  },
};

export default userService;
