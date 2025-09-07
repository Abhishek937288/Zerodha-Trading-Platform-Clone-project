import { Router } from "express";
import {addStocksData} from "../Controllers/stocksController.js"

const router = Router();

router.post ("/addstocksdata",addStocksData);
router.get ("/getstocksdata",addStocksData);

export default router;
