import  axios  from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api";
const baseUrl =
  import.meta.env.VITE_SERVER_PORT ||
  "https://crypto-tracker-59kr.onrender.com";


const baseApi = axios.create({
  baseURL: `${baseUrl}/api`,
});



baseApi.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if(token){
    config.headers["x-token"] = token;
  }
return config;
})
export default baseApi;