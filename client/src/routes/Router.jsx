import ROUTES from "./ROUTES";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AboutUs from "../pages/AboutUs/AboutUs";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import MyFavCoin from "../pages/MyFavCoin/MyFavCoin";
import MyPosts from "../pages/MyPosts/MyPosts";
import CreatePost from "../pages/CreatePost/CreatePost";
import ViewCoinPage from "../pages/ViewCoin/ViewCoinPage";
import EditPost from "../pages/EditPost/EditPost";
import FavPosts from "../pages/FavPosts/FavPosts";
import EditUser from "../pages/AdminDashboard/EditUser";
import AdminGuard from "../guard/AdminGuard";
import BizGuard from "../guard/BizGuard";
import AuthGuard from "../guard/AuthGuard";


const Router = () => {
  return useRoutes([
    { path: ROUTES.HOME, element: <HomePage /> },
    { path: ROUTES.ABOUT, element: <AboutUs /> },
    { path: ROUTES.LOGIN, element: <LoginPage /> },
    { path: ROUTES.REGISTER, element: <RegisterPage /> },
    {
      path: ROUTES.USER_PROFILE,
      element: (
        <AuthGuard>
          <UserProfile />
        </AuthGuard>
      ),
    },
    {
      path: ROUTES.FAV_POSTS,
      element: (
        <AuthGuard>
          <FavPosts />
        </AuthGuard>
      ),
    },
    {
      path: ROUTES.MY_POSTS,
      element: (
        <BizGuard>
          <MyPosts />
        </BizGuard>
      ),
    },
    {
      path: ROUTES.CREATE_POST,
      element: (
        <BizGuard>
          <CreatePost />
        </BizGuard>
      ),
    },
    {
      path: `${ROUTES.EDIT_POST}/:id`,
      element: (
        <BizGuard>
          <EditPost />
        </BizGuard>
      ),
    },
    {
      path: `${ROUTES.ADMIN_UPDATE_USER}/:id`,
      element: (
        <AdminGuard>
          <EditUser />
        </AdminGuard>
      ),
    },
    {
      path: ROUTES.FAV_COINS,
      element: (
        <AuthGuard>
          <MyFavCoin />
        </AuthGuard>
      ),
    },
    {
      path: ROUTES.ADMIN_DASHBOARD,
      element: (
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      ),
    },
    {
      path: `${ROUTES.VIEW_COIN}/:id`,
      element: (
        <AuthGuard>
          <ViewCoinPage />
        </AuthGuard>
      ),
    },
    { path: "*", element: <ErrorPage /> },
  ]);
};
export default Router;
