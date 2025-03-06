import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

const authService = {
  signup(userData) {
    return axios.post(`${API_URL}/auth/signup`, userData);
  },

  login(credentials) {
    return axios.post(`${API_URL}/auth/login`, credentials);
  },

  verify() {
    const token = localStorage.getItem("authToken");
    return axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default authService;
