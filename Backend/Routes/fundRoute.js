import { Router } from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { addFund, getFundAmount } from "../Controllers/FundsController.js";
const router = Router();

router.post("/", protectRoute, addFund);
router.get("/", protectRoute, getFundAmount);

export default router;
