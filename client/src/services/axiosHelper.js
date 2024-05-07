import  axios  from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api";
const baseApi = axios.create({
  baseURL: "http://localhost:3000/api",
});


baseApi.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if(token){
    config.headers["x-token"] = token;
  }
return config;
})
export default baseApi;