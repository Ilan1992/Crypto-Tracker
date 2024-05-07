import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import baseApi from "../../services/axiosHelper";
import  LoginContext  from "../../store/loginContext";
import validateSchema from "../../validation/registerValidation";
import ROUTES from "../../routes/ROUTES";
import TextInputComp from "../../components/TextInputComp";
import normalizeUser from "./normalizeUser";
import useCompare from "../../hooks/useCompare";
import { toast } from "react-toastify";


const UserProfile = () => {
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
    email:"",
    
  });
  const { inputsValues } = useCompare();
  let { id } = useParams();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();


  useEffect(() => {
    setInputsValue(inputsValues)
  }, [id, login._id,inputsValues]);

  let notRequired = [ "state"];
  let keysArray = Object.keys(inputsValue);
  keysArray.filter((key) =>{
    if(key === "FavoriteCoins"){
      delete inputsValue[key]
    }
  } )
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
      await baseApi.put(
        "/users/" + login._id,
        normalizeUser(inputsValue)
      );
      navigate(ROUTES.HOME);
      toast.success(" ✔ Update Successfully Your Profile!", {
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
      <img src={inputsValues.url} alt={inputsValues.alt} width={50} />

      <Typography component="h1" variant="h5">
        Edit your Profile
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
              defaultValue={inputsValue[keyName]?? ""}
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
            onClick={() => navigate(ROUTES.HOME)}
          >
            CANCEL
          </Button>
          {/* <Button
            fullWidth
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setInputsValue((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }}
          >
            🔄 REFRESH
          </Button> */}
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
