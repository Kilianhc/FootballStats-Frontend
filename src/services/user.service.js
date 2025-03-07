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
  updateProfile(userData, userId) {
    return axios.put(`${API_URL}/api/users/${userId}`, userData, {
      headers: this.authHeader(),
    });
  }

  // Eliminar cuenta del usuario
  deleteAccount(userId) {
    return axios.delete(`${API_URL}/api/users/${userId}`, {
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
