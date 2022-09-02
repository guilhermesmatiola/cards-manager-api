import { Request, Response } from "express";
import * as rechargeServices from "../services/rechargeServices.js";

export async function rechargeCard(req: Request, res: Response) {
	const data = req.body;
	const { id } = req.params;
	const apikey = res.locals.key;

	await rechargeServices.rechargeCard(Number(id), Number(data.value), apikey);

	res.status(201).send("Recarga efetuda.");
}