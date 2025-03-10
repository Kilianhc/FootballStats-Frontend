import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "https://footballstats-back.onrender.com";

const playerService = {
  // Crear un nuevo jugador
  createPlayer: async (playerData) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para crear un jugador.");
        return null;
      }

      console.log("Datos enviados al backend:", JSON.stringify(playerData, null, 2)); // Verificar la estructura antes de enviarla
      const response = await axios.post(`${API_URL}/api/players`, playerData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al crear el jugador:", error);
      return null;
    }
  },

  // Obtener todos los jugadores del equipo del usuario autenticado
  getPlayers: async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para ver los jugadores.");
        return [];
      }

      const response = await axios.get(`${API_URL}/api/players`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("La respuesta de la API no contiene una lista de jugadores válida.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los jugadores:", error);
      return [];
    }
  },

  // Obtener un jugador por ID
  getPlayerById: async (playerId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para ver el jugador.");
        return null;
      }

      const response = await axios.get(`${API_URL}/api/players/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener el jugador:", error);
      return null;
    }
  },

  // Modificar un jugador
  updatePlayer: async (playerId, playerData) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para modificar el jugador.");
        return null;
      }

      const response = await axios.put(`${API_URL}/api/players/${playerId}`, playerData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al modificar el jugador:", error);
      return null;
    }
  },

  // Eliminar un jugador
  deletePlayer: async (playerId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para eliminar el jugador.");
        return null;
      }

      const response = await axios.delete(`${API_URL}/api/players/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al eliminar el jugador:", error);
      return null;
    }
  },
};

export default playerService;