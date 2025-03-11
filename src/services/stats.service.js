import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "https://footballstats-back.onrender.com";

const statsService = {
  // Crear nuevas estadísticas (solo Analysts pueden hacerlo)
  createStat: async (playerId, statData) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para crear las estadísticas.");
        return null;
      }

      console.log("Datos enviados al backend:", JSON.stringify(statData, null, 2)); // Verificar la estructura antes de enviarla
      const response = await axios.post(
        `${API_URL}/api/stats`,
        { player: playerId, ...statData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al crear las estadísticas:", error);
      return null;
    }
  },

  // Obtener estadísticas del jugador específico
  getStats: async (playerId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para ver las estadísticas.");
        return null;
      }

      const response = await axios.get(`${API_URL}/api/stats/player/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener las estadísticas del jugador:", error);
      return null;
    }
  },

  // Actualizar estadísticas del jugador específico (solo Analysts pueden hacerlo)
  updateStat: async (playerId, newStats) => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para modificar las estadísticas.");
        return null;
      }
  
      const response = await axios.put(
        `${API_URL}/api/stats/player/${playerId}`,
        newStats,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al actualizar las estadísticas:", error);
      return null;
    }
  },
  

  // Eliminar estadísticas del jugador específico (solo Analysts pueden hacerlo)
  deleteStat: async (statId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para eliminar las estadísticas.");
        return null;
      }

      const response = await axios.delete(`${API_URL}/api/stats/${statId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al eliminar las estadísticas:", error);
      return null;
    }
  },

  // Obtener estadísticas de todos los jugadores de un equipo (solo Coaches pueden hacerlo)
  getTeamStats: async (teamId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para ver las estadísticas del equipo.");
        return [];
      }

      const response = await axios.get(`${API_URL}/api/stats/team/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener las estadísticas del equipo:", error);
      return [];
    }
  },

  // Obtener estadísticas de los jugadores de un equipo según la posición (solo Coaches pueden hacerlo)
  getTeamStatsByPosition: async (teamId, position) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No se encontró el token de autenticación. Inicia sesión para ver las estadísticas por posición.");
        return [];
      }

      const response = await axios.get(`${API_URL}/api/stats/team/${teamId}/position/${position}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error al obtener las estadísticas por posición del equipo:", error);
      return [];
    }
  },
};

export default statsService;
