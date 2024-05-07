import { useState, useEffect } from 'react'
import baseApi from '../../services/axiosHelper'
import { useParams ,useNavigate } from 'react-router-dom'
import normalizePost from '../CreatePost/normalizePost'
import postValidateSchema from '../../validation/postValidation'
import { toast } from 'react-toastify'
import { Grid,Box,Typography,Button } from '@mui/material'
import TextInputComp from '../../components/TextInputComp'
import ROUTES from '../../routes/ROUTES'
import logoImg from "../../assets/images/logo-Crypto-Tracker.png"
import normalizeFromDb from './normalizeFromDb'
import ModeIcon from "@mui/icons-material/Mode";

const EditPost = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    url: "",
    alt: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    url: "",
    alt: "",
  });

useEffect(()=>{
  const getPostData = async () =>{
    try {
      const { data } = await baseApi.get(`/posts/${id}`);
      setInputsValue(normalizeFromDb(data));
    } catch (error) {
      console.log(error);
    }
  }
  getPostData();
},[id])


  const handleInputsChange = (e) => {
    setInputsValue((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    let { error } = postValidateSchema[e.target.id]({
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
  let keysArray = Object.keys(inputsValue);
  let notRequired = ["url", "alt"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseApi.put("/posts/" + id, normalizePost(inputsValue));
      navigate(ROUTES.MY_POSTS);
      toast.success(" ✔ Update Successfully!", {
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
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <img
        src={logoImg}
        alt="logo crypto tracker"
        style={{ width: 150, borderRadius: 20 }}
      />
      <Typography
        component="h1"
        variant="h5"
        fontFamily={"Lora"}
        fontWeight={500}
      >
        Update Your Post <ModeIcon />
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 3, width: "30vw" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ flexDirection: "column", width: "62vw" }}
        >
          {keysArray.map((keyName) => (
            <TextInputComp
              key={"input" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={!notRequired.includes(keyName)}
            />
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
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
              setInputsValue((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }}
          >
            🔄 CLEAR
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Update Post
        </Button>
      </Box>
    </Box>
  );
}

export default EditPost