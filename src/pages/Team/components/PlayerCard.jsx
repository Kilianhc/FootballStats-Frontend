import { Card, CardContent, Typography, Button } from "@mui/material";

const PlayerCard = ({ player, user, onDelete }) => {
  return (
    <Card
      sx={{padding: 0, textAlign: "center", boxShadow: 10, borderRadius: 5, background: "rgba(0, 255, 255, 0.7)",
        backdropFilter: "blur(8px)", height: "100%", width: "200px", display: "flex",
        flexDirection: "column", justifyContent: "space-between", transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 20 }}}>
      <CardContent>
        <Typography variant="h6" mb={1}>{player.name}</Typography>
        <Typography variant="body1" mb={1}>{player.age} años</Typography>
        <Typography variant="body1">{player.position}</Typography>
        {user?.role === "Analyst" && (
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => onDelete(player._id)}>
            Eliminar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
