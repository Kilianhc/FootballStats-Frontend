import { Button } from "@mui/material";

function DeleteAccountButton({ onOpenDelete }) {
  return (
    <Button variant="contained" color="error" onClick={onOpenDelete} sx={{ mt: 2, ml: 2 }}>
      Eliminar Cuenta
    </Button>
  );
}

export default DeleteAccountButton;