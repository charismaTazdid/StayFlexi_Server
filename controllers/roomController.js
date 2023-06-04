import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { customError } from "../utils/customError.js";


export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        res.status(200).json(savedRoom);

    } catch (err) {
        next(err)
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err)
    }
};

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const roomId = req.params.roomid;

    try {
        await Room.findByIdAndDelete(roomId);
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } })
        res.status(200).json("Room Has been Deleted");
    } catch (err) {
        next(err)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

export const getSingleRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};