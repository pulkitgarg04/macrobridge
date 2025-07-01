import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware: RequestHandler = (req, res, next) => {
    const publicRoutes = ['/api/v1/user/signup', '/api/v1/user/login', '/api/v1/trigger/available', '/api/v1/actions/available'];
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    const { token } = req.cookies;
    console.log("token, " + token);
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET || "MySecret") as JwtPayload;

        // @ts-ignore
        req.id = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};