import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { checkExpirationDate } from "./cardService.js";
import { sendBalance } from "./cardService.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export async function cardPurchases(
	idBusiness: number,
	idCard: number,
	passwordCard: string,
	value: number
) {
	const cryptr = new Cryptr(process.env.SECRET);

	const card = await cardRepository.findById(idCard);
    //console.log(card)
	if (!card) throw { code: "NotFound", message: "Cartão não encontrado." };

	if (!card.password) throw { code: "BadRequest", message: "Cartão inativo!" };

	const decodedPassword = cryptr.decrypt(card.password);

   // console.log(card)

	if (decodedPassword !== passwordCard)
		throw { code: "Anauthorized", message: "Senha incorreta." };

	if (checkExpirationDate(card.expirationDate))
		throw { code: "BadRequest", message: "Cartão expirado." };

	if (card.isBlocked)
		throw { code: "BadRequest", message: "Cartão bloqueado." };

	const establishment = await businessRepository.findById(idBusiness);

	if (!establishment)
		throw { code: "NotFound", message: "Estabelecimento não encontrado." };

	if (card.type !== establishment.type)
		throw {	code: "Anauthorized", message: "O tipo de estabelecimento não é o mesmo do tipo do cartão!",};

	const { balance } = await sendBalance(idCard);

	if (balance < value) {
		throw { code: "BadRequest", message: "Saldo insuficiente!" };
	} else {
		await paymentRepository.insert({
			cardId: idCard,
			businessId: idBusiness,
			amount: value,
		});
	}
}