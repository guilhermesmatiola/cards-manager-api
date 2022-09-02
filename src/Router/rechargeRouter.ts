import { Router } from "express";
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import rechargeValue from "../schemas/rechargeSchema.js";
import { rechargeCard } from "../controllers/RechargeController.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:id", verifyApiKey, validateSchema(rechargeValue), rechargeCard);

export default rechargeRouter;