import { Request, Response } from "express";
import * as cardsServices from "../services/cardService.js";

export async function newCard(req: Request, res: Response) {

    const apiKey = res.locals.key;
    const typeCard = req.body.type;
    const idEmployee = Number(req.body.id);

    await cardsServices.newCard(apiKey, typeCard, idEmployee);

    res.sendStatus(201);
    
}

export async function activateCard(req:Request, res: Response) {

    const body = req.body;
    //console.log(body)
    await cardsServices.activateCard(Number(body.id), body.password, body.cvc);
   // console.log(body)
    res.sendStatus(201);
}

export async function sendCards(req:Request, res: Response) {
	const {id , passwords} =req.body;
    const card = await cardsServices.sendCards(Number(id),passwords);

    res.status(200).send(card)
}

export async function sendBalance(req: Request, res: Response) {
	const { id } = req.params;

    //console.log()

	const balance = await cardsServices.sendBalance(Number(id));

	res.status(200).send(balance);
}