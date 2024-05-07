import { Box, Typography, Container } from "@mui/material";
import logeImage from "../assets/images/logo-Crypto-Tracker.png";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Welcome = () => {
  return (
    <Box>
      <Container
        sx={{
          display: {
            md: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            xs: {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="span"
            color="primary"
            textAlign={"center"}
            sx={{ fontFamily: "Lora" }}
          >
            <Typography
              variant="h1"
              color="GrayText"
              fontWeight={700}
              sx={{
                fontSize: { xs: "3rem", sm: "5.5rem", md: "7rem" },
                fontFamily: "Lora",
                boxShadow: "5px 5px 15px 0px rgba(16, 168, 176, 0.75)",
              }}
            >
              Welcome
            </Typography>
            <Divider />
            <Typography
              variant="h3"
              color="yellow"
              sx={{
                fontFamily: "Lora",
                my: 3,
                textShadow: "5px 5px 5px rgba(16, 168, 176, 0.75)",
              }}
            >
              To Crypto Tracker
            </Typography>
            <Typography variant="h5" color="info">
              <ul>
                <li>Track Your Crypto Portfolio With Ease</li>
                <Divider />
                <li>
                  The All-In-One Solution For Managing Your Digital Assets
                </li>
              </ul>
            </Typography>
          </Typography>
        </Box>
        <Box>
          <img
            src={logeImage}
            alt="logo crypto tracker"
            style={{
              width: "100%",
              height: "70vh",
              borderRadius: 30,
              marginTop: 15,
              boxShadow: "5px 5px 10px 0px rgba(16, 168, 176, 0.75)",
            }}
          />
        </Box>
      </Container>
      <Box>
        <Typography
          variant="h5"
          color="primary"
          sx={{
            fontFamily: "Lora",
            my: 10,
            textAlign: "center",
            border: "3px solid #000000",
            borderRadius: 10,
            lineHeight: 2,
            transition: "box-shadow 0.3s",
            "&:hover": {
              boxShadow: "15px 15px 25px 0px rgba(16, 168, 176, 0.75)",
            },
          }}
        >
          <VpnKeyIcon /> Sign Up For A Free Account Today And Start Tracking
          Your Crypto Portfolio With Ease !{" "}
          <Link to={ROUTES.REGISTER} color="yellow">
            {"Here !"}
          </Link>
        </Typography>
        <Box sx={{my:10}}>
          <Typography variant="h3" color="gray.500" fontWeight={700}>What is Crypto ?</Typography>
          <Typography
            variant="p"
            color="gray.500"
            textAlign="center"
            sx={{ fontFamily: "Lora",fontSize:{md:"1.2rem",xs:"1rem"} }}
          >
            <Divider/>
            A cryptocurrency, crypto-currency, or crypto is a digital currency
            designed to work as a medium of exchange through a computer network
            that is not reliant on any central authority, such as a government
            or bank, to uphold or maintain it. Individual coin ownership records
            are stored in a digital ledger, which is a computerized database
            using strong cryptography to secure transaction records, control the
            creation of additional coins, and verify the transfer of coin
            ownership. Despite the term that has come to describe many of the
            fungible blockchain tokens that have been created, cryptocurrencies
            are not considered to be currencies in the traditional sense, and
            varying legal treatments have been applied to them in various
            jurisdicitons, including classification as commodities, securities,
            and currencies, cryptocurrencies are generally viewed as a distinct
            asset class in practice. Some crypto schemes use validators to
            maintain the cryptocurrency. In a proof-of-stake model, owners put
            up their tokens as collateral. In return, they get authority over
            the token in proportion to the amount they stake. Generally, these
            token stakers get additional ownership in the token over time via
            network fees, newly minted tokens, or other such reward mechanisms.
            Cryptocurrency does not exist in physical form (like paper money)
            and is typically not issued by a central authority. Cryptocurrencies
            typically use decentralized control as opposed to a central bank
            digital currency (CBDC). When a cryptocurrency is minted,
            created prior to issuance, or issued by a single issuer, it is
            generally considered centralized. When implemented with
            decentralized control, each cryptocurrency works through distributed
            ledger technology, typically a blockchain, that serves as a public
            financial transaction database. The first cryptocurrency was
            Bitcoin, which was first released as open-source software in 2009.
            As of June 2023, there were more than 25,000 other cryptocurrencies
            in the marketplace, of which more than 40 had a market
            capitalization exceeding $1 billion.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
