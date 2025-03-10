import { createContext, useContext, useState, useEffect } from "react";
import playerService from "../services/player.service"; // Asumiendo que tienes un servicio de jugadores

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Verificamos si hay un equipo ya seleccionado en el contexto (puedes setearlo de alguna manera)
    if (team) {
      const fetchPlayers = async () => {
        try {
          // Solicitamos los jugadores directamente desde la API basándonos en el `team._id`
          const playersData = await playerService.getPlayers(team._id);
          setPlayers(playersData); // Asignamos los jugadores obtenidos de la API
        } catch (error) {
          console.error("Error al obtener los jugadores:", error);
        }
      };

      fetchPlayers();
    } else {
      setPlayers([]); // Si no hay equipo, limpiamos la lista de jugadores
    }
  }, [team]); // Solo ejecutar cuando el equipo cambia

  return (
    <TeamContext.Provider value={{ team, setTeam, players, setPlayers }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
