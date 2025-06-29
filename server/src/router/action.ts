import { Router } from "express";
import { 
  getAvailableAction, 
  getActionById, 
  createAction, 
  updateAction, 
  deleteAction,
  getActionsByService,
  getActionsByType
} from "../controllers/action.controller";

const router = Router();

router.get("/available", getAvailableAction);
router.get("/service/:service", getActionsByService);
router.get("/type/:actionType", getActionsByType);
router.get("/:id", getActionById);
router.post("/", createAction);
router.put("/:id", updateAction);
router.delete("/:id", deleteAction);

export default router;