import express from "express";
import { createHotel, deleteHotel, getAllHotel, getSingleHotel, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const hotelRouter = express.Router();

//CREATE
hotelRouter.post("/", verifyAdmin, createHotel);

//UPDATE
hotelRouter.put("/:id", verifyAdmin, updateHotel);

//DELETE
hotelRouter.delete("/:id", verifyAdmin, deleteHotel);

//GET ALL HOTELS
hotelRouter.get("/", getAllHotel);

//GET ONE HOTEL BY ID
hotelRouter.get("/:id", getSingleHotel);

export default hotelRouter;