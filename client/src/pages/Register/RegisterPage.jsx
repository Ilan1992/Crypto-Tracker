import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import validateSchema from "../../validation/registerValidation";
import normalizeRegister from "./normalizeRegister";
import { toast } from "react-toastify";
import baseApi from "../../services/axiosHelper";
import logoImg from "../../assets/images/logo-Crypto-Tracker.png"
import {
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import TextInputComp from "../../components/TextInputComp";

const RegisterPage = () => {
  const [checked, setChecked] = useState(false);
  const [inputsValues, setInputsValues] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
  });
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInputsValues((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    let { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValues[e.target.id],
    });
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((prev) => {
        delete prev[e.target.id];
        return { ...prev };
      });
    }
  };
  const handleChangeCheck = () => {
    setChecked((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseApi.post(
        "/users/register",
        normalizeRegister({ ...inputsValues, isBusiness: checked })
      );
      toast.success(" ✔ Register Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.LOGIN);
    } catch (error) {
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
  let keysArray = Object.keys(inputsValues);
  let notRequired = ["middle", "url", "alt", "state"];
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={logoImg}
        alt="logo crypto tracker"
        style={{ width: 150, borderRadius: 20 }}
      />
      <Typography component="h1" variant="h5">
        REGISTER
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName, index) => (
            <TextInputComp
              key={"input" + index}
              id={keyName}
              label={keyName}
              value={inputsValues[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              type={keyName === "password" ? "password" : "text"}
              required={!notRequired.includes(keyName)}
            />
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onClick={handleChangeCheck}
                  color="primary"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Business Account Only For 10$ /Month"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN} variant="body2">
              Already have an account? Login!
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            CANCEL
          </Button>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setInputsValues((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }}
          >
            🔄 REFRESH
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 5 }}
          disabled={Object.keys(errors).length > 0}
        >
          REGISTER (⌐■_■)
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
