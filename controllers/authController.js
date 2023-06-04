import User from "../models/User.js";
import bcrypt from "bcrypt";
import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const authRegister = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newuser.save();
        res.status(201).json("User has been Created Successfully")
    } catch (err) {
        next(err);
    }
};


export const login = async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(customError(404, "user not found with this user name"));

        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordMatch) return next(customError(400, "wrong Password"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...restDetails } = user._doc;
        // console.log(token)
        res.cookie("access_token", token, { httpOnly: true }).status(200).send({ ...restDetails });

    } catch (err) {
        next(err);
    }
};
