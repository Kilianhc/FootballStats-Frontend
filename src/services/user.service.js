import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "https://footballstats-back.onrender.com";

class UserService {
  // Obtener datos del usuario autenticado
  getProfile() {
    return axios.get(`${API_URL}/api/users/profile`, {
      headers: this.authHeader(),
    });
  }

  // Actualizar perfil del usuario
  updateProfile(userData) {
    return axios.put(`${API_URL}/api/users/profile`, userData, {
      headers: this.authHeader(),
    });
  }

  // Eliminar cuenta del usuario
  deleteAccount() {
    return axios.delete(`${API_URL}/api/users/profile`, {
      headers: this.authHeader(),
    });
  }

  // Generar encabezado con token de autenticación
  authHeader() {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

const userService = new UserService();
export default userService;
