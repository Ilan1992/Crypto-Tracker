import {
  Typography,
  Divider,
  Box,
  TextField,
  Button,
  Container
} from "@mui/material";
import { Copyright } from "../../pages/Login/LoginPage";
import { useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [inputValue, setInputValue] = useState({
    Email: "",
    description:"",
  });
  const handleInputsChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  setInputValue({
    Email: "",
    description: "",
  });
  toast.success(" ✔ Message Sand Successfully Thank You!", {
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
  return (
    <Container
      elevation={20}
      sx={{
        position: "initial",
        bottom: 0,
        left: 0,
        right: 0,
        mt: 1,
        width: "100%",
        height: "40vh",
      }}
    >
      <Box
        style={{
          background: "GrayText",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "10px"
        }}
      >
        
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight={500}
          fontFamily={"lora"}
          color="gary.500"
          sx={{ my: 3 }}
        >
          Contact Us !
          <Divider />
          <Typography
            variant="body1"
            textAlign={"center"}
            fontFamily={"Lora"}
            color="gray.300"
            sx={{  padding: 2 }}
          >
            Were here to provide you with the best service possible and assist
            you with any questions or requests you may have. Feel free to reach
            out to us with any matter, and well be happy to help with any
            question, request, or requirement you have. You can fill out the
            form below, and well get back to you as soon as possible. Thank you
            for reaching out!
          </Typography>
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "75vw", md: "40vw" },
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="Email"
            label="Email"
            value={inputValue.Email}
            onChange={handleInputsChange}
          />
          <TextField
            id="description"
            label="description"
            value={inputValue.description}
            onChange={handleInputsChange}
          />
          <Button variant="contained" type="submit" color="inherit">
            SEND
          </Button>
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Footer;
