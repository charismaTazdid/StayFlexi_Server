import express from "express";
import { createHotel, deleteHotel, getAllHotel, getAllHotelByCity, getSingleHotel, updateHotel } from "../controllers/hotelController.js";
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


// GET HOTEL BY FEATURRS
hotelRouter.get("/count_by_city", getAllHotelByCity)

// hotelRouter.get("/countByType", getAllHotelByType)


//GET ONE HOTEL BY ID
hotelRouter.get("/:id", getSingleHotel);





export default hotelRouter;