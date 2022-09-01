import { Request, Response } from "express";

export function verifyApiKey(req: Request, res: Response, next) {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey)
		throw { code: "BadRequest", message: "É necessário uma chave de api." };

	res.locals.key = apiKey;

	next();
}