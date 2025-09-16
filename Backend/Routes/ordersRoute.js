import { Router } from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { buy, orders ,sell} from "../Controllers/ordersController.js";
const router = Router();

router.get ("/",protectRoute,orders)
router.post("/buy",protectRoute,buy);
router.post("/sell",protectRoute,sell);

export default router ;
