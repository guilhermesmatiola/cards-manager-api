import { Router } from "express";
import { validateSchema } from "../middlewares/schemasValidator.js";
import { cardPurchases } from "../controllers/PurchaseController.js";
import purchase from "../schemas/purchaseSchema.js";

const purchaseRouter = Router();

purchaseRouter.post("/purchases/:id", validateSchema(purchase), cardPurchases); //id do estabelecimento no param

export default purchaseRouter;