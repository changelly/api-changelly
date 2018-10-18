Changelly cryptocurrency exchange API
=====================================

The following methods are used to empower your service with Changelly exchange features. You can request more features by contacting our developers team. Changelly API is white-labeled exhange.

### **Table of contents**:

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
  - [Socket.io](#socketio)
* [Support](#support)
  - [Dedicated Support-Line](#dedicated-support-line)
  - [Online Transactions History](#online-transactions-history)

Getting started
---------------

1. Register and get an API key — [generate](https://changelly.com/developers#keys "https://changelly.com/developers#keys");
2. Read the following documentation;
3. Open an issue if you have any questions;
4. You can also connect at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com").

* * *

Your API extra fee
------------------

After setting up an API key you may want to set up your API extra fee.

For example, you may choose to charge a 0.5% fee (we can set up any commission you want). Our fee is fixed at 0.5%. Thus, your users should pay a 1% commission in total.

To set up an extra commission, [please email us](mailto:pro@changelly.com "pro@changelly.com") with a link to your service.

Your API exrta commission is included in a result of `getExchangeAmount` function call. All fees are always in output currency.

Usage
-----

[Usage schema](https://changelly.com/content/faq/how_it_works.png)

Implementation examples on GitHub:

* [Node.js](https://github.com/changelly/api-changelly "https://github.com/changelly/api-changelly")
* [C#](https://github.com/changelly/changelly-examples/blob/master/c#/ChangellyExample.cs "https://github.com/changelly/changelly-examples/blob/master/c#/ChangellyExample.cs")
* [Python](https://github.com/changelly/changelly-examples/blob/master/python/example.py "https://github.com/changelly/changelly-examples/blob/master/python/example.py")
* [PHP](https://github.com/changelly/changelly-examples/blob/master/php/example.php "https://github.com/changelly/changelly-examples/blob/master/php/example.php")

Postman Collection and short description of API methods with examples: [https://api-docs.changelly.com](https://api-docs.changelly.com/ "https://api-docs.changelly.com/"). You will need to set up authentication to use Postman with our API.

API URL: `https://api.changelly.com`

#### Use Case

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
11.  Via [socket.io](http://socket.io/ "http://socket.io/") API functions you can get the user's transaction status online;
12.  Via `getTransactions` method you can get all the transactions history.

#### Protocol

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

#### Authentication

All requests must contain the following headers:

| **Header** | **Description** |
|------------|-----------------|
| api-key    | your api key    |
| sign       | the query's serialized body signed by your key's "secret" according to the HMAC-SHA512 method |


##### Node.js authentication

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

##### Postman authentication

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

#### Currency List

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

#### Minimum Exchangable Amount

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

#### Estimated Exchange Amount

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

To get rate for multiple currency pairs, you just have to pass array of arguments, i.e. for one currency pair:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getExchangeAmount",
   "params": [{
      "from": "ltc",
      "to": "eth",
      "amount": "3.99"
   }, {
      "from": "dash",
      "to": "xmr",
      "amount": "3.99"
   }]
}
```

Example response:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "result": [
      {
         "from": "ltc",
         "to": "eth",
         "amount": "3.99",
         "result": "0.7259643909123907"
      },
      {
         "from": "dash",
         "to": "xmr",
         "amount": "3.99",
         "result": "7.08872889023993085566"
      }
   ]
}
```

#### Generating Transaction

After a successful call of `createTransaction` method you get a unique id to track the transaction status and a payin address for user to send money to.

`createTransaction`, once get called, creates a pair of deposit and payout address. If somebody sends coins to the same address twice, without second call to createTransaction, the coins will be exchanged and sent to the user's payout address.

| Property | Required or optional | Description |
|----------|----------------------|-------------|
| from     | required             | currency to exchange from |
| to       | required             | currency to exchange for |
| address  | required             | recipient address |
| extraId  | optional             | property for addresses of currencies that use additional ID for transaction processing (XRP, STEEM/SBD, XLM, DCT, XEM) |
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

| Property | Description |
|----------|-------------|
| id       | Transaction ID. Could be used in `getStatus` method |
| apiExtraFee | Your API Extra fee in percents |
| changellyFee | Changelly fee in percents |
| payinAddress | Address for a user to send coins to |
| payinExtraId | `ExtraId` for `payinAddress` in case it is required |
| payoutAddress | Address where the exchange result will be sent to |
| payoutExtraId | `ExtraId` for `payoutAddress` in case it is required |
| amountExpectedFrom | `amount` from `createTransaction` |
| amountExpectedTo | `result` from `getExchangeAmount` at the moment of `createTransaction` |
| status | Transaction status |
| currencyTo | Ticker of input currency |
| currencyFrom | Ticker of output currency |
| amountTo | Real amount after the exchange that was sent to `payoutAddress` |
| createdAt | Point of time when the transaction was created |

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

#### Identifying The Transaction

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

#### Getting Exchange Status

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

#### Socket.io

As well as JSON RPC, the API provides [socket.io](http://socket.io/ "http://socket.io/") interface for receiving exchange status. The subscription should be signed and have a valid logon message.

|**Key**|**Description**|
|-------|---------------|
|sign|message object signed with your `secret` using hmac sha512 method|
|message|logon message object to sign|

Events:

|**Event**|**Trigger condition**|
|---------|---------------|
|status|any of transaction properties are changed|
|payin|payin status gets `confirmed`|
|payout|transaction status became `finished` or `failed`|

Example:

```js
socket.on("connect", function() {
  socket.emit("subscribe",
    {
   "apiKey": apiKey,
   "sign": sign,
   "message": {
       "Login": {}
     }
   }
  );
});

socket.on("status", function(data) {
  console.log(data);
});
```

Event data example:

```json
{
   "id": "adfa2359b68d",
   "status": "finished",
   "payinConfirmations": "10",
   "hash": "9f19186213799b82776c6792238c6b1c016404bb7003346f890bf754b36f69ca",
   "payinHash": "9f19186213799b82776c5792238c6b1c016504bb7003346f890bf754b36f69ca",
   "payoutHash": "0x1d04f3df2f7209ca985895ecf2e31a07e04889367d37d98c1e8d90fdfb568ec8",
   "payinAddress": "NBLQ6PE7Z5CVANJNXGOR74UQLOJ2YMGJJOZ4YFAQ",
   "payinExtraId": "7c5aefb158ec11e7bbdcafa2978ff15b",
   "payoutAddress": "0x988fa9Bb5C0a462932d9C714E2643a4692E4ABc5",
   "payoutExtraId": null,
   "currencyFrom": "ltc",
   "currencyTo": "eth",
   "amountFrom": "10",
   "amountTo": "0.2",
   "networkFee": "0.01"
}
```

Support
---------

#### Dedicated Support Line

Changelly provides two options for support. Please choose your support line and inform us at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com"):

— You just redirect users to our support line;

— You provide the first line support from your side and send your tickets directly to our dedicated email address. These tickets are forwarded strictly to our second level support team. It will be assigned the highest priority. Please don't make our email public.

Inform us in case the dedicated support line is needed. Feel free to request it at [pro@changelly.com](mailto:pro@changelly.com "pro@changelly.com").

Also, send us a link to your service, confirm that you are ready to provide support from your side and you won’t share this email with your clients.

The support line option is provided at the discretion of the Changelly's developer team.

#### Online Transactions History

You can check all the transactions with online stats on the [history page](https://changelly.com/history "https://changelly.com/history") in your personal account.
