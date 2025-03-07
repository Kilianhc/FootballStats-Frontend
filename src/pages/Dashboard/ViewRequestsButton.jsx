import { Box, Button } from "@mui/material";

function ViewRequestsButton({ onViewRequests }) {
  return (
    <Box mt={2}>
      <Button variant="contained" color="primary" onClick={onViewRequests} sx={{ mt: 2 }}>
        Ver Solicitudes
      </Button>
    </Box>
  );
}

export default ViewRequestsButton;