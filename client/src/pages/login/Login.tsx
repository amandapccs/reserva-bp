import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "../../shared/themes";
import { AuthContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const signIn = await handleLogin({
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    });

    if (signIn?.errorMessage) return setErrorMessage(signIn.errorMessage || "");

    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={LightTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entre com a sua conta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            {errorMessage && (
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            <Link href="/register" variant="body2" align="center">
              {"Não possui uma conta? Cadastre-se"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
