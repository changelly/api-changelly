Instant exchange API
=====================================

The following methods are used to empower your service with Changelly exchange features. You can request more features by contacting our developers team. Changelly API is a white-label exchange solution.

### **Table of contents**:

* [Basic info](#basic-info)
* [Fixed Rate Exchange Feature](#fixed-rate-exchange-feature)
* [Getting started](#getting-started)
* [Your API extra fee](#your-api-extra-fee)
* [Usage](#usage)
      - [Use Case](#use-case)
      - [Protocol](#protocol)
      - [Authentication](#authentication)
         * [Node.js authentication](#nodejs-authentication)
         * [Postman authentication](#postman-authentication)
      - [Currency List](#currency-list)
      - [Minimum Exchangable Amount](#minimum-exchangable-amount)
      - [Estimated Exchange Amount](#estimated-exchange-amount)
      - [Generating Transaction](#generating-transaction)
      - [Identifying The Transaction](#identifying-the-transaction)
      - [Getting Exchange Status](#getting-exchange-status)
* [Fixed Rate Methods](#fixed-rate-methods)
* [Currencies logo](#currencies-logo)
* [KYC/AML Policy](#kycaml-policy)
* [Support](#support)
  - [Dedicated Support-Line](#dedicated-support-line)
  - [Online Transactions History](#online-transactions-history)
* [Generate API Keys](#developers-page__bottom)


### **Basic info**

1. Please read for better understanding [https://medium.com/@Changelly/changelly-api-to-robust-your-crypto-business-25f5030bc803](https://medium.com/@Changelly/changelly-api-to-robust-your-crypto-business-25f5030bc803).
2. Welcome to check these articles on implementation examples in the other crypto wallets: [Trezor](https://medium.com/@Changelly/changelly-api-trezor-wallet-514662179fd8), [BRD](https://medium.com/@Changelly/the-coolest-feature-of-brd-a-short-how-to-use-guide-8e9805c49019), [Coinomi](https://medium.com/@Changelly/exchange-crypto-coinomi-5b7a7b7bac54), [Ginco]( https://medium.com/gincowallet/changelly-is-now-available-on-ginco-dfc79c59cd43), [Huobi](https://medium.com/@Changelly/huobi-wallet-guide-how-to-exchange-crypto-ee11e38a1eec), [Jelurida](https://medium.com/@Changelly/changelly-partnered-jelurida-618089e27328)
3. [The usage scheme could be useful for you.](https://imgur.com/yngIkiv)

### **Fixed Rate Exchange Feature**

1. New way of exchanging the crypto assets
2. 90+ cryptos available for the fixed-rate exchanges
3. Users get the exact amount of money as they expected
4. Less technical support requests on the subject of rate fluctuation and compensation

### **Getting started**

1. Register and get an API key — [generate](/developers#keys "https://changelly.com/developers#keys");
2. Read the following documentation;
3. Open an issue if you have any questions;
4. You can also connect at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com").

* * *

### **Your API extra fee**

After setting up an API key you may want to set up your API extra fee.

For example, you may choose to charge a 0.5% fee (we can set up any commission you want). Our fee is fixed at 0.5%. Thus, your users should pay a 1% commission in total.

To set up an extra commission, [please email us](mailto:pro@changelly.com "pro@changelly.com") with a link to your service.

Your API extra commission is included in a result of `getExchangeAmount` function call. All fees are always in output currency.

Usage
-----

[Usage schema](https://imgur.com/yngIkiv)

Implementation examples on GitHub:

* [Node.js](https://github.com/changelly/api-changelly "https://github.com/changelly/api-changelly")
* [C#](https://github.com/changelly/changelly-examples/blob/master/c#/ChangellyExample.cs "https://github.com/changelly/changelly-examples/blob/master/c#/ChangellyExample.cs")
* [Python](https://github.com/changelly/changelly-examples/blob/master/python/example.py "https://github.com/changelly/changelly-examples/blob/master/python/example.py")
* [PHP](https://github.com/changelly/changelly-examples/blob/master/php/example.php "https://github.com/changelly/changelly-examples/blob/master/php/example.php")

Postman Collection and short description of API methods with examples: [https://api-docs.changelly.com](https://api-docs.changelly.com/ "https://api-docs.changelly.com/"). You will need to set up authentication to use Postman with our API.

API URL: `https://api.changelly.com`

### **Use Case**

Here is simple use case of our exchange API:

1.  API — get available at the current moment list of currencies with `getCurrencies` or `getCurrenciesFull` method;
2.  GUI — ask user for currency pair he wants to exchange. For example, it can be LTC (Litecoin) to ETH (Ethereum);
3.  API — get minimum exchangeable amount for selected currency pair with `getMinAmount` method;
4.  GUI — ask user for the amount to exchange;
5.  API — call `getExchangeAmount` method to get estimated ETH amount after exchange;
6.  GUI — show an estimated amount to user and ask for confirmation;
7.  GUI — ask user for his wallet address to send coins after exchange;
8.  API — call `createTransaction` method to get the LTC address to which user should send his funds;
9.  GUI — ask user to send LTC coins to the address for exchange;
10.  User sends LTC. We receive LTC and exchange it for ETH. We send ETH to the address that was submitted to `createTransaction` method;
12.  Via `getTransactions` method you can get all the transactions history.

### **Protocol**

Changelly API uses JSON-RPC 2.0 protocol.

Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getMinAmount",
   "params": {
      "from": "ltc",
      "to": "eth"
   }
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": "0.0008563"
}
```

Id used is a custom ID generated at the client side to distinguish responses. You may use any value you want.

### **Authentication**

All requests must contain the following headers:

| **Header** | **Description**                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| api-key    | your api key                                                                                  |
| sign       | the query's serialized body signed by your key's "secret" according to the HMAC-SHA512 method |


### **Node.js authentication**

Example of how to sign a request with node.js `crypto` module:

```js
const crypto = require("crypto");

const message = {
  "jsonrpc": "2.0",
  "id": "test",
  "method": "getMinAmount",
  "params": {
    "from": "ltc",
    "to": "eth"
  },
};

const sign = crypto
   .createHmac('sha512', apiSecret)
   .update(JSON.stringify(message))
   .digest('hex');
```

### **Postman authentication**

Here is a small guide how to properly sign transaction with postman:

1. Add new environment.

![Postman add new environment](https://i.imgur.com/JRKa2qb.png)

2. Add `sign` and `api-key` variables to the new environment.

![Postman manage environments setupt](https://i.imgur.com/P0sMNz7.png)

3. Create new request. Being on the `Headers` tab add `sign` and `api-key` headers. Use postman variable syntax for them in `Value` column. These variables will be updated for each request using the pre-request script.

![Postman headers setup](https://i.imgur.com/xfwxoQY.png)

4. Paste the following code to the `Pre-request Script` tab for the request. Fill up the apiKey and secret variables. Be very careful not to accidentally share your secret.

```js

const crypto = require('crypto-js')

const apiKey = ''
const secret = ''

const sign = crypto.HmacSHA512(request.data, secret).toString()

postman.setEnvironmentVariable('apiKey', apiKey)
postman.setEnvironmentVariable('sign', sign)

```

![Postman pre-request script setup](https://i.imgur.com/tpiMzIu.png)

### **Currency List**

Commands `getCurrencies` and `getCurrenciesFull` will return you the currency list available for exchange. Check the list of available currencies at [Supported currencies page](https://changelly.com/supported-currencies "https://changelly.com/supported-currencies") before you start. Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getCurrencies",
   "params": {},
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": [
      "btc",
      "ltc",
      "eth",
      "doge",
      "xrp",
      "xem",
      "lsk",
      "xmr",
      "zec"
   ]
}
```

_Note and warning_: getCurrencies returns a list of currently enabled currencies. We can disable and enable any currency at any time and the response list will reflect the change. Use `getCurrenciesFull` to get list of all available currencies along with description and state.

### **Minimum Exchangable Amount**

To proceed with exchange we need it to be larger than the certain amount. Use `getMinAmount` with a currency pair (`from`, `to`) to notify users of the minimum amount they need to send.

Example:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getMinAmount",
   "params": {
      "from": "ltc",
      "to": "eth",
   }
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": "0.0008563"
}
```

**NOTE: most of the users do not read the information about the minimum amount. Be sure to highlight this information in your UI. If users send less than the minimum amount, their coins will likely be lost.**

### **Estimated Exchange Amount**

You can show users the estimated amount of coins they receive as a result of exchange using `getExchangeAmount`. You need to provide the request with currency pair (`from`, `to`) and the `amount` user is going to exchange. Estimated `result` property includes Changelly plus partner extra fee. All fees are always in output currency. Your API extra fee will decrease the estimated `result`.

Example:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getExchangeAmount",
   "params": {
      "from": "ltc",
      "to": "eth",
      "amount": "3.99"
   },
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": "0.72596439091239070521"
}
```

When requesting more than 1 currency pair with getExchangeAmount you just have to pass array of arguments.

```json
{
  "jsonrpc": "2.0",
  "method": "getExchangeAmount",
  "params": [
    {
      "from": "eth",
      "to": "wax",
      "amount": "1"
    },
    {
      "from": "btc",
      "to": "wax",
      "amount": "1"
    }
  ],
  "id": 1
}
```

Example response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "from": "eth",
      "to": "wax",
      "networkFee": "10.0000000000000000000000",
      "amount": "1",
      "result": "3279.52",
      "visibleAmount": "3296",
      "rate": "3296",
      "fee": "16.48"
    },
    {
      "from": "btc",
      "to": "wax",
      "networkFee": "10.0000000000000000000000",
      "amount": "1",
      "result": "126612.755",
      "visibleAmount": "127249",
      "rate": "127249",
      "fee": "636.245"
    }
  ]
}
```

Example response fields:

| Property | Description |
|---------------|--------------------------------------------------------------------------|
| from | currency to exchange from |
| to | currency to exchange for |
| amount | amount of currency you are going to send |
| networkFee | commission that is taken by the network from the amount sent to the user |
| visibleAmount | the amount before any fees are deducted |
| rate | current rate of exchange |
| fee | exchange fee |
| result | includes exchange fee |

### **Generating Transaction**

After a successful call of `createTransaction` method you get a unique id to track the transaction status and a payin address for user to send money to.

`createTransaction`, once get called, creates a pair of deposit and payout address. If somebody sends coins to the same address twice, without second call to createTransaction, the coins will be exchanged and sent to the user's payout address.

| Property | Required or optional | Description |
|----------|----------------------|-------------|
| from     | required             | currency to exchange from |
| to       | required             | currency to exchange for |
| address  | required             | recipient address |
| extraId  | optional             | property for addresses of currencies that use additional ID for transaction processing (XRP, XLM, EOS, IGNIS, BNB, XMR, ARDOR, DCT, XEM) |
| refundAddress | optional | used in case of refund |
| refundExtraId | optional | same as of `extraId` but for `refundAddress` |

Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "createTransaction",
   "params": {
      "from": "doge",
      "to": "ltc",
      "address": "<<valid ltc address>>",
      "extraId": null,
      "amount": 1
   }
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": {
      "id": "jev5lt0qmg26h48v",
      "apiExtraFee": "0",
      "changellyFee": "0.5",
      "payinExtraId": null,
      "payoutExtraId": null,
      "amountExpectedFrom": 1,
      "amountExpectedTo": 3.99,
      "status": "new",
      "currencyFrom": "eth",
      "currencyTo": "ltc",
      "amountTo": 0,
      "payinAddress": "<<doge address to send coins to>>",
      "payoutAddress": "<<valid ltc address>>",
      "createdAt": "2018-09-24T10:31:18.000Z"
   }
}
```

Example response fields:

| Property           | Description                                                            |
|--------------------|------------------------------------------------------------------------|
| id                 | Transaction ID. Could be used in `getStatus` method                    |
| apiExtraFee        | Your API Extra fee in percents                                         |
| changellyFee       | Changelly fee in percents                                              |
| payinAddress       | Address for a user to send coins to                                    |
| payinExtraId       | `ExtraId` for `payinAddress` in case it is required                    |
| payoutAddress      | Address where the exchange result will be sent to                      |
| payoutExtraId      | `ExtraId` for `payoutAddress` in case it is required                   |
| amountExpectedFrom | `amount` from `createTransaction`                                      |
| amountExpectedTo   | `result` from `getExchangeAmount` at the moment of `createTransaction` |
| status             | Transaction status                                                     |
| currencyTo         | Ticker of input currency                                               |
| currencyFrom       | Ticker of output currency                                              |
| amountTo           | Real amount after the exchange that was sent to `payoutAddress`        |
| createdAt          | Point of time when the transaction was created                         |

Example 2 request:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "method": "createTransaction",
  "params": {
    "from": "doge",
    "to": "ltc",
    "address": "<<valid ltc address>>",
    "extraId": null,
    "amount": 1,
    "refundAddress": "<<valid doge address to make automatic refund in case of transaction fail>>",
    "refundExtraId": null
  },
}
```

Example 2 response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": {
      "id": "pgj49c80p572minj",
      "apiExtraFee": "0",
      "changellyFee": "0.5",
      "payinExtraId": null,
      "payoutExtraId": null,
      "refundAddress": "<<doge refund address>>",
      "refundExtraId": null,
      "amountExpectedFrom": 1,
      "status": "new",
      "currencyFrom": "eth",
      "currencyTo": "ltc",
      "amountTo": 0,
      "payinAddress": "<<doge address to send coins to>>",
      "payoutAddress": "<<valid ltc address>>",
      "createdAt": "2018-09-24T10:33:39.000Z"
   }
}
```

_Note_: `amountTo: 0` is expected. `amountTo` will have non-zero value when transaction is in `finished` state.

### **Identifying The Transaction**

To identify transaction the id from the `createTransaction` method is used.

Also you can use `getTransactions` method to list all transactions that satisfy request params.

_Note on transaction processing:_ It's common situation when there are many transactions in `waiting` status when processing payin. In this case transaction with `waiting` status and _the nearest_ amount is selected. And in case there are many - the earleast of them is selected. If the are no transactions in `waiting` status then new transaction is created automatically.

All parameters for this method are optional.

| Parameter | Description                      |
|-----------|----------------------------------|
| currency  | currencyFrom to filter           |
| address   | sender address to filter         |
| extraId   | use if address needs any extraId |
| limit     | how many records to retreive     |
| offset    | records cursor                   |


Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getTransactions",
   "params": {
      "currency": "doge",
      "address": "<<payin address to search>>",
      "extraId": null,
      "limit": 10,
      "offset" : 10
   }
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": [{
      "id": "pgj49c80p572minj",
      "createdAt": 1537785219,
      "moneyReceived": 0,
      "moneySent": 0,
      "payinConfirmations": "0",
      "status": "waiting",
      "currencyFrom": "doge",
      "currencyTo": "ltc",
      "payinAddress": "<<payin address>>",
      "payinExtraId": null,
      "payinHash": null,
      "amountExpectedFrom": "1",
      "payoutAddress": "",
      "payoutExtraId": null,
      "payoutHash": null,
      "refundHash": null,
      "amountFrom": "",
      "amountTo": "0",
      "networkFee": null,
      "changellyFee": "0.5",
      "apiExtraFee": "0"
   }, {
      "id": "7kcc21x5z66f5vv9",
      "createdAt": 1535638050,
      "moneyReceived": 1535638050,
      "moneySent": 0,
      "payinConfirmations": "1",
      "status": "confirming",
      "currencyFrom": "btc",
      "currencyTo": "doge",
      "payinAddress": "<<payin address>>",
      "payinExtraId": null,
      "payinHash": "txid4",
      "amountExpectedFrom": "0",
      "payoutAddress": "<<payout address>>",
      "payoutExtraId": null,
      "payoutHash": null,
      "refundHash": null,
      "amountFrom": "1",
      "amountTo": "0",
      "networkFee": null,
      "changellyFee": "0.5",
      "apiExtraFee": "0"
   }]
}
```

Note: first

### **Getting Exchange Status**

With the transaction ID, obtained from createTransaction call, you can get exchange status to notify your user or provide additional support.

Example:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getStatus",
   "params": {
      "id": "pgj49c80p572minj"
   }
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": "waiting"
}
```

**Possible transaction statuses:**

|**Status**|**Description**|
|----------|---------------|
|waiting|Transaction is waiting for an incoming payment.|
|confirming|We have received payin and are waiting for certain amount of confirmations depending of incoming currency.|
|exchanging|Payment was confirmed and is being exchanged.|
|sending|Coins are being sent to the recipient address.|
|finished|Coins were successfully sent to the recipient address.|
|failed|Transaction has failed. In most cases, the amount was less than the minimum. Please contact support and provide a transaction id.|
|refunded|Exchange failed and coins were refunded to user's wallet. The wallet address should be provided by user.|
|overdue|We did not receive any payment since 36 hours from transaction creation.|
|hold|Due to AML/KYC procedure, exchange may be delayed|
|expired|In case payin was not sent within the indicated timeframe|

### **Fixed Rate Methods**

For fixed-rates we’ve added three methods in our API: `getFixRate`, `getFixRateForAmount` and `createFixTransaction`.

#### **Getting the Fixed Rate**

API Call - `getFixRate`

Request params example:

```json
{
  "id": "test",
  "jsonrpc": "2.0",
  "method": "getFixRate",
  "params": [
    {
      "from": "eth",
      "to": "btc"
    },
    {
      "from": "eth",
      "to": "wax"
    }
  ]
}
```

Response example:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": [
    {
      "id": "f4dd43106d63b65b88955a0b362645ce960987c7ffb7a8480dd32e799431177f",
      "result": "0.02556948",
      "from": "eth",
      "to": "btc",
      "maxFrom": "50.000000000000000000",
      "maxTo": "1.27847400",
      "minFrom": "0.148414210000000000",
      "minTo": "0.00379488"
    },
    {
      "id": "f4dd43107876ad5b88955a0b362645ce960a87c0fdb7ab540ed635799230107e830d3f",
      "result": "3237.50839254",
      "from": "eth",
      "to": "wax",
      "maxFrom": "27.799155735744717075",
      "maxTo": "89999.99999999",
      "minFrom": "0.187060000000000000",
      "minTo": "605.60831991"
    }
  ]
}
```
* minFrom, minTo, maxFrom, maxTo - denote the frame, inside of which we would be able to perform the fix rate exchange and give to the user the exact amount of assets that was shown initially
* “Max” and “min” params here denote the frame, inside of which we would be able to perform the fix rate exchange and give to the user the exact amount of assets that was shown initially
* fix rate methods return `rateId` that can be used for 2 minutes. This time should be enough for user to initiate the exchange
* `id` has to be stored somewhere and will be used as `rateId` param while calling 
* Expired `rateId` cannot be used for creation of the fixed-rate transaction
* `result` or `rate` is a parameter that you can show to the user as the exchange rate
* Important: users shall send the exact amount of funds which were specified as a pay-in amount. In case, users send different sum - the transaction can be automatically refunded
* Important: for fixed rate transactions to process successfully, refund address must be presented as well as refund extraId if needed

`getFixRateForAmount` returns a fixed exchange result of amount provided. It needs an additional parameter `amountFrom` user is going to exchange and returns `amountTo` user receive.

First of all, you need to be sure about your amount is greater or equal than minimal amount and less or equal than maximal amount.

For this, you need to call `getPairsParams` for fetching minimal and maximal amount for current pair.

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getPairsParams",
    "params": [
      {
    	  "from": "eth",
    	  "to": "btc"
      },
      {
    	  "from": "eth",
    	  "to": "wax"
      }
    ]
}
```

`getPairsParams` response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": [
        {
            "from": "eth",
            "to": "btc",
            "minAmountFloat": "0.042300000000000000",
            "maxAmountFloat": null,
            "minAmountFixed": "0.28200000000000000",
            "maxAmountFixed": "73.0000000000000000000000"
        },
        {
            "from": "eth",
            "to": "wax",
            "minAmountFloat": "0.03",
            "maxAmountFloat": null,
            "minAmountFixed": "0.2",
            "maxAmountFixed": "73.0000000000000000000000"
        }
    ]
}
```
`minAmountFixed` and `maxAmountFixed` gives a range for amount provided by user.

So, main difference between `getFixRateForAmount` and `getFixRate`  methods is that `getFixRateForAmount` fetch fixed amount according to additional parameter field `amountFrom`.

Request params example:

```json
{
  "id": "test",
  "jsonrpc": "2.0",
  "method": "getFixRateForAmount",
  "params": [
    {
      "from": "eth",
      "to": "btc",
      "amountFrom": "5.2"
    },
    {
      "from": "eth",
      "to": "wax",
      "amountFrom": "2.25"
    }
  ]
}
```

Response example:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": [
    {
      "id": "f4dd43106d63b65b88955a0b362645ce960987c7ffb7a8480dd32e799431177f",
      "rate": "0.02556948",
      "from": "eth",
      "to": "btc",
      "amountFrom": "5.2",
      "amountTo": "0.132961296"
    },
    {
      "id": "f4dd43107876ad5b88955a0b362645ce960a87c0fdb7ab540ed635799230107e830d3f",
      "rate": "3237.50839254",
      "from": "eth",
      "to": "wax",
      "amountFrom": "2.25",
      "amountTo": "7284.393883215"
    }
  ]
}
```
* `id` has to be stored somewhere and will be used as `rateId` param for 30 seconds while calling.
* Expired `rateId` cannot be used for creation of the fixed-rate transaction.
* `rate` is a parameter that you can show to the user as the exchange rate.
* `from` and `to` parameters are present exchange pair provided by user.
* `amountFrom` is a copy of provided by user `amountFrom` request's parameter.
* `amountTo` is fixed exchange amount of assets that user will receive after create fixed-rate transaction with current `rateId`.

If amount will not be correspond with minimal and maximal range for amount than error will be thrown.

Request params example:

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getFixRateForAmount",
    "params": [
    	{
    		"from": "eth",
    		"to": "btc",
    		"amountFrom": "0.00034"
    	}
    ]
}
```

Response example:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "error": {
        "code": -32600,
        "message": "invalid amount: minimal amount is 0.28200000000000000"
    }
}
```

`getFixRateBulk` gives rate for all available currency pairs.

Request params example:

```json
{
  "jsonrpc": "2.0",
  "method": "getFixRateBulk",
  "id": "1"
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": [
    {
      "from": "btc",
      "to": "eth",
      "result": "38.7971640000000049875",
      "max": "1.28875399",
      "maxFrom": "1.28875399",
      "maxTo": "49.999999905684366427",
      "min": "0.00121000",
      "minFrom": "0.00121000",
      "minTo": "0.046944568440000007",
      "id": "f3dd48106a*********ce940584c6fcb7ab5e13d6227b933e177781083b77aa904a37f602e47a"
    },
    {
      "from": "btc",
      "to": "etc",
      "result": "1236.4033500000000981",
      "max": "1.13231656",
      "maxFrom": "1.13231656",
      "maxTo": "1399.999988044476111080",
      "min": "0.00121000",
      "minFrom": "0.00121000",
      "minTo": "1.496048053500000119",
      "id": "f3dd48106a63b********ce940584c6fcb7a9540ed73578923b107281083b77aa904a33f602e2"
    }
  ]
}
```


#### **Creating a fixed rate transaction**

* Using `createFixTransaction` you need to provide the request with currency pair (`from`, `to`), recipient address, refund address (used in case of refund), rateID for this pair (that you get in getFixRate/getFixRateBulk requests) and the `amountFrom` user is going to exchange, or `amountTo` user wants to receive. All fields are required

* Important: in response there will be same fields presented as with the float rate api with `amountExpectedTo`. The number shown in the `amountExpectedTo` should be understood as a pay-out amount to the user

* In response there is a payTill field, where is indicated till what time user needs to make the payment

* Using `createFixTransaction` you can provide a sum, user wants to receive during the exchange. For this you need to indicate the sum in the field `amountTo`

* Important: you can’t provide fields `amountFrom` and amountTo at the same time.

Example request fields:

| Property | Required or optional | Description |
|---------------|----------------------|------------------------------------------------------|
| from | required | currency to exchange from |
| to | required | currency to exchange for |
| address | required | recipient address |
| refundAddress | optional | used in case of refund |
| amountFrom | required | amount user is going to exchange |
| amountTo | required | amount user wants to receive |
| rateId | required | that you get from getFixRate/getFixRateBulk requests |
| extraId  | optional             | property for addresses of currencies that use additional ID for transaction processing (XRP, XLM, EOS, IGNIS, BNB, XMR, ARDOR, DCT, XEM) |
| refundExtraId | optional | same as of `extraId` but for `refundAddress` |

Example of request with providing the sum user wants to send:

Request:

```json
{
  "id": "test",
  "jsonrpc": "2.0",
  "method": "createFixTransaction",
  "params": {
    "from": "btc",
    "to": "eth",
    "address": "0xee*******5E3DFc214",
    "amountFrom": "1",
    "rateId": "f3dd48106a63b*********b7ab5413d32c7b96301a7e82",
    "refundAddress": "1Bvjij5653y9****BGPuQBPzTZpb"
  }
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": {
    "id": "149a****m90",
    "apiExtraFee": "0",
    "changellyFee": "0.5",
    "payinExtraId": null,
    "payoutExtraId": null,
    "refundAddress": "1Bvjij5653y9r********QBPzTZpb",
    "amountExpectedFrom": "1.00000000",
    "amountExpectedTo": "32.277489930000000000",
    "payTill": "2019-05-28T13:30:26.898Z",
    "status": "new",
    "currencyFrom": "btc",
    "currencyTo": "eth",
    "amountTo": 0,
    "payinAddress": "3EkyEjzs********vZ95AyTM",
    "payoutAddress": "0xeee031413*******B8Cf5E3DFc214",
    "createdAt": "2019-05-28T13:10:26.000Z"
  }
}
```

Example of request with providing the sum user wants to receive:

Request:

```json
{
  "id": "test",
  "jsonrpc": "2.0",
  "method": "createFixTransaction",
  "params": {
    "from": "btc",
    "to": "eth",
    "address": "0xeee031*******E3DFc214",
    "amountTo": "0.0390573347142",
    "rateId": "f3dd48106a63bd5b88955a05********32c7495301a7783",
    "refundAddress": "1Bvjij5653y9r******QBPzTZpb"
  }
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": {
    "id": "44******kvi7bh",
    "apiExtraFee": "0",
    "changellyFee": "0.5",
    "payinExtraId": null,
    "payoutExtraId": null,
    "refundAddress": "1Bvjij5653*********BPzTZpb",
    "amountExpectedFrom": "0.00121000",
    "amountExpectedTo": "0.0390573347142",
    "payTill": "2019-05-28T13:42:17.079Z",
    "status": "new",
    "currencyFrom": "btc",
    "currencyTo": "eth",
    "amountTo": 0,
    "payinAddress": "3FWBE******nTBSeMN9dLHRQ",
    "payoutAddress": "0xeee03************Cf5E3DFc214",
    "createdAt": "2019-05-28T13:22:17.000Z"
  }

```

### **Currencies logo**

You can get logo of each currency with

[https://changelly.com/api/coins/btc.png](https://changelly.com/api/coins/btc.png)

### **KYC/AML Policy**

1. Kindly note that we have AML/KYC policy;
2. Due to this policy, users’ transactions may be held for KYC procedures;
3. That is why, before users start an exchange via our API, please, notify them about the possibility of holding the transactions for KYC procedures;
4. You may want to use the following text: “Exchange services provided by Changelly. By clicking “Accept”, I acknowledge and understand that my transaction may trigger AML/KYC verification according to Changelly AML/KYC”;
5. The text may appear in a form of a pop-up window, you are welcome to check the examples of a [desktop version notification](https://imgur.com/v0BDpk7) and a [mobile version notification](https://imgur.com/P540cbW);
6. We also propose you to notify the users when their transaction is held for KYC, using API ‘Hold’ status. You are welcome to check [the example](https://imgur.com/z5mK4yp) of such notification.

### **Support**

#### Dedicated Support Line

Changelly provides two options for support. Please choose your support line and inform us at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com"):

— You just redirect users to our support line;

— You provide the first line support from your side and send your tickets directly to our dedicated email address. These tickets are forwarded strictly to our second level support team. It will be assigned the highest priority. Please don't make our email public.

Inform us in case the dedicated support line is needed. Feel free to request it at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com").

Also, send us a link to your service, confirm that you are ready to provide support from your side and you won’t share this email with your clients.

The support line option is provided at the discretion of the Changelly's developer team.

#### Online Transactions History

You can check all the transactions with online stats on the [history page](https://changelly.com/history "https://changelly.com/history") in your personal account.
