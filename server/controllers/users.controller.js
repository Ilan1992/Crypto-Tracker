import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  patchIsBiz,
  patchIsAdmin,
} from "../model/usersAdapter.js";
import handleError from "../utils/handleError.js";
import { generateToken } from "../token/jwt.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import debug from "debug";
let log = debug("app:usersController");

const registerUserController = async (req, res) => {
  try {
    let userFromDb = await getUserByEmail(req.body.email);
    if (userFromDb) throw new Error("User already exists !");
    let passwordHash = await generateHash(req.body.password);
    req.body.password = passwordHash;
    let newUser = await createUser(req.body);
    newUser.password = undefined;
    return res.json(newUser);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const loginUserController = async (req, res) => {
  try {
    let userFromDb = await getUserByEmail(req.body.email);
    if (!userFromDb) throw new Error("invalid email or password");
    let passwordMatch = await cmpHash(req.body.password, userFromDb.password);
    if (!passwordMatch) throw new Error("invalid email or password");
    let token = await generateToken({
      _id: userFromDb._id,
      isAdmin: userFromDb.isAdmin,
      isBusiness: userFromDb.isBusiness,
    });
    return res.json(token);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const updateUserController = async (req, res) => {
  try {
    let userFromDb = await updateUser(req.params.id, req.body);
    userFromDb.password = undefined;
    return res.json(userFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    let usersFromDb = await getAllUsers();
    return res.json(usersFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    let userFromDb = await getUserById(req.params.id);
    return res.json(userFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let userFromDb = await patchIsBiz(req.params.id, req.body.isBusiness);
    userFromDb.password = undefined;
    return res.json(userFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};
const patchIsAdminController = async (req, res) => {
  try {
    let userFromDb = await patchIsAdmin(req.params.id, req.body.isAdmin);
    console.log( "isAdmin Here?", userFromDb);
    userFromDb.password = undefined;
    return res.json(userFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDb = await deleteUser(req.params.id);
    userFromDb.password = undefined;
    return res.json(userFromDb);
  } catch (error) {
    log(error);
    handleError(res, 400, error.message);
  }
};

export {
  registerUserController,
  loginUserController,
  updateUserController,
  getAllUsersController,
  getUserByIdController,
  patchIsBizController,
  deleteUserController,
  patchIsAdminController,
};
