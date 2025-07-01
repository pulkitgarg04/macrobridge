import { Router } from "express";
import { 
  getAvailableAction, 
  getActionById, 
  createAction, 
  updateAction, 
  deleteAction,
} from "../controllers/action.controller";

const router = Router();

router.get("/available", getAvailableAction);
router.get("/:id", getActionById);
router.post("/", createAction);
router.put("/:id", updateAction);
router.delete("/:id", deleteAction);

export default router;