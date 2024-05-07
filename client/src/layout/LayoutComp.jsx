import MainComp from "./main/MainComp"
import HeaderComp from "./header/HeaderComp"
import PropTypes from "prop-types"
import tmc from "twin-moon-color";
import { useState } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import CoinProvider from "../store/CoinProvider";
import { ThemeProvider, createTheme  ,CssBaseline,Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./footer/Footer";


const LayoutComp = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  const [isDarkMode, setDarkMode] = useState(true);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "*#FB0000",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setDarkMode(checked);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
      <CoinProvider>
        <CssBaseline />
        <HeaderComp
          isDarkMode={isDarkMode}
          onDarkModeChange={handleThemeChange}
        />
        <MainComp>
          {finishAutoLogin ? (
            children
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </MainComp>
        <Footer />
      </CoinProvider>
    </ThemeProvider>
  );
}
LayoutComp.propTypes = {
  children: PropTypes.node,
};

export default LayoutComp