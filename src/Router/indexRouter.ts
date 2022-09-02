import { Router } from "express";
import cardsRouter from "./cardsRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import purchaseRouter from "./purchaseRouter.js";

const router = Router();

router.use(cardsRouter);
router.use(rechargeRouter);
router.use(purchaseRouter);

export default router;