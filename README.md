# projeto18-valex

rota criacao de cartao: cardsRouter.post("/cards", verifyApiKey, validateSchema(typeCards), newCard);

necessita header: x-api-key zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0

onde "type" : pode ser education, groceries, restaurant, transport, health

onde "id"   :   é o id do usuário, no caso 1 ou 2 (passados pelo script)

ex body:
{
    "type": "education",
    "id": "2"
}

----------------------------------
rota ativacao de cartao: cardsRouter.put("/activatecard", activateCard);
onde o "id" é o id do cartao criado
password string de 4 numeros
cvc: pegar com um console.log

ex body:
{
  "id": 4,
  "password": "1234",
  "cvc": "276"
}

----------------------------------
rota visualizacoa de cartao (*NAO PRECISAVA FAZER*): cardsRouter.get("/card", sendCards); 
onde id é o id do usuário e senha é a do cartao, mas as vezes da erro

ex body:
{
  "id":"1",
  "passwords": ["1234"]
}

----------------------------------
rota vizualizacao de saldo e tranzacoes: cardsRouter.get("/cards/:id", sendBalance); 

NÃO PRECISA DE BODY, apenas passar o id do cartao no param, ex: /cards/4
retorna:
{
  "balance": 0,
  "transactions": [
    {
      "id": 3,
      "cardId": 4,
      "businessId": 3,
      "timestamp": "2022-09-02T13:26:19.000Z",
      "amount": 2000,
      "businessName": "Driven Eats"
    },
    {
      "id": 2,
      "cardId": 4,
      "businessId": 3,
      "timestamp": "2022-09-02T13:23:51.000Z",
      "amount": 2000,
      "businessName": "Driven Eats"
    }
  ],
  "recharges": [
    {
      "id": 2,
      "cardId": 4,
      "timestamp": "2022-09-02T12:19:14.000Z",
      "amount": 2000
    },
    {
      "id": 3,
      "cardId": 4,
      "timestamp": "2022-09-02T12:36:03.000Z",
      "amount": 2000
    }
  ]
}

----------------------------------
rota bloqueio de carao: cardsRouter.put("/cards/block", blockCard);

onde "id" é o id do cartão
onde "password" é a senha do cartão

ex body:
{
  "id":4,
  "password": "1234"
}

----------------------------------
rota DESbloqueio de carao: cardsRouter.put("/cards/unlock", unlockCard);

onde "id" é o id do cartão
onde "password" é a senha do cartão

ex body:
{
  "id":4,
  "password": "1234"
}

----------------------------------
rota recarregar cartao: rechargeRouter.post("/recharge/:id", verifyApiKey, validateSchema(rechargeValue), rechargeCard); //

necessita header: x-api-key zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
id do cartao que se quer carregar no param

value é o valor da recarga

ex body:
{
  "value":2000
}

----------------------------------
rota comprar com o cartao: purchaseRouter.post("/purchases/:id", validateSchema(purchase), cardPurchases); //

id do estabelecimento no param 

idCard é o id do cartao usado
password é a senha do cartao usado
value é o valor gasto

*lembrando que o id do estabelecimento deve ser o mesmo do id do tipo do cartao criado

ex body:
{
  "idCard": 4,
  "password": "1234",
  "value": 2000
}


