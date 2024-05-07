import {Container ,Box, Typography}from '@mui/material'
import imageB from "../../assets/images/Default_Crypto_Tracker_1.jpg"

const AboutUs = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        color="info"
        fontWeight={700}
        fontFamily={"Lora"}
        textAlign={"center"}
        sx={{
          transition: "all 0.3s",
          "&:hover": {
            color: "rgba(16, 168, 176, 0.75)",
          },
          fontSize: {xs: "1.5rem",sm: "2.2rem", md: "4.5rem"},
        }}
        style={{
          textShadow: "10px 10px 20px rgba(16, 168, 176, 0.75)",
        }}
      >
        About Us..
      </Typography>
      <Container
        // maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "60vh",
          border: "3px solid #000000",
          my: 5,
          borderRadius: 10,
          backgroundImage: `url(${imageB})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "15px 15px 25px 0px rgba(16, 168, 176, 0.75)",
          },
        }}
        style={{ backdropFilter: "blur(100px)" }}
      >
        <Box>
          <Typography
            variant="p"
            color="info"
            sx={{
              backdropFilter: "blur(100px)",
              fontFamily: "Lora",
              fontWeight: 500,
              textAlign: "center",
              fontSize: { xs: "0.7rem", sm: "1.2rem", md: "1.4rem" },
            }}
          >
            Cryptocurrency is the future of finance, and with it comes the need
            for a reliable way to track your investments. Thats where Crypto
            Tracker comes in. Our easy-to-use app makes it simple to stay on top
            of your crypto portfolio, so you can make informed decisions about
            your investments.
            <br />
            At our website, we aim to create a vibrant community where users can
            engage with various features tailored to their interests and needs.
            For regular users, we offer the ability to engage with content
            through likes and other interactive features. Whether youre
            passionate about specific topics or simply enjoy showing
            appreciation for great content, our platform provides a space for
            you to connect with like-minded individuals. For business users, we
            offer additional functionalities, including the ability to create
            and share posts. Whether youre promoting your products, services,
            or expertise, our platform provides a powerful tool to reach your
            audience and grow your business. Thank you for being part of our
            community, and we look forward to continuing this journey together!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
