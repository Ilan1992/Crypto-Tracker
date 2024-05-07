import {Grid ,Typography} from "@mui/material"
import svgError from "../../assets/images/404.svg"

const ErrorPage = () => {
  return (
    <Grid container spacing={2} direction={"column"} alignItems={"center"}>
      <Typography variant="h1" fontWeight={700} color="">
        ERROR 404 !
      </Typography>
      <img src={svgError} alt="error 404" width={"40%"} />
    </Grid>
  );
}

export default ErrorPage