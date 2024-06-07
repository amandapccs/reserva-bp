import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "../../shared/themes";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRegister } from "../../shared/hooks/UseRegister";
import { useNavigate } from "react-router-dom";
import { INTERNAL_ERROR_MESSAGE } from "../../shared/utils";
import * as yup from "yup";
import { useFormik } from "formik";

export const SignUp = () => {
  const [role, setRole] = React.useState<string>("client");
  const [message, setMessage] = React.useState<string>("");
  const { handleRegister } = useRegister();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Email é obrigatório"),
    password: yup
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .required("Senha é obrigatória"),
    givenName: yup.string().required("Nome é obrigatório"),
    familyName: yup.string().required("Sobrenome é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "seu-email@exemplo.com",
      password: "senha-muito-segura",
      givenName: "Ana",
      familyName: "Schmidt",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (formValues: any) => {
    const register = await handleRegister({
      ...formValues,
      role,
    });

    if (register === INTERNAL_ERROR_MESSAGE) return setMessage(register);

    setMessage("Cadastro criado. Redirecionando para a página de login...");
    setTimeout(() => navigate("/"), 2000);
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
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="givenName"
                  required
                  fullWidth
                  id="givenName"
                  label="Nome"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.givenName && Boolean(formik.errors.givenName)
                  }
                  helperText={
                    formik.touched.givenName && formik.errors.givenName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="familyName"
                  label="Sobrenome"
                  name="familyName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.familyName &&
                    Boolean(formik.errors.familyName)
                  }
                  helperText={
                    formik.touched.familyName && formik.errors.familyName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <FormControl>
              <FormLabel id="radio-buttons-group-label">
                Tipo de conta:
              </FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="client"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="client"
                  control={<Radio />}
                  label="Cliente"
                  onChange={() => setRole("client")}
                />
                <FormControlLabel
                  value="broker"
                  control={<Radio />}
                  label="Corretor"
                  onChange={() => setRole("broker")}
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              Cadastrar
            </Button>
            {message && (
              <Typography
                align="center"
                color={message === INTERNAL_ERROR_MESSAGE ? "error" : "green"}
              >
                {message}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Já possui uma conta? Entre aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
