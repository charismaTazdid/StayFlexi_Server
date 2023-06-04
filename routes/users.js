import express from "express";
import { deleteUser, getAllUser, getOneUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const usersRouter = express.Router();

// usersRouter.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("ok! seems like you're authenticated!")
// });

// usersRouter.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("ok! you're authenticated to delete or update this account.")
// });

// usersRouter.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("so you're a big brother, I mean Admin.")
// });

//UPDATE USER
usersRouter.put("/:id", verifyUser, updateUser);

//DELETE USER
usersRouter.delete("/:id", verifyUser, deleteUser);

//GET ONE USER BY ID
usersRouter.get("/:id", verifyUser, getOneUser);

//GET ALL USERS
usersRouter.get("/", verifyAdmin, getAllUser);

export default usersRouter;