import {
  alwaysLinks,
  loginLinks,
  logOutLinks,
  adminLinks,
  bizLinks,
} from "./myLinks";
import NavLinkComp from "./NavLinkComp";
import {Box} from "@mui/material"
import { useContext } from "react";
import  LoginContext  from "../../../store/loginContext";

const Links = () => {
  const { login } = useContext(LoginContext);
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: { xs: "flex", flexDirection: "column" },
          sm: "flex",
          md: "flex",
        },
      }}
    >
      {alwaysLinks.map((item, index) => (
        <NavLinkComp to={item.to} key={"navlink" + index}>
          {item.children}
        </NavLinkComp>
      ))}
      {login &&
        loginLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink1" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {login &&
      login.isBusiness &&
        bizLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink7" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {login &&
        login.isAdmin &&
        adminLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink3" + index}>
            {item.children}
          </NavLinkComp>
        ))}
      {!login &&
        logOutLinks.map((item, index) => (
          <NavLinkComp to={item.to} key={"navlink4" + index}>
            {item.children}
          </NavLinkComp>
        ))}
    </Box>
  );
}

export default Links;