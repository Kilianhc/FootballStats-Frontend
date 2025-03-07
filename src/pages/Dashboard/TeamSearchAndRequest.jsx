import { Box, Button, Autocomplete, TextField } from "@mui/material";

function TeamSearchAndRequest({ teams, selectedTeam, onSelectTeam, onSendRequest }) {
  return (
    <Box mt={2}>
      <Autocomplete
        options={teams}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => onSelectTeam(value)}
        renderInput={(params) => <TextField {...params} label="Buscar equipo" variant="outlined" />}
      />
      <Button variant="contained" color="primary" onClick={onSendRequest} sx={{ mt: 2 }}>
        Enviar solicitud
      </Button>
    </Box>
  );
}

export default TeamSearchAndRequest;