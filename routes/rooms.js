import express from "express";
import { createRoom, deleteRoom, getAllRoom, getSingleRoom, updateRoom } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const roomsRouter = express.Router();

//CREATE
roomsRouter.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
roomsRouter.put("/:id", verifyAdmin, updateRoom);

//DELETE
roomsRouter.delete("/:roomid/:hotelid", verifyAdmin, deleteRoom);

//GET ALL ROOMS
roomsRouter.get("/", getAllRoom);

//GET ONE ROOM BY ID
roomsRouter.get("/:id", getSingleRoom);


export default roomsRouter;