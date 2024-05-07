import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchTheme";
import { useState, useContext } from "react";
import CoinDataContext from "../../../store/coinDataContext";
import Box from "@mui/material/Box";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";



const SearchComp = () => {
  const [text, setText] = useState("");
  const { coinsData, filterData, setFilterData } = useContext(CoinDataContext);
  const navigate = useNavigate();

  const handleClickCoin = (event) => {
    const id = event.currentTarget.id;
    navigate(`${ROUTES.VIEW_COIN}/${id}`);
  };

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);

    if (searchText.trim() === "") {
      setFilterData([...coinsData]);
    } else {
      setFilterData(
        coinsData.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.symbol.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  return (
    <Search sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "2px 4px",
          borderRadius: "4px",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Coin…"
          inputProps={{ "aria-label": "search" }}
          value={text}
          onChange={handleInputChange}
        />
      </Box>
      {text &&
        filterData?.map((result, index) => (
          <div
            id={result.id}
            onClickCapture={handleClickCoin}
            key={result + index}
            style={{ cursor: "pointer" }}
          >
            {result.name}
          </div>
        ))}
      {!text && <span> </span>}
    </Search>
  );
};

export default SearchComp;
