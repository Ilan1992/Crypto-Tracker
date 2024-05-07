import {
  Container,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";
import Welcome from "../../components/Welcome";
import { useContext ,useState } from "react";
import LoginContext from "../../store/loginContext";
import TableComp from "../../components/TableComp";
import PostsContainer from "../../components/PostsContainer";
import bitImg from "../../assets/images/BitcoinPic.png"
import SearchComp from "../../layout/header/ui/SearchComp";
import CardsContainer from "../../components/CardsContainer";


const HomePage = () => {
  const { login } = useContext(LoginContext);
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };
  return (
    <Container>
      {login ? (
        <>
          <Typography
            variant="h4"
            sx={{
              color: "gray.500",
              textAlign: "center",
              fontFamily: "Lorn",
              my: 4,
              fontWeight: 700,
            }}
          >
            <img
              src={bitImg}
              alt="bitcoin"
              width={"20%"}
              style={{ borderRadius: "50%" }}
            />
            <br />
            Top 100 CryptoCurrency Prices By Market Cap
          </Typography>
          <SearchComp />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <FormControl
              component="fieldset"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "10vw",
              }}
            >
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      checked={switchValue}
                      onChange={handleSwitchChange}
                    />
                  }
                  label={switchValue ? "Table View" : "Cards View"}
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Box>
          {switchValue ? <CardsContainer /> : <TableComp />}
          <PostsContainer />
        </>
      ) : (
        <Welcome />
      )}
      {/* <Footer/> */}
    </Container>
  );
};

export default HomePage;
