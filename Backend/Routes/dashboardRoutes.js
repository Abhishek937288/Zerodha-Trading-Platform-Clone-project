import { Router } from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { getDashboard } from "../Controllers/dashboardController.js";

const router = Router();

router.get("/",protectRoute,getDashboard);

export default router ;