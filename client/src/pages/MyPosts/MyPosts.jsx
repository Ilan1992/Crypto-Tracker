import PostComp from "../../components/PostComp"
import { Typography, Grid, Box, Divider } from "@mui/material";
import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../../services/axiosHelper";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import normalizeLike from "./normalizeLike"
import  LoginContext  from "../../store/loginContext";

const MyPosts = () => {
const navigate = useNavigate();
const [dataFromDb, setDataFromDb] = useState([])
const { login } = useContext(LoginContext);

useEffect(() => {
  const getPosts = async () => {
    try {
      const { data } = await baseApi.get("/posts/my-posts");
      setDataFromDb(normalizeLike(data, login._id));
    } catch (error) {
      console.log(error);
    }
  };
  getPosts();
}, [login._id]);


let dataFromServerFiltered = normalizeLike(
  dataFromDb,
  login ? login._id : undefined
);
useEffect(()=>{
  setDataFromDb(dataFromServerFiltered);
},[login]);

if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
  return (
    <Typography sx={{ height: "50vh" }}>
      You have not created any posts yet...
    </Typography>
  );
}


const handleEditPost = (id) =>{
  navigate(`${ROUTES.EDIT_POST}/${id}`)
}
const handleDeletePost = async (id) =>{
  try {
    if (window.confirm("Are you sure you want to delete this Post?")) {
      setDataFromDb((currentDataFromDb) =>
        currentDataFromDb.filter((card) => card._id !== id)
      );
      await baseApi.delete("/posts/" + id);
      toast.success(" ✔ Delete Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    toast.error(
      "❗❗❗ Something`s Wrong ! Only The Creator of the Post Can Delete !",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }
}
const handleLikePost = async (id) =>{
  try {
    let { data } = await baseApi.patch("/posts/" + id);
    setDataFromDb((cDataFromDb) => {
      let postIndex = cDataFromDb.findIndex((post) => post._id === id);
      if (postIndex >= 0) {
        cDataFromDb[postIndex] = data;
      }
      return [...cDataFromDb];
    });
    toast.success(" ✔ Like Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } catch (err) {
    console.log(err);
  }
}

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <Typography
        component="h3"
        variant="h4"
        align={"center"}
        color={"gray.500"}
        sx={{ my: 2, mt: 8, fontFamily: "Lora", fontWeight: 500 }}
      >
        Welcome to my Posts Page Here you can Change your Cards and Update them
        <Divider sx={{ my: 2 }}>Posts</Divider>
      </Typography>
      <Grid container spacing={2}>
        {dataFromDb.map((item, index) => (
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
            key={"Post" + index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <PostComp
              id={item._id}
              title={item.title}
              description={item.description}
              subtitle={item.subtitle}
              img={item.image.url}
              cardNumber={item.bizNumber}
              liked={item.liked}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
              onLike={handleLikePost}
              createAt={item.createdAt}
              creatorName={item.creatorName}
              user_id={item.user_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyPosts