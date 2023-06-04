import jwt from "jsonwebtoken";
import { customError } from "./customError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(customError(401, "you're not Authenticated."));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(customError(403, "Token is not Valid"));

        req.user = user;
        next();
    })
};

export const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin === true) {
            //user is authorized or admin
            next();
        }
        else {
            return next(customError(403, "you are not Authorized."))
        }
    })
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin === true) {
            next();
        }
        else {
            return next(customError(403, "you are not Admin."))
        }
    })
};