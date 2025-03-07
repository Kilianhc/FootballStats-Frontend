import { Button } from "@mui/material";

function EditProfileButton({ onOpenEdit }) {
  return (
    <Button variant="contained" color="secondary" onClick={onOpenEdit} sx={{ mt: 2 }}>
      Editar Perfil
    </Button>
  );
}

export default EditProfileButton;