import User from "./UserSchema.js";

const createUserMongo = (userData) => {
  let user = new User(userData);
  return user.save();
};

const getAllUsersMongo = () => {
  return User.find({}, { password: 0 });
};

const getUserByIdMongo = (id) => {
  return User.findById(id, { password: 0 });
};

const getUserByEmailMongo = (email) =>{
  return User.findOne({email});
} 

const updateUserMongo = ( id, userData) =>{
  return User.findByIdAndUpdate(id, userData, {new : true});
}

const patchIsBizMongo = (id , isBusiness) =>{
  return User.findByIdAndUpdate({_id: id} ,{isBusiness:isBusiness} ,{new: true})
  
};

const patchIsAdminMongo = (id , isAdmin) =>{
  return User.findByIdAndUpdate(
    { _id: id },
    { isAdmin: isAdmin },
    { new: true }
  );

};

const deleteUserMongo = (id) =>{
  return User.findByIdAndDelete(id);
};

export {
  createUserMongo,
  getAllUsersMongo,
  getUserByIdMongo,
  getUserByEmailMongo,
  updateUserMongo,
  patchIsBizMongo,
  deleteUserMongo,
  patchIsAdminMongo,
};