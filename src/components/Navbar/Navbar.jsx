import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useUser } from "../../context/user.context";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemIcon, ListItem, ListItemText, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Person2Icon from '@mui/icons-material/Person2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from "../../assets/logo.png";
import GroupsIcon from '@mui/icons-material/Groups';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { user } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleViewTeam = () => {
    if (user?.team) {
      navigate(`/team/${user.team}`);
    } else {
      alert("No perteneces a ningún equipo.");
    }
    setIsDrawerOpen(false);
  };

  const handleViewStats = () => {
    if (user?.team) {
      navigate(`/stats/${user.team}`);
    } else {
      alert("No perteneces a ningún equipo.");
    }
    setIsDrawerOpen(false);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#52eef0", color: "#135d5e" }}>
      <Toolbar>
        {isLoggedIn && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}

<Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
  <Box sx={{ width: 250, bgcolor: "#52eef0", height: "100vh", padding: 2 }}>
    <List>
      {/* Perfil con icono */}
      <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
        <ListItemIcon>
          <AccountBoxIcon sx={{ color: "#135d5e" }} />
        </ListItemIcon>
        <ListItemText primary={<Typography sx={{ color: "#135d5e", fontWeight: "bold", fontSize: "1.1rem" }}>Perfil</Typography>} />
      </ListItem>

      {/* Equipo con icono */}
      <ListItem sx={{ cursor: "pointer" }} button onClick={handleViewTeam}>
        <ListItemIcon>
          <GroupsIcon sx={{ color: "#135d5e" }} />
        </ListItemIcon>
        <ListItemText primary={<Typography sx={{ color: "#135d5e", fontWeight: "bold", fontSize: "1.1rem" }}>Equipo</Typography>} />
      </ListItem>

      {/* Estadísticas con icono */}
      <ListItem sx={{ cursor: "pointer" }} button onClick={handleViewStats}>
        <ListItemIcon>
          <LeaderboardIcon sx={{ color: "#135d5e" }} />
        </ListItemIcon>
        <ListItemText primary={<Typography sx={{ color: "#135d5e", fontWeight: "bold", fontSize: "1.1rem" }}>Estadísticas</Typography>} />
      </ListItem>
    </List>
  </Box>
</Drawer>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "220px", flexGrow: 1, textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "60px", marginRight: "10px", border: "none", filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1))", opacity: 0.7 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: "900", fontSize: "xx-large" }}>
            FootballStats
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={logOutUser} component={Link} to="/" sx={{ fontWeight: "900" }} endIcon={<LogoutIcon />}>
                Cerrar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/profile" sx={{ fontWeight: "900" }} endIcon={<Person2Icon />}>
                Mi Perfil
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup" sx={{ fontWeight: "900" }} endIcon={<PersonAddIcon />}>
                Crear Usuario
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: "900" }} endIcon={<LoginIcon />}>
                Iniciar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
