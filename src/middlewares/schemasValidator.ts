import { Request, Response } from "express";

export function validateSchema(schema) {
	return (req: Request, res: Response, next) => {
		const { error } = schema.validate(req.body);
		if (error)
			throw { code: "WrongType", message: "Tipo de cartão incorreto." };

		next();
	};
}