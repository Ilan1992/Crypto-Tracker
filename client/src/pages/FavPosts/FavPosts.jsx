import PostComp from "../../components/PostComp";
import { Typography, Grid, Box, Divider } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../../services/axiosHelper";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import normalizeLike from "../MyPosts/normalizeLike";
import LoginContext from "../../store/loginContext";

const FavPosts = () => {
  const navigate = useNavigate();
  const [dataFromDb, setDataFromDb] = useState([]);
  const { login } = useContext(LoginContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await baseApi.get("/posts");
        const filterData = data.filter((post) => post.likes.includes(login._id));
        setDataFromDb(normalizeLike(filterData, login._id));
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
  useEffect(() => {
    setDataFromDb(dataFromServerFiltered);
  }, [login._id]);

  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return (
      <Typography sx={{ height: "50vh" }}>
        Currently, you have no favorite posts....
      </Typography>
    );
  }

  const handleEditPost = (id) => {
    navigate(`${ROUTES.EDIT_POST}/${id}`);
  };
  const handleDeletePost = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this Post?")) {
        setDataFromDb((currentDataFromDb) =>
          currentDataFromDb.filter((post) => post._id !== id)
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
  };
  const handleLikePost = async (id) => {
    try {
    const isLiked = dataFromDb.find((post) => post._id === id)?.liked || false;
    // Update the post in the posts list
    setDataFromDb((currentDataFromDb) => {
      return currentDataFromDb.map((post) => {
        if (post._id === id) {
          return { ...post, liked: !isLiked }; // Update the like status
        }
        return post;
      });
    });
    await baseApi.patch("/posts/" + id);
    // Show appropriate toast message based on whether the post was liked or unliked
    if (isLiked) {
      toast.success(" ✔ Unlike Successfully!", {position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",});
    } else {
      toast.success(" ✔ Like Successfully!", {position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",});
    }
  } catch (err) {
    console.log(err);
    toast.error("❗❗❗ Something went wrong!", {
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
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        height:"50%",
      }}
    >
      <Typography
        component="h3"
        variant="h4"
        align={"center"}
        color={"gray.500"}
        sx={{ my: 2, mt: 8, fontFamily: "Lora", fontWeight: 500 }}
      >
        Welcome to Fav Posts 
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
};

export default FavPosts;
