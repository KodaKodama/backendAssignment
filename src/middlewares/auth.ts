import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const User = require('../models/userModel');

// Define a custom interface that extends the Request interface
interface AuthenticatedRequest extends Request {
    user?: any; // Define the user property as optional
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            err: "Token not found"
        });
    }

    const token = authHeader.split(" ")[1]; // Extract token from authorization header

    try {
        const decode: any = jwt.verify(token, "secret message");
        console.log(decode);
        const user = await User.findOne({ _id: decode.user.id });
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                err: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            err: "Invalid token"
        });
    }
};

const isSeller = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user.isSeller) {
        next();
    } else {
        return res.status(401).json({
            err: "You are not a seller"
        });
    }
};

export { isAuthenticated, isSeller };