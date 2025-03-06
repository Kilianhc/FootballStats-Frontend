import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "https://footballstats-back.onrender.com";

const teamService = {
  searchTeams: async (query) => {
    try {
      const token = localStorage.getItem("authToken");

      // Si no hay token, devuelve una lista vacía
      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para buscar equipos.");
        return [];
      }

      // Realiza la solicitud a la API
      const response = await axios.get(`${API_URL}/api/teams`, {
        params: { name: query }, // Parámetros de búsqueda
        headers: { Authorization: `Bearer ${token}` }, // Encabezado de autenticación
      });

      // Asegúrate de que response.data contenga la lista de equipos
      if (response.data && Array.isArray(response.data)) {
        return response.data; // Devuelve la lista de equipos
      } else {
        console.error("La respuesta de la API no contiene una lista de equipos válida.");
        return []; // Devuelve una lista vacía si la respuesta no es válida
      }
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.log("Usuario no autenticado. Inicia sesión para buscar equipos.");
            return [];
          case 404:
            console.log("No se encontraron equipos con ese nombre.");
            return [];
          case 500:
            console.error("Error interno del servidor. Inténtalo de nuevo más tarde.");
            return [];
          default:
            console.error("Error desconocido:", error.response.status);
            return [];
        }
      } else {
        console.error("Error de red o de conexión:", error.message);
        return [];
      }
    }
  },

  requestJoinTeam: (teamId) => {
    return axios.post(`${API_URL}/api/teams/${teamId}/request`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  },

  leaveTeam: () => {
    return axios.post(`${API_URL}/api/teams/leave`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
  },
};

export default teamService;
