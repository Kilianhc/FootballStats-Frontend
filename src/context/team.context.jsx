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
          // Si ya tienes los jugadores en el localStorage, los cargamos desde allí
          const storedPlayers = JSON.parse(localStorage.getItem(`players_${team._id}`));

          if (storedPlayers) {
            setPlayers(storedPlayers);
          } else {
            // Si no hay jugadores en localStorage, los traemos de la API
            const playersData = await playerService.getPlayers();
            setPlayers(playersData);
            localStorage.setItem(`players_${team._id}`, JSON.stringify(playersData)); // Guardamos en localStorage
          }
        } catch (error) {
          console.error("Error al obtener los jugadores:", error);
        }
      };

      fetchPlayers();
    }
  }, [team]); // Solo ejecutar cuando el equipo cambia

  return (
    <TeamContext.Provider value={{ team, setTeam, players, setPlayers }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
