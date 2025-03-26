import { Grid2 } from "@mui/material";
import PlayerCard from "./PlayerCard";

const PlayerList = ({ players, user, onDelete }) => {
  return (
    <Grid2 container spacing={3} justifyContent="center">
      {players.map((player) => (
        <Grid2 item xs={12} sm={6} md={3} key={player._id}>
          <PlayerCard player={player} user={user} onDelete={onDelete} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PlayerList;
