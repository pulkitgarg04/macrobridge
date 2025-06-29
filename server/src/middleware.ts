import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // @ts-ignore
        req.id = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};