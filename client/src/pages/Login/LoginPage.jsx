import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import logo from "../../assets/images/logo-Crypto-Tracker.png";
import LoginContext from "../../store/loginContext";
import {
  validateEmailLogin,
  validatePasswordLogin,
} from "../../validation/loginValidation";
import baseApi from "../../services/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Copyright = () => {
  return (
    <Typography
      variant="inherit"
      color={"gray.500"}
      align="center"
      sx={{my:2}}
      // {...props}
    >
      {"Copyright © "}
      <Link
        color="gray.500"
        href="https://github.com/Ilan1992?tab=repositories"
      >
        Crypto Tracker by Ilan Vitenko
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleEmailBlur = () => {
    let dataJoi = validateEmailLogin({ email: emailValue });
    if (dataJoi.error) {
      setEmailError(dataJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };
  const handlePasswordBlur = () => {
    let dataJoi = validatePasswordLogin({ password: passwordValue });
    if (dataJoi.error) {
      setPasswordError(dataJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await baseApi.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem("token", data);
      const userToken = jwtDecode(data);
      setLogin(userToken);
      const { isBusiness, isAdmin } = userToken;
      toast.success(
        isAdmin
        ? "✔ LoggedIn Successfully as Admin!"
        : isBusiness
        ? "✔ LoggedIn Successfully as Business! "
        : "✔ LoggedIn Successfully!"
        ,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      navigate(ROUTES.HOME);
    } catch (error) {
      setLogin(null);
      localStorage.clear();
      toast.error("❗❗❗ Something`s Wrong !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo crypto tracker"
          style={{ width: 250, borderRadius: 20 }}
        />

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailValue}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordValue}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={emailError || passwordError ? true : false}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
            </Grid>
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                {"Don't have an account? Register !"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
export { Copyright };
export default LoginPage;
