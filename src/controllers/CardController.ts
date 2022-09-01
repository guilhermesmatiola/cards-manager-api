import { Request, Response } from "express";
import * as cardsServices from "../services/cardService.js";

export async function newCard(req: Request, res: Response) {

    const apiKey = res.locals.key;
    const typeCard = req.body.type;
    const idEmployee = Number(req.body.id);

    await cardsServices.newCard(apiKey, typeCard, idEmployee);

    res.sendStatus(201);
    
}