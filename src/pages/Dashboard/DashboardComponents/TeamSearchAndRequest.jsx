import { Box, Button, Autocomplete, TextField } from "@mui/material";

function TeamSearchAndRequest({ teams, selectedTeam, onSelectTeam, onSendRequest }) {
  return (
    <Box mt={2}>
      <Autocomplete
        options={teams}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => onSelectTeam(value)}  // Actualiza el equipo seleccionado
        value={selectedTeam}  // Esto asegura que el equipo seleccionado se muestra correctamente
        renderInput={(params) => <TextField {...params} label="Buscar equipo" variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#52eef0",
            "& fieldset": {
              borderColor: "#4caf50", // Cambiar color del borde cuando no está enfocado
            },
            "&:hover fieldset": {
              borderColor: "#81c784", // Color del borde cuando el campo está enfocado
            },
            "&.Mui-focused fieldset": {
              borderColor: "#66bb6a", // Borde cuando el campo está enfocado
            },
          }
        }} />}
      />
      <Button variant="contained" onClick={onSendRequest} sx={{ mt: 5, bgcolor:"#1498b5"  }}>
        Asignar Equipo
      </Button>
    </Box>
  );
}

export default TeamSearchAndRequest;
