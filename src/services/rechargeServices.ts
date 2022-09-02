import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { checkExpirationDate } from "./cardService.js";

export async function rechargeCard(id: number, value: number, apiKey: string) {
	const isKeyValid = await findByApiKey(apiKey);

	if (!isKeyValid) throw { code: "Anauthorized", message: "Api key inválida." };

	const card = await cardRepository.findById(id);

	if (!card) throw { code: "NotFound", message: "Cartão não encontrado." };

	if (!card.password) throw { code: "BadRequest", message: "Cartão inativo." };

	if (checkExpirationDate(card.expirationDate))
		throw { code: "BadRequest", message: "Cartão expirado." };

	await rechargeRepository.insert({ cardId: id, amount: value });
}