import { Router } from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { holdings } from "../Controllers/holdingsController.js";
const router = Router();

router.get("/",protectRoute,holdings);

export default router;