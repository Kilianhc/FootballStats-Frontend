import { Button } from "@mui/material";

function EditProfileButton({ onOpenEdit }) {
  return (
    <Button variant="contained" color="primary" onClick={onOpenEdit} sx={{ mt: 2, bgcolor:"#135d5e" }}>
      Editar Perfil
    </Button>
  );
}

export default EditProfileButton;