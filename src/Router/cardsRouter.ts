import { Router } from "express";
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import typeCards from "../schemas/typeCardsSchema.js"
import { newCard } from "../controllers/CardController.js";

const cardsRouter = Router();

cardsRouter.post("/cards", verifyApiKey, validateSchema(typeCards), newCard);

export default cardsRouter;