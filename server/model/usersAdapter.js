import connectToMongo from "./mongoDB/dbConnect.js";
import {
  createUserMongo,
  getAllUsersMongo,
  getUserByIdMongo,
  getUserByEmailMongo,
  updateUserMongo,
  patchIsBizMongo,
  deleteUserMongo,
  patchIsAdminMongo,
} from "./mongoDB/users/userService.js";
import normalizeUser from "../normalize/user.normalize.js";

const DB = "mongo";

const connectToDb = () =>{
  if(DB === "mongo"){
    return connectToMongo();
  }
}

const createUser = (user) =>{
  user = normalizeUser(user)
  if(DB === "mongo"){
    return createUserMongo(user)
  }
}

const updateUser = (id , user)=>{
  user = normalizeUser(user);
  if(DB === "mongo"){
    return updateUserMongo(id, user);
  }
};

const getAllUsers = () =>{
  if(DB === "mongo"){
    return getAllUsersMongo()
  }
};

const getUserById = (id) =>{
  if(DB === "mongo"){
    return getUserByIdMongo(id)
  }
};

const getUserByEmail = (email) =>{
  if(DB === "mongo"){
    return getUserByEmailMongo(email)
  }
};

const deleteUser = (id) =>{
  if(DB === "mongo"){
    return deleteUserMongo(id)
  }
};

const patchIsBiz = (id , isBusiness)=>{
  if(DB === "mongo"){
    return patchIsBizMongo(id , isBusiness)
  }
};
const patchIsAdmin = (id , isAdmin)=>{
  if(DB === "mongo"){
    return patchIsAdminMongo(id, isAdmin);
  }
};

export default connectToDb;
export {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  patchIsBiz,
  patchIsAdmin,
};