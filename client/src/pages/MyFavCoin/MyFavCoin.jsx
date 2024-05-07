import useCompare from "../../hooks/useCompare";
import LoginContext from "../../store/loginContext";
import {
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material/";
import { BsListStars } from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { MdDeleteForever } from "react-icons/md";
import PieChart from "./PieChart";
import baseApi from "../../services/axiosHelper";
import normalizeToServer from "../../components/normalizeTable/normalizeToServer";

const MyFavCoin = () => {
  const { login } = useContext(LoginContext);
  const [coinDataUpdate, setCoinDataUpdate] = useState([]);
  const [inputsValue, setInputValue] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    FavoriteCoins: [],
  });
  let regex = /\B(?=(\d{3})+(?!\d))/g;
  const { coinDataUpdatee, inputsValues } = useCompare(); // Destructure the returned values
  const navigate = useNavigate();

  useEffect(() => {
    if (coinDataUpdatee.length > 0) {
      return;
    } else {
      setCoinDataUpdate(...coinDataUpdatee);
    }
  }, [coinDataUpdatee]);

  useEffect(() => {
    setInputValue(inputsValues);
  }, [inputsValues]);

  const filterCoins = coinDataUpdatee?.filter((coin) => {
    return coin.isFavorited === true;
  });

  useEffect(() => {
    setCoinDataUpdate(filterCoins);
  }, [coinDataUpdatee]);
  
  const handleClickCoin = (event) => {
    const id = event.currentTarget.id;
    navigate(`${ROUTES.VIEW_COIN}/${id}`);
  };
  const handleFavCoinRemove = async (e) => {
  const coinIdRemove = e.currentTarget.id
  try {
    // Update the favorite coins array directly
    const updatedFavoriteCoins = inputsValue.FavoriteCoins.filter(
      (id) => id !== coinIdRemove
    );
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      FavoriteCoins: updatedFavoriteCoins,
    }));

    // Update the server-side data
    await baseApi.put("/users/" + login._id, {
      ...normalizeToServer(inputsValue),
      FavoriteCoins: updatedFavoriteCoins,
    });
  } catch (error) {
    console.log(error);
  }
};
  
  return (
    <Grid container sx={{ mb: 10 }}>
      <Typography
        variant="h3"
        textAlign={"center"}
        color="grey.700"
        sx={{
          fontWeight: 700,
          fontFamily: "lora",
          width: "100%",
          fontSize: { xs: "2rem", md: "3rem" },
          textShadow: "2px 2px 3px #333",
          my: 3,
        }}
      >
        WATCHLIST <BsListStars />
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <TableContainer
            component={Paper}
            sx={{ width: "105%", overflow: "scroll" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">24h %</TableCell>
                  <TableCell align="right">Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coinDataUpdate?.map((row) => (
                  <TableRow
                    id={row.id}
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <IconButton
                        aria-label=""
                        id={row.id}
                        onClick={(e) => {
                          handleFavCoinRemove(e);
                          setCoinDataUpdate(
                            coinDataUpdate.filter((coin) => coin.id !== row.id)
                          );
                        }}
                      >
                        <MdDeleteForever id={row.id} />
                      </IconButton>
                      {row?.market_cap_rank}
                    </TableCell>
                    <TableCell
                      align="left"
                      id={row.id}
                      onClickCapture={handleClickCoin}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={row?.image}
                        alt="crypto logo"
                        width="20"
                        style={{ marginRight: "5px" }}
                      />
                      {row?.name} {row?.symbol.toUpperCase()}
                    </TableCell>
                    <TableCell
                      align="right"
                      id={row.id}
                      onClickCapture={handleClickCoin}
                      style={{ cursor: "pointer" }}
                    >
                      $ {row?.current_price}
                    </TableCell>
                    <TableCell
                      align="right"
                      id={row.id}
                      onClickCapture={handleClickCoin}
                      style={{ cursor: "pointer" }}
                      sx={{
                        color:
                          row?.price_change_percentage_24h > 0
                            ? "green;"
                            : "red;",
                      }}
                    >
                      {row?.price_change_percentage_24h.toFixed(2)} %
                    </TableCell>
                    <TableCell
                      align="right"
                      id={row.id}
                      onClickCapture={handleClickCoin}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      $ {row?.market_cap.toFixed().replace(regex, ",")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ width: {xs: '100%',  md:"40%"} }}>
          <PieChart data={coinDataUpdate} />
        </Box>
      </Box>
    </Grid>
  );
};

export default MyFavCoin;
