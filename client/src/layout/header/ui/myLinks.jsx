import ROUTES from "../../../routes/ROUTES";
import logo from "../../../assets/images/logo-Crypto-Tracker.png"


const alwaysLinks = [
  { to: ROUTES.HOME, children: <img src={logo} alt="logo-crypto-tracker" style={{width:"8vw",height:"10vh",borderRadius:20}} /> },
  { to: ROUTES.ABOUT, children: "About" },
];

const loginLinks = [
  { to: ROUTES.FAV_COINS, children: "WATCHLIST" },
  { to: ROUTES.FAV_POSTS, children: "Fav Posts" },
];

const bizLinks = [
  { to: ROUTES.MY_POSTS, children: "My Posts" },
  { to: ROUTES.CREATE_POST, children: "Create Post" },
];

const adminLinks = [
  { to: ROUTES.ADMIN_DASHBOARD, children: "Dashboard" },
];

const logOutLinks = [
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.REGISTER, children: "Register" },
];

export { alwaysLinks, loginLinks, logOutLinks, adminLinks, bizLinks };
