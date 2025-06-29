import { Router } from "express";
import { signupHandler, loginHandler } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);

export default router;