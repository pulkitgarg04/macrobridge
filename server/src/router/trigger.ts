import { Router } from "express";
import { 
  getAvailableTrigger, 
  getTriggerById, 
  createTrigger, 
  updateTrigger, 
  deleteTrigger 
} from "../controllers/trigger.controller";

const router = Router();

router.get("/available", getAvailableTrigger);
router.get("/:id", getTriggerById);
router.post("/", createTrigger);
router.put("/:id", updateTrigger);
router.delete("/:id", deleteTrigger);

export default router;