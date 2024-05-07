import { useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import baseApi from "../../services/axiosHelper";
import { toast } from "react-toastify";
import validateSchema from "../../validation/registerValidation";
import { Box, Button, Typography, Grid } from "@mui/material";
import normalizeUser from "../UserProfile/normalizeUser";
import TextInputComp from "../../components/TextInputComp";
import ROUTES from "../../routes/ROUTES";
import logoImage from "../../assets/images/logo-Crypto-Tracker.png"
import normalizeFromServer from "../../components/normalizeTable/normalizeFromServer";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputsValue, setInputsValue] = useState({
    first: "",
    last: "",
    email: "",
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
    phone: "",
    country: "",
    city: "",
    url: "",
    alt: "",
    state: "",
    email: "",
  });

  useEffect(()=>{
  const fetchUser = async () => {
    try {
      let { data } = await baseApi.get(`/users/${id}`);
      setInputsValue(normalizeFromServer(data))
    } catch (error) {
      console.log(error);
    }
  }
  fetchUser();
  },[id])

  let notRequired = ["state"];
  let keysArray = Object.keys(inputsValue);
  keysArray.filter((key) => {
    if (key === "FavoriteCoins") {
      delete inputsValue[key];
    }
  });

  const handleInputsChange = (e) => {
    setInputsValue((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    let { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseApi.put("/users/" + id, normalizeUser(inputsValue));
      navigate(ROUTES.ADMIN_DASHBOARD);
      toast.success(" ✔ Update Successfully User Profile!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <img src={logoImage} alt={"logo"} width={100} />

      <Typography component="h1" variant="h5">
        Edit User Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComp
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName] ?? ""}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={!notRequired.includes(keyName)}
              defaultValue={inputsValue[keyName] ?? ""}
            />
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
          >
            CANCEL
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Edit User
        </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
