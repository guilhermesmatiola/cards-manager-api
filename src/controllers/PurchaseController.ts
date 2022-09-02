import { Request, Response } from "express";
import * as paymentsServices from "../services/purchaseService.js";

export async function cardPurchases(req: Request, res: Response) {
	const { id } = req.params;
	const data = req.body;

	await paymentsServices.cardPurchases(
		Number(id),
		Number(data.idCard),
		data.password,
		Number(data.value)
	);

	res.status(201).send("Pagamento efetuado.");
}