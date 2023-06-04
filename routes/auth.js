import express from "express";
import { authRegister, login } from "../controllers/authController.js";

const authRouter = express.Router();

//REGISTER & LOGIN USER
authRouter.post("/register", authRegister);
authRouter.post("/login", login)

export default authRouter;