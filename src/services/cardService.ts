import { faker } from "@faker-js/faker";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import { findByTypeAndEmployeeId,TransactionTypes,insert, } from "../repositories/cardRepository.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository.js"

dotenv.config();

export async function newCard(
	apiKey: string,
	type: TransactionTypes,
	employeeId: number
) {
	const cryptr = new Cryptr(process.env.SECRET);

	const isKeyValid = await findByApiKey(apiKey);

	if (!isKeyValid) throw { code: "Anauthorized", message: "Api key inválida." };

	const isEmployeeRegistred = await findById(employeeId);

	if (!isEmployeeRegistred)
		throw { code: "NotFound", message: "Empregado/usuário não encontrado" };

	const cardsOfEmployee = await findByTypeAndEmployeeId(type, employeeId);

	if (cardsOfEmployee)
		throw {	code: "Conflict", message: "Cartão já registrado para esse empregado/usuário.",};

	const cardholderName = await cardName(isEmployeeRegistred.fullName);

	const expirationDate = await expireDate();

	const securityCode = cryptr.encrypt(faker.finance.creditCardCVV());

	const number = faker.finance.creditCardNumber();

	await insert({
		employeeId,
		number,
		cardholderName,
		securityCode,
		expirationDate,
		isVirtual: false,
		isBlocked: true,
		type,
	});
}

async function cardName(name: string) {
	const separateName = name.split(" ").filter((elem) => elem.length >= 3);

	const nameForCard = separateName
		.map((elem: string, index: number, array: []) => {
			if (index !== 0 && index !== array.length - 1) {
				return elem.slice(0, 1);
			} else {
				return elem;
			}
		}).join(" ").toUpperCase();

	return nameForCard;
}

async function expireDate() {
	const expireDate = new Date();
	const year = String(expireDate.getFullYear() + 5);
	const month = expireDate.getMonth();

	return `${month}/${year.slice(-2)}`;
}

export async function activateCard(id:number, newPassword:string, code: string) {
	
	const cryptr = new Cryptr(process.env.SECRET);
	const card = await cardRepository.findById(id)

	if(!card)
		throw {code: "NotFound", message: "Não existe esse cartão"}

	if(checkExpirationDate(card.expirationDate))
		throw {code: "BadRequest", message: "O cartão está vencido"}

	if(card.password)
		throw {code: "BadRequest", message: "O cartão está ativo"}
	
	const cvc = cryptr.decrypt(card.securityCode);
	console.log(cvc)
	if(cvc!==code)
		throw {code: "Anauthorized", message: "O Código de Verificação de Cartão (CVC) está errado"}
	
	if(newPassword.length !== 4)
		throw {code: "WrongType", message: "A senha precisa ter 4 (quatro) dígitos"}

	const password = cryptr.encrypt(newPassword);
	await cardRepository.update(id, { password });

}

function checkExpirationDate(expirationDate: string) {
	const date = new Date();
	const year = String(date.getFullYear());
	const month = date.getMonth();
	const actualDate = `${month}/${year.slice(-2)}`;

	if (actualDate > expirationDate) {
		return true;
	} else {
		return false;
	}
}