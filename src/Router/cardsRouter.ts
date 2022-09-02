import { Router } from "express";
import { verifyApiKey } from "../middlewares/verifyApiKey.js";
import { validateSchema } from "../middlewares/schemasValidator.js";
import typeCards from "../schemas/typeCardsSchema.js"
import { newCard, activateCard, sendCards, sendBalance, blockCard, unlockCard } from "../controllers/CardController.js";

const cardsRouter = Router();

cardsRouter.post("/cards", verifyApiKey, validateSchema(typeCards), newCard); //criacao do cartao
cardsRouter.put("/activatecard", activateCard); // ativacao do cartao
cardsRouter.get("/card", sendCards); //visualizacao do cartao
cardsRouter.get("/cards/:id", sendBalance); //vizualizacao de saldo e tranzacoes
cardsRouter.put("/cards/block", blockCard);
cardsRouter.put("/cards/unlock", unlockCard);

export default cardsRouter;