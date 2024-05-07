import { useState, useContext } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  FormGroup,
  FormControlLabel,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Links from "./ui/Links";
// import SearchComp from "./ui/SearchComp";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import UserUi from "./ui/UserUi";
import MaterialUISwitch from "./ui/MaterialUISwitch";



const HeaderComp = ({ isDarkMode, onDarkModeChange }) => {
  
  const { login } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const openMenu = Boolean(anchorElMenu);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleTo = () => {
    navigate(ROUTES.USER_PROFILE);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElMenu(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.HOME);
    window.location.reload();
  };
  const handleThemeChange = (e) => {
    onDarkModeChange(e.target.checked);
  };

  return (
    <AppBar position="sticky" style={{ background: "GrayText" }}>
      <Toolbar style={{ justifyContent: "start", width: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "initial", md: "initial" } }}
        ></Typography>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
            sx={{ display: { xs: "initial", sm: "initial", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorElMenu}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={handleClose}
              style={{ backgroundColor: "cadetblue" }}
            >
              <Links />
            </MenuItem>
          </Menu>
        </div>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "none", md: "initial" } }}>
            <Links />
          </Box>
          <Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    defaultChecked
                    onChange={handleThemeChange}
                  />
                }
                label={isDarkMode ? "Dark" : "Light"}
              />
            </FormGroup>
          </Box>
        </Box>
        
        <Box
          sx={{
            position: "absolute",

            p: 1,
          }}
        ></Box>
        {login && (
          <>
            <Box>
              <UserUi
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "flex-end",
                }}
              ></UserUi>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleTo}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Menu>
            </Box>
            <IconButton title="LogOut" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
HeaderComp.propTypes = {
  isDarkMode: PropTypes.bool,
  onDarkModeChange: PropTypes.func.isRequired,
};

export default HeaderComp;
