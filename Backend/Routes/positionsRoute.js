import { Router } from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { positions } from "../Controllers/positionsController.js";
const router = Router();

router.get("/", protectRoute, positions);

export default router;
