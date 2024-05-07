import CoinDataContext from "../store/coinDataContext";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { IoMdStarOutline } from "react-icons/io";
import LoginContext from "../store/loginContext";
import baseApi from "../services/axiosHelper";
import normalizeToServer from "./normalizeTable/normalizeToServer";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import useCompare from "../hooks/useCompare";
import LinearProgress from "@mui/material/LinearProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandIconButton from "./ExpandIconButton";


const TableComp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputsValue, setInputValue] = useState({
    first: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    FavoriteCoins: [],
  });
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { coinsData } = useContext(CoinDataContext);
  const [coinDataUpdate, setCoinDataUpdate] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  let regex = /\B(?=(\d{3})+(?!\d))/g;
  
  const { coinDataUpdatee, inputsValues } = useCompare(); // Destructure the returned values

  useEffect(() => {
    setIsLoading(false)
      setCoinDataUpdate(coinDataUpdatee)
    
  }, [coinDataUpdatee]);

  useEffect(() => {
    setInputValue(inputsValues);
  }, [inputsValues]);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const handleClickCoin = (event) => {
    const id = event.currentTarget.id;
    navigate(`${ROUTES.VIEW_COIN}/${id}`);
  };

  const handleFavCoin = async (event, index) => {
    const clickedCoinId = coinsData[index].id;
    if (!clickedCoinId) return;

    const updatedCoinsData = [...coinDataUpdate]; // Create a copy
    updatedCoinsData[index].isFavorited = !updatedCoinsData[index].isFavorited; // Toggle isFavorited

    setCoinDataUpdate(updatedCoinsData);
    
    const setIsCoinFavorited = (updateStateFn) => {
      setInputValue({
        ...inputsValue,
        FavoriteCoins: updateStateFn(inputsValue.FavoriteCoins),
      });
    };
    const updateFavorites = (existingFavorites) => {
      return existingFavorites.includes(clickedCoinId)
        ? existingFavorites.filter((id) => id !== clickedCoinId) // remove if exists
        : [...existingFavorites, clickedCoinId]; // add if new
    };
    setIsCoinFavorited(updateFavorites);
    // Update server-side 
    try {
      const updatedFavoriteCoins = updateFavorites(inputsValue.FavoriteCoins);
      await baseApi.put("/users/" + login._id, {
        ...normalizeToServer(inputsValue),
        FavoriteCoins: updatedFavoriteCoins,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderByPrice = () => {
    const sortedCoinData = [...coinDataUpdate];
    // Sort the copied array based on current_price in descending order (high to low)
    sortedCoinData.sort((coinA, coinB) => {
      const priceA = parseFloat(coinA.current_price) || 0;
      const priceB = parseFloat(coinB.current_price) || 0;
     return sortOrder === "desc" ? priceB - priceA : priceA - priceB; // Descending order (high to low)
    });
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setCoinDataUpdate(sortedCoinData);
  };

  const handleRank = () => {
    setCoinDataUpdate(coinDataUpdatee);
  };
  const handleOrderByPercentage= () =>{
    const sortedCoinData = [...coinDataUpdate];
    // Sort the copied array based on price_change_percentage in descending order (high to low)
    sortedCoinData.sort((coinA, coinB) => {
      const priceA = parseFloat(coinA.price_change_percentage_24h) || 0;
      const priceB = parseFloat(coinB.price_change_percentage_24h) || 0;
      return sortOrder === "desc" ? priceB - priceA : priceA - priceB; // Descending order (high to low)
    })
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setCoinDataUpdate(sortedCoinData);
  }
  
  return (
    <TableContainer
      component={Paper}
      sx={{
        my: 10,
        overflowX: "scroll",
        overflowY: "scroll",
        height: "70vh",
        width: { xs: "100%", md: "100%" },
      }}
    >
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "GrayText",
          }}
        >
          <TableRow>
            <TableCell>
              {" "}
              <Button variant="text" onClick={handleRank}>
                Rank
              </Button>
            </TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="left">
              Price{" "}
              <ExpandIconButton
                title="Order By Price"
                expand={expanded1}
                aria-expanded={expanded1}
                onClick={(event) => {
                  handleExpandClick1(); // Perform expand logic
                  if (!event.defaultPrevented) {
                    handleOrderByPrice(); // Perform order by percentage logic (if not prevented)
                  }
                }}
              >
                <ExpandMoreIcon />
              </ExpandIconButton>
            </TableCell>
            <TableCell
              align="right"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ExpandIconButton
                title="Order By 24h %"
                expand={expanded}
                aria-expanded={expanded}
                onClick={(event) => {
                  handleExpandClick(); // Perform expand logic
                  if (!event.defaultPrevented) {
                    handleOrderByPercentage(); // Perform order by percentage logic (if not prevented)
                  }
                }}
              >
                <ExpandMoreIcon />
              </ExpandIconButton>
              24h%
            </TableCell>
            <TableCell align="center">Market Cap</TableCell>
            <TableCell align="right">Supply</TableCell>
            <TableCell align="right">Max Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinDataUpdate?.map((row, index) => (
            <TableRow
              id={row.id}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" id={row.id}>
                <IconButton
                  aria-label=""
                  onClick={(e) => handleFavCoin(e, index)}
                  id={row.id}
                >
                  <IoMdStarOutline
                    id={row.id}
                    color={row.isFavorited ? "red" : "inherit"}
                  />
                </IconButton>
                {row?.market_cap_rank}
              </TableCell>
              <TableCell
                align="left"
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: { xs: 4, md: 3 },
                }}
              >
                <img
                  src={row?.image}
                  alt="crypto logo"
                  width="30"
                  style={{ marginRight: "5px" }}
                />
                {row?.name} {row?.symbol.toUpperCase()}
              </TableCell>
              <TableCell
                align="left"
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
              >
                $ {row?.current_price}
              </TableCell>
              <TableCell
                align="left"
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
                sx={{
                  color:
                    row?.price_change_percentage_24h > 0 ? "green;" : "red;",
                }}
              >
                {row?.price_change_percentage_24h.toFixed(2)} %
              </TableCell>
              <TableCell
                align="left"
                sx={{ padding: 0 }}
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
              >
                $ {row?.market_cap.toFixed().replace(regex, ",")}
              </TableCell>
              <TableCell
                align="right"
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
              >
                {row?.circulating_supply.toFixed().replace(regex, ",")}{" "}
                {row?.symbol.toUpperCase()}
              </TableCell>
              <TableCell
                align="right"
                id={row.id}
                onClickCapture={handleClickCoin}
                style={{ cursor: "pointer" }}
              >
                {(row?.max_supply != null &&
                  row?.max_supply.toFixed().replace(regex, ",") +
                    row?.symbol.toUpperCase()) ||
                  `No More ${row?.symbol.toUpperCase()}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
