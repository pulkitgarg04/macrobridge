import { Router, RequestHandler } from "express";
import { authMiddleware } from "../middleware";
import { createZapHandler, getZapHandler, getZapsHandler } from "../controllers/zap.controller";

const router = Router();

router.post("/", authMiddleware, createZapHandler);
router.get("/", authMiddleware, getZapsHandler);
router.get("/:zapId", authMiddleware, getZapHandler);

export default router;