import { Button, Box } from "@mui/material";

function CreateTeamButton({ onCreateTeam }) {
  return (
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={onCreateTeam} sx={{ mt: 2 }}>
        Crear Equipo
      </Button>
    </Box>
  );
}

export default CreateTeamButton;