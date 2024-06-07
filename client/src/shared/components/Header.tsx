import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

export const Header = () => {
  const { handleLogout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/dashboard" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
            Reserva PB
          </Typography>
          <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
