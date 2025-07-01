import { Router } from "express";
import { signupHandler, loginHandler, getUserInfo } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/", getUserInfo);

export default router;