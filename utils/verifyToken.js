import jwt from "jsonwebtoken";
import { customError } from "./customError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log("token Verify: ", token)
    if (!token) {
        return next(customError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(customError(403, "Token is not valid!"));
        req.user = user;
        // console.log("token Verify: ", user)
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log(req.user.id, req.params.id);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(customError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {

    verifyToken(req, res, () => {

        if (!req.user) return next(customError(401, "You are not authenticated!"));

        if (req?.user?.isAdmin) {
            next();
        } else {
            return next(customError(403, "You are not ADMIN!"));
        }
    });
};



// const verifyModarator = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (!req.user) return next(customError(401, "Bad Guy :) you are not Authenticated!"))
//         if (req?.user?.isModarator) {
//             next()
//         } else {
//             return next(customError(401, "Sorry, we Can't verify your Admin Identity..."))
//         }
//         return next();
//     })
// }


// const userVerification = (req, res, next) => {
//     const user = verifyToken;
//     const providedToken = req.params.token;

//     if (user.token === providedToken) {
//         return next();
//     }
//     else {
//         return next(customError(403, "You are not Authenticated! Try again with your cradintial"))
//     }
// }