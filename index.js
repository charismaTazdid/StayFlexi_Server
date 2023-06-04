import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { hotelRoute, roomsRoute, usersRoute, authRoute } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGOURL);
    } catch (error) {
        throw error;
    }
};

app.get("/", (req, res) => {
    res.json("our server connected")
});

//middleWares
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/rooms", roomsRoute);
app.use("/hotels", hotelRoute);
app.use("/users", usersRoute);

//error handleing middleware
app.use((error, req, res, next) => {
    const err = {
        success: false,
        errorMessage: error.message || "Something Wrong here",
        errorStatus: error.status || 500,
        errorStack: error.stack,
    }
    // return res.status(errorStatus).json(errorMassage)
    return res.status(error.status || 500).send(err)
})

app.listen(5500, () => {
    connect();
    console.log("happy to see you connected!");
});