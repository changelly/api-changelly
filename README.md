Instant exchange API
=====================================

The following methods are used to empower your service with Changelly exchange features. You can request more features by contacting our developers team. Changelly API is a white-label exchange solution. 

You can use Changelly API v1 or [migrate to API v2](#migration-to-api-v2) which is a faster, safer and more flexible version of our API.

### **Table of contents**:

* [Fixed Rate Exchange Feature](#fixed-rate-exchange-feature)
* [Getting started](#getting-started)
* [Your API extra fee](#your-api-extra-fee)
* [Usage](#usage)
      - [Use Case](#use-case)
      - [Protocol](#protocol)
      - [Authentication](#authentication)
         - [Node.js authentication](#nodejs-authentication)
         - [Postman authentication](#postman-authentication)
* [API Methods](#api-methods)
      - [Currency List](#currency-list)
      - [Minimum Exchangeable Amount](#minimum-exchangeable-amount)
      - [Estimated Exchange Amount](#estimated-exchange-amount)
      - [Generating Transaction](#generating-transaction)
      - [Identifying The Transaction](#identifying-the-transaction)
      - [Getting Exchange Status](#getting-exchange-status)
      - [Fixed Rate Methods](#fixed-rate-methods)
      - [Address validation](#address-validation)
* [Migration to API v2](#migration-to-api-v2)
      - [Authentication](#authentication)
      - [Node.js authentication](#nodejs-authentication)
      - [API v2 Methods](#api-v2-methods)
* [Currencies logo](#currencies-logo)
* [KYC/AML Policy](#kycaml-policy)
* [Support](#support)
  - [Dedicated Support-Line](#dedicated-support-line)
  - [Online Transactions History](#online-transactions-history)
* [Error codes](#error-codes)


### **Fixed Rate Exchange Feature**

1. New way of exchanging the crypto assets;
2. 150+ cryptos available for the fixed rate exchanges;
3. Users get the exact amount of money as they expected;
4. Less technical support requests on the subject of rate fluctuation and compensation.

### **Getting started**

1. Contact us at pro@changelly.com to get the API keys;
2. Read the following documentation;
3. Open an issue if you have any questions.

Please note, that for currencies with multiple outputs in a transaction (BTC, LTC, etc), we do not accept more than one output per address in one transaction.

* * *

### **Your API extra fee**

After setting up an API key you may want to set up your API extra fee.

For example, you may choose to charge a 0.5% fee on top of Changelly exchange fee.

To set up an extra commission, [please email us](mailto:pro@changelly.com "pro@changelly.com") with a link to your service.

Your API extra commission is included in a result of `getExchangeAmount` function call. All fees are always in output currency.

Usage
-----

Implementation examples on GitHub:

* [Node.js](https://github.com/changelly/api-changelly "https://github.com/changelly/api-changelly")
* [C#](https://github.com/changelly/changelly-examples/blob/master/c%23/ChangellyExample.cs "https://github.com/changelly/changelly-examples/blob/master/c%23/ChangellyExample.cs")
* [Python](https://github.com/changelly/changelly-examples/blob/master/python/example.py "https://github.com/changelly/changelly-examples/blob/master/python/example.py")
* [PHP](https://github.com/changelly/changelly-examples/blob/master/php/example.php "https://github.com/changelly/changelly-examples/blob/master/php/example.php")

Postman Collection and short description of API methods with examples: [https://api-docs.changelly.com](https://api-docs.changelly.com/ "https://api-docs.changelly.com/"). You will need to set up authentication to use Postman with our API.

API URL: 
* for API v1: `https://api.changelly.com`
* for API v2: `https://api.changelly.com/v2`


### **Use Case**

Here is simple use case of our exchange API:

1.  API — get available at the current moment list of currencies with `getCurrencies` or `getCurrenciesFull` method;
2.  GUI — ask user for currency pair he wants to exchange. For example, it can be LTC (Litecoin) to ETH (Ethereum);
3.  API — get minimum exchangeable amount for selected currency pair with `getMinAmount` method;
4.  GUI — ask user for the amount to exchange;
5.  API — call `getExchangeAmount` method to get estimated ETH amount after exchange;
6.  GUI — show an estimated amount to user and ask for confirmation;
7.  GUI — ask user for his wallet address to send coins after exchange;
8.  API — call `validateAddress` method to validate the user's wallet addres for a given currency (ETH);
9.  API — call `createTransaction` method to get the LTC address to which user should send his funds;
10. GUI — ask user to send LTC coins to the address for exchange;
11.  User sends LTC. We receive LTC and exchange it for ETH. We send ETH to the address that was submitted to `createTransaction` method;
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

_Note:_ This authentification guide applies to API v1. API v2 authentification is described in [Migration to API v2](#migration-to-api-v2) section.

All requests must contain the following headers:

| **Header** | **Description**                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| api-key    | your api key                                                                                  |
| sign       | the query's serialized body signed by your key's "secret" according to the HMAC-SHA512 method |


#### **Node.js authentication**

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

#### **Postman authentication**

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


API Methods
-----

### **Currency List**

There are the commands to work with currencies:
* `getCurrencies` will return you the list of currently enabled currencies; 
  
  We can disable and enable any currency at any time and the response list will reflect the change.
* `getCurrenciesFull` will return the list of all available currencies along with description and state.
  
  If any of currencies is disabled by us, it will be returned in the response list with the `"enabled": false` property.
  
Check the list of available currencies at [Supported currencies page](https://changelly.com/supported-currencies "https://changelly.com/supported-currencies") before you start. 

#### getCurrencies

Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getCurrencies",
   "params": {}
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

#### getCurrenciesFull

Example request:

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getCurrenciesFull",
    "params": {}
}
```


Example response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": [
        {
            "name": "btc",
            "ticker": "btc",
            "fullName": "Bitcoin",
            "enabled": true,
            "enabledFrom": true,
            "enabledTo": true,
            "fixRateEnabled": true,
            "payinConfirmations": 2,
            "extraIdName": null,
            "addressUrl": "https://www.blockchain.com/btc/address/%1$s",
            "transactionUrl": "https://www.blockchain.com/btc/tx/%1$s",
            "image": "https://web-api.changelly.com/api/coins/btc.png",
            "fixedTime": 1200000,
            "protocol": "BTC",
            "blockchain": "bitcoin",
            "notifications": {}
        }
    ]
}
```

_Note and warning_: According to clause 2.9.2 of our [Terms of Use](https://changelly.com/terms-of-use), “No crypto assets sent to us via an unsupported and/or not recommended network (e.g. POLYGON network) can be refunded. Recommended networks will be displayed to you during the transaction process.” 

That’s why we are asking you to indicate the currency network in your interface so that your users can send funds via the correct network. Please use the `blockchain` field from the `getCurrenciesFull` method for that.

Besides, there is the `notifications` field in the `getCurrenciesFull` method. This value contains important warnings that could help your customers make payments properly and significantly reduce the number of support inquiries. You can implement these notifications in your interface to make the UX better.

### **Minimum Exchangeable Amount**

To proceed with exchange we need it to be larger than the certain amount. Use `getMinAmount` with a currency pair (`from`, `to`) to notify users of the minimum amount they need to send.

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

**NOTE: most of the users do not read the information about the minimum amount. Be sure to highlight this information in your UI. If users send less than the minimum amount, their coins will likely be lost.**

### **Estimated Exchange Amount**

You can show users the estimated amount of coins they receive as a result of exchange using `getExchangeAmount`. You need to provide the request with currency pair (`from`, `to`) and the `amount` user is going to exchange. 

Estimated `result` property includes Changelly plus partner extra fee. Your API extra fee will decrease the estimated `result`. However, the network fee is deducted from the output amount. In order to get the network fee value, please use `getExchangeAmount` and pass the request params as an array (see the 2nd and 3rd example requests below).

_Note_: All fees are always in output currency.

Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "getExchangeAmount",
   "params": {
      "from": "ltc",
      "to": "eth",
      "amount": "3.99"
   }
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

When requesting more than 1 currency pair with `getExchangeAmount`, you just have to pass array of arguments.

Example 2 request:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "method": "getExchangeAmount",
  "params": [
    {
      "from": "eth",
      "to": "ltc",
      "amount": "1"
    },
    {
      "from": "btc",
      "to": "ltc",
      "amount": "1"
    }
  ]
}
```

Example 2 response:

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": [
    {
      "from": "eth",
      "to": "ltc",
      "networkFee": "0.0016150300000000000000",
      "amount": "1",
      "result": "23.54866500",
      "visibleAmount": "23.66921184738955823293",
      "rate": "23.66921184738955823293",
      "fee": "0.09467684738955823293172"
    },
    {
      "from": "btc",
      "to": "ltc",
      "networkFee": "0.0016150300000000000000",
      "amount": "1",
      "result": "417.98039400",
      "visibleAmount": "419.65903012048192771084",
      "rate": "419.65903012048192771084",
      "fee": "1.67863612048192771084336"
    }
  ]
}
```

If you want to receive an extended response when calling `getExchangeAmount` (with network fee, exchange fee, and other parameters included), please pass the request params as an array even if you request only 1 currency pair.

Example 3 request:

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getExchangeAmount",
    "params": [{
        "from": "ETH",
        "to": "BTC",
        "amount": "1"
    }]
}
```

Example 3 response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": [
        {
            "from": "eth",
            "to": "btc",
            "networkFee": "0.0005000000000000000000",
            "amount": "1",
            "result": "0.03558319",
            "visibleAmount": "0.03572609437751004016",
            "rate": "0.03572609437751004016",
            "fee": "0.00014290437751004016064"
        }
    ]
}
```


Example response fields:

| Property | Description |
|---------------|--------------------------------------------------------------------------|
| from | currency to exchange from |
| to | currency to exchange for |
| networkFee | commission that is taken by the network from the amount sent to the user |
| amount | amount of currency you are going to send |
| result | includes exchange fee |
| visibleAmount | the amount before any fees are deducted |
| rate | current rate of exchange |
| fee | exchange fee |

### **Generating Transaction**

After a successful call of `createTransaction` method, you get a unique ID to track the transaction status and a payin address for user to send money to.

`createTransaction`, once get called, creates a pair of deposit and payout address. If somebody sends coins to the same address twice, without second call to `createTransaction`, the coins will be exchanged and sent to the user's payout address.

| Property | Required or optional | Description |
|----------|----------------------|-------------|
| from     | required             | currency to exchange from |
| to       | required             | currency to exchange for |
| address  | required             | recipient address |
| extraId  | optional             | property for addresses of currencies that use additional ID for transaction processing (XRP, XLM, EOS, IGNIS, BNB, XMR, ARDOR, DCT, XEM) |
| amount | required | amount of currency you are going to send |
| refundAddress | optional | used in case of refund |
| refundExtraId | optional | same as of `extraId` but for `refundAddress` |

Example request:

```json
{
   "jsonrpc": "2.0",
   "id": "test",
   "method": "createTransaction",
   "params": {
      "from": "btc",
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
      "changellyFee": "0.4",
      "payinExtraId": null,
      "payoutExtraId": null,
      "amountExpectedFrom": 1,
      "amountExpectedTo": "417.72381300",
      "status": "new",
      "currencyFrom": "btc",
      "currencyTo": "ltc",
      "amountTo": "0.00000000",
      "payinAddress": "<<btc address to send coins to>>",
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
    "from": "eth",
    "to": "ltc",
    "address": "<<valid ltc address>>",
    "extraId": null,
    "amount": 1,
    "refundAddress": "<<valid eth address to make automatic refund in case of transaction fail>>",
    "refundExtraId": null
  }
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
      "changellyFee": "0.4",
      "payinExtraId": null,
      "payoutExtraId": null,
      "refundAddress": "<<eth refund address>>",
      "refundExtraId": null,
      "amountExpectedFrom": 1,
      "amountExpectedTo": "22.28103500",
      "status": "new",
      "currencyFrom": "eth",
      "currencyTo": "ltc",
      "amountTo": "0.00000000",
      "payinAddress": "<<eth address to send coins to>>",
      "payoutAddress": "<<valid ltc address>>",
      "createdAt": "2018-09-24T10:33:39.000Z"
   }
}
```

_Note_: `amountTo: 0` is expected. `amountTo` will have non-zero value when transaction is in `finished` state.

_Note and warning_: If the `payinExtraId` parameter in the response is not `null`, it is required for user to send the funds to the `payinAddress` specifying `extraId`. Otherwise, the transactions will not be processed and the user will need to get a refund through technical support. 

### **Identifying The Transaction**

To identify transaction, the ID from the `createTransaction` method is used.

Also you can use `getTransactions` method to list all transactions that satisfy request params.

_Note on transaction processing:_ It's common situation when there are many transactions in `waiting` status when processing payin. In this case transaction with `waiting` status and _the nearest_ amount is selected. And in case there are many – the earleast of them is selected. If the are no transactions in `waiting` status then new transaction is created automatically.

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
      "currency": "ltc",
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
      "id": "hugt9c80p572minj",
      "trackUrl": "https://changelly.com/track/hugt9c80p572minj",
      "createdAt": 1537785219,
      "type": "float",
      "moneyReceived": 0,
      "moneySent": 0,
      "rate": "0.00248399",
      "payinConfirmations": "0",
      "status": "waiting",
      "currencyFrom": "ltc",
      "currencyTo": "btc",
      "payinAddress": "<<payin address>>",
      "payinExtraId": null,
      "payinExtraIdName": null,
      "payinHash": null,
      "amountExpectedFrom": "1",
      "payoutAddress": "<<payout address>>",
      "payoutExtraId": null,
      "payoutExtraIdName": null,
      "payoutHash": null,
      "payoutHashLink": null,
      "refundHash": null,
      "refundHashLink": null,
      "amountFrom": "",
      "amountTo": "0",
      "amountExpectedTo": "0.00247406",
      "networkFee": "0",
      "changellyFee": "0.4",
      "apiExtraFee": "0.00",
      "totalFee": null,
      "canPush": false,
      "canRefund": false
   }, {
      "id": "23kj7f5z66f5vv9",
      "trackUrl": "https://changelly.com/track/23kj7f5z66f5vv9",
      "createdAt": 1535638050,
      "type": "fixed",
      "moneyReceived": 0,
      "moneySent": 0,
      "rate": "0.04215763",
      "payinConfirmations": "0",
      "status": "confirming",
      "currencyFrom": "ltc",
      "currencyTo": "eth",
      "payinAddress": "<<payin address>>",
      "payinExtraId": null,
      "payinExtraIdName": null,
      "payinHash": "txid4",
      "amountExpectedFrom": "1",
      "payoutAddress": "<<payout address>>",
      "payoutExtraId": null,
      "payoutExtraIdName": null,
      "payoutHash": null,
      "payoutHashLink": null,
      "refundHash": null,
      "refundHashLink": null,
      "amountFrom": "1",
      "amountTo": "0",
      "amountExpectedTo": "0.041989",
      "networkFee": null,
      "changellyFee": "0.5",
      "apiExtraFee": "0.00",
      "totalFee": null,
      "canPush": false,
      "canRefund": false
   }]
}
```

To get details on a specific transaction, just include the `id` parameter in your request:

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getTransactions",
    "params": {
        "id": "ahvt********dnfo",
        "limit": 10
    }
}
```

Example response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": [
        {
            "id": "ahvt********dnfo",
            "trackUrl": "https://changelly.com/track/ahvt********dnfo",
            "createdAt": 1617187096,
            "type": "float",
            "moneyReceived": 0,
            "moneySent": 0,
            "rate": "0.00021545",
            "payinConfirmations": "0",
            "status": "waiting",
            "currencyFrom": "xlm",
            "currencyTo": "eth",
            "payinAddress": "GDX6FFZUVSYTOV****************HUXXPXYOUIOY6CDQXG4NP6OEQ7",
            "payinExtraId": "9783********7653",
            "payinExtraIdName": "Memo.ID",
            "payinHash": null,
            "payoutHashLink": null,
            "refundHashLink": null,
            "amountExpectedFrom": "500",
            "payoutAddress": "0xCde3463364****************73d7f91136Ac34",
            "payoutExtraId": null,
            "payoutExtraIdName": null,
            "payoutHash": null,
            "refundHash": null,
            "amountFrom": "",
            "amountTo": "0",
            "amountExpectedTo": "0.10746",
            "networkFee": "0",
            "changellyFee": "0.25",
            "apiExtraFee": "0.00",
            "totalFee": null,
            "canPush": false,
            "canRefund": false
        }
    ]
}
```

To get details on multiple specific transactions, please pass the `id` parameter as an array:

```json
{
    "id": "test",
    "jsonrpc": "2.0",
    "method": "getTransactions",
    "params": { 
      "id": ["xln3********ms8im", "tr4g3********zk4t4", "484ec********pln5"]
    }
}
```

### **Getting Exchange Status**

With the transaction ID obtained from `createTransaction` call, you can get exchange status to notify your user or provide additional support.

Example request:

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
|failed|Transaction has failed. In most cases, the amount was less than the minimum. Please contact support and provide a transaction ID.|
|refunded|Exchange failed and coins were refunded to user's wallet. The wallet address should be provided by user.|
|hold|Due to AML/KYC procedure, exchange may be delayed|
|overdue|In case payin for floating rate transaction was not sent within the indicated timeframe.|
|expired|In case payin for fixed rate transaction was not sent within the indicated timeframe.|


### **Fixed Rate Methods**

For fixed-rates we’ve added four methods in our API: `getFixRate`, `getFixRateForAmount`, `getPairsParams` and `createFixTransaction`. 

`getPairsParams` method can be also used for floating rate transactions.

#### **Getting the fixed rate**

API Call – `getFixRate`

Example request:

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
      "to": "ltc"
    }
  ]
}
```

Example response:

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
      "result": "22.1818471906",
      "from": "eth",
      "to": "ltc",
      "maxFrom": "58.60648073",
      "maxTo": "1299.99999994",
      "minFrom": "0.09280000",
      "minTo": "2.05847542"
    }
  ]
}
```

* `minFrom`, `minTo`, `maxFrom`, `maxTo` params denote the frame, inside of which we would be able to perform the fix rate exchange and give to the user the exact amount of assets that was shown initially.
* Fixed rate methods return the `rateId` that can be used for a limited period of time. The `rateId` is valid for 30 sec in `getFixRateForAmount` and 1 minute in `getFixRate`. This time should be enough for user to initiate the exchange.
* Expired rate `id` cannot be used for creation of the fixed rate transaction.
* `id` has to be stored somewhere and will be used as `rateId` param while calling.
* `result` or `rate` is a parameter that you can show to the user as the exchange rate.
* _Important:_ users shall send the exact amount of funds which were specified as a pay-in amount. In case, users send different sum – the transaction can be automatically refunded.
* _Important:_ for fixed rate transactions to process successfully, refund address must be presented as well as refund `extraId` if needed.

#### **Getting the fixed rate for specific amount**

`getFixRateForAmount` returns a fixed exchange result of amount provided. It needs an additional parameter `amountFrom` that user is going to exchange and returns `amountTo` that user receives.

So, main difference between `getFixRateForAmount` and `getFixRate`  methods is that `getFixRateForAmount` fetches fixed amount according to additional parameter field `amountFrom`.

Example request: 

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
      "from": "btc",
      "to": "eth",
      "amountFrom": "2.25"
    }
  ]
}
```

Example response: 

```json
{
  "jsonrpc": "2.0",
  "id": "test",
  "result": [
    {
      "id": "f4dd43106d63b65b88955a0b362645ce960987c7ffb7a8480dd32e799431177f",
      "result": "0.0554308823",
      "from": "eth",
      "to": "btc",
      "amountFrom": "5.2",
      "amountTo": "0.28824058"
    },
    {
      "id": "f4dd43107876ad5b88955a0b362645ce960a87c0fdb7ab540ed635799230107e830d3f",
      "result": "17.7611598399",
      "from": "btc",
      "to": "eth",
      "amountFrom": "2.25",
      "amountTo": "39.96260963"
    }
  ]
}
```
* `id` has to be stored somewhere and will be used as `rateId` param for 30 seconds while calling.
* Expired `rateId` cannot be used for creation of the fixed rate transaction.
* `result` or `rate` is a parameter that you can show to the user as the exchange rate.
* `from` and `to` parameters are present exchange pair provided by user.
* `amountFrom` is a copy of provided by user `amountFrom` request's parameter.
* `amountTo` is fixed exchange amount of assets that user will receive after create fixed rate transaction with current `rateId`.

Before getting the fixed rate for specific amount, you need to be sure about your amount is greater or equal than minimal amount and less or equal than maximal amount. For this, you need to call [getPairsParams](#getting-the-pair-parameters) method for fetching minimal and maximal amount for current pair.

If amount will not be correspond with minimal and maximal range for amount then error will be thrown.

Example request: 

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

Example request: 

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "error": {
        "code": -32600,
        "message": "Invalid amount: minimal amount for eth->btc is 0.0816"
    }
}
```

#### **Getting the pair parameters**

Use `getPairsParams` method to get the minimum and maximum exchangeable amount for specific pair of currencies.

Example request: 

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
        "from": "btc",
        "to": "eth"
      }
    ]
}
```

Example response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": [
        {
            "from": "eth",
            "to": "btc",
            "minAmountFloat": "0.0465",
            "maxAmountFloat": "449172.45240999997",
            "minAmountFixed": "0.0775",
            "maxAmountFixed": "100"
        },
        {
            "from": "btc",
            "to": "eth",
            "minAmountFloat": "0.0015",
            "maxAmountFloat": "25629.527850432485",
            "minAmountFixed": "0.0025",
            "maxAmountFixed": "3.2138"
        }
    ]
}
```

`minAmountFixed` and `maxAmountFixed` gives a range for amount provided by user.

#### **Creating a fixed rate transaction**

* Using `createFixTransaction` you need to provide the request with currency pair (`from`, `to`), recipient address, refund address (used in case of refund), rateID for this pair (that you get in `getFixRate`/`getFixRateForAmount` requests) and the `amountFrom` user is going to exchange, or `amountTo` user wants to receive. All fields are required.

* _Important:_ you can’t provide fields `amountFrom` and `amountTo` at the same time.

* Using `createFixTransaction`, you can provide a sum that user wants to receive during the exchange. For this you need to indicate the sum in the field `amountTo`.

* _Important:_ in response there will be same fields presented as with the floating rate API with `amountExpectedTo`. The number shown in the `amountExpectedTo` should be understood as a pay-out amount to the user.

* In response there is a `payTill` field, where is indicated till what time user needs to make the payment.

Example request fields:

| Property | Required or optional | Description |
|---------------|----------------------|------------------------------------------------------|
| from | required | currency to exchange from |
| to | required | currency to exchange for |
| address | required | recipient address |
| refundAddress | required | used in case of refund |
| amountFrom | required | amount user is going to exchange |
| amountTo | required | amount user wants to receive |
| rateId | required | rate ID that you get from `getFixRate`/`getFixRateForAmount` requests |
| extraId  | optional             | property for addresses of currencies that use additional ID for transaction processing (XRP, XLM, EOS, IGNIS, BNB, XMR, ARDOR, DCT, XEM) |
| refundExtraId | optional | same as of `extraId` but for `refundAddress` |

Example request with providing the sum user wants to send:

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

Example response:

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

Example request with providing the sum user wants to receive:

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

Example response:

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
}
```

### **Address validation**

Use `validateAddress` method to check if a given wallet address is valid or not for a given currency. 

You need to provide the request with `currency` ticker and wallet `address`. You can also use `extraId` parameter if needed.

Example request:

```json
{
  "id": "test",
  "jsonrpc": "2.0",
  "method": "validateAddress",
  "params": {
  	"currency": "btc",
  	"address": "<<btc address>>"
  }
}
```

Example response:

```json
{
    "jsonrpc": "2.0",
    "id": "test",
    "result": {
        "result": false,
        "message": "Invalid address"
    }
}
```

### **Migration to API v2**

Changelly API v2 remains backward compatible with the previous version, so upgrading can be done in a few steps.

#### **Authentication**

All requests must contain the following headers:

| **Header** | **Description**                                                                               |
|------------|-----------------------------------------------------------------------------------------------|
| X-Api-Signature| The query's serialized body signed by your private key according to the RSA-SHA256 method. |
| X-Api-Key      | Your API key (SHA256 from Public Key). |

You should generate the private and public keys pair:

```js
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der'
  }
});

console.log('The private key is: ', privateKey.toString('hex'));
console.log();
console.log('The public key is: ', publicKey.toString('hex'));
console.log();
console.log('Api Key Base64 is: ', crypto.createHash('sha256').update(publicKey).digest('base64'));
```

_Note:_ We recommend to authentificate with Node.js.

#### **Node.js authentication**

Example of how to sign a request with Node.js `crypto` module:

```js
const crypto = require("crypto");
const privateKeyString = "***YOUR_PRIVATE_KEY***";

const privateKey = crypto.createPrivateKey({
  key: privateKeyString,
  format: 'der',
  type: 'pkcs8',
  encoding: 'hex'
});

const publicKey = crypto.createPublicKey(privateKey).export({
    type: 'pkcs1',
    format: 'der'
});

const message = {
  "jsonrpc": "2.0",
  "id": "test",
  "method": "getMinAmount",
  "params": {
    "from": "ltc",
    "to": "eth"
  },
};

const signature = crypto.sign('sha256', Buffer.from(JSON.stringify(message)), {
  key: privateKey,
  type: 'pkcs8',
  format: 'der'
});
console.log('Sign is:', signature.toString('hex'));
console.log();
console.log('Sign base64 is:', signature.toString('base64'));

// ----------------------------------

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.changelly.com/v2',
  'headers': {
    'Content-Type': 'application/json', 
    'X-Api-Key': crypto.createHash('sha256').update(publicKey).digest('base64')), 
    'X-Api-Signature': signature.toString('base64')
  },
  body: JSON.stringify(message)
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

#### API v2 Methods

Use [API methods](#api-methods) which are described for API v1, but switch API endpoint to `api.changelly.com/v2`.

_Note and warning_: The rates and limits received by estimation API v2 methods with `api.changelly.com/v2` endpoint (`getFixRate`, `getMinAmount`, etc) will be available only for creating a transaction using the corresponding v2 methods (`createTransaction`, `createFixTransaction`). There are no major changes in the API interfaces but they can't be used at the same time for one transaction: you can't use the rate received by one version of API to create a transaction with another version.

### **Currencies logo**

You can get logo of each currency with

[https://web-api.changelly.com/api/coins/btc.png](https://web-api.changelly.com/api/coins/btc.png)

### **KYC/AML Policy**

1. Kindly note that we have AML/KYC policy;
2. Due to this policy, users’ transactions may be held for KYC procedures;
3. That is why, before users start an exchange via our API, please, notify them about the possibility of holding the transactions for KYC procedures;
4. You may want to use the following text: “Exchange services provided by Changelly. By clicking “Accept”, I acknowledge and understand that my transaction may trigger AML/KYC verification according to Changelly AML/KYC”;
5. The text may appear in a form of a pop-up window, you are welcome to check the examples of a [desktop version notification](https://i.imgur.com/v0BDpk7.jpeg) and a [mobile version notification](https://i.imgur.com/P540cbW.jpeg);
6. If a transaction of your customer gets ‘hold’ status, please ask the customer to contact our security team at security@changelly.com in order to pass the KYC procedure.

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


### Error codes
<table class="relative-table wrapped confluenceTable"><colgroup><col style="width: 5.84936%;" /><col style="width: 19.391%;" /><col style="width: 39.3429%;" /><col style="width: 35.4167%;" /></colgroup><tbody><tr><th class="confluenceTh">Code</th><th class="confluenceTh" colspan="1">Method</th><th class="confluenceTh">Message</th><th class="confluenceTh">Description</th></tr><tr><td class="confluenceTd" rowspan="3"><code>-32600</code><p><br /></p><p><br /></p></td><td class="confluenceTd" colspan="1"><p>getFixRateForAmount<span style="color: #003366;">,&nbsp;</span></p>getExchangeAmount</td><td class="confluenceTd" colspan="1"><p><code>Invalid amount: maximal amount is&nbsp;{max_amount}</code></p></td><td class="confluenceTd" colspan="1"><p>The attempt to exchange more currency than a maximal amount.</p></td></tr><tr><td class="confluenceTd" colspan="1"><p>getFixRateForAmount<span style="color: #003366;">,&nbsp;</span></p>getExchangeAmount</td><td class="confluenceTd" colspan="1"><p><code>Invalid amount: minimal amount is&nbsp;{min_amount}<br /></code></p></td><td class="confluenceTd" colspan="1"><p>The attempt to exchange less currency than a minimal amount.</p></td></tr><tr><td class="confluenceTd" colspan="1">Any method</td><td class="confluenceTd" colspan="1"><p><code>Error: You reached requests limit {limit}&nbsp;rps</code></p></td><td class="confluenceTd" colspan="1"><p>You have been sending more than 10 requests per second.</p></td></tr><tr><td class="confluenceTd" colspan="4"><br /></td></tr><tr><td class="confluenceTd"><code>-32601</code></td><td class="confluenceTd" style="text-align: left;" colspan="1">N/A</td><td class="confluenceTd" colspan="1"><p><code>Method not found</code></p></td><td class="confluenceTd" colspan="1">The method you're calling doesn't exist.</td></tr><tr><td class="confluenceTd" colspan="4"><br /></td></tr><tr><td class="confluenceTd" rowspan="10"><code>-32602</code><p><br /></p><p><br /></p><p><br /></p><p><br /></p><p><br /></p></td><td class="confluenceTd" colspan="1">Any method containing from/to parameter</td><td class="confluenceTd" colspan="1"><p><code>Invalid currency:&nbsp;{currency} temporary disabled<br /></code></p></td><td class="confluenceTd" colspan="1"><p>This currency is currently disabled.</p></td></tr><tr><td class="confluenceTd" colspan="1"><p>getFixRate,&nbsp;getFixRateForAmount, createFixTransaction</p></td><td class="confluenceTd" colspan="1"><p><code>Invalid currency:&nbsp;{currency} temporary disabled for fix rate transactions<br /></code></p></td><td class="confluenceTd" colspan="1"><p>This currency is currently disabled for fix-rate transactions.</p></td></tr><tr><td class="confluenceTd" colspan="1">Any method containing from/to parameter</td><td class="confluenceTd" colspan="1"><p><code>Invalid currency:&nbsp;{currency} is temporary disabled on API as output currency<br /></code></p></td><td class="confluenceTd" colspan="1"><p>This currency is currently disabled on API as an output currency.</p></td></tr><tr><td class="confluenceTd" colspan="1">Any method containing from/to parameter</td><td class="confluenceTd" colspan="1"><p><code>Invalid currency:&nbsp;{currency} is temporary disabled on API as input currency<br /></code></p></td><td class="confluenceTd" colspan="1"><p>This currency is currently disabled on API as an input currency.</p></td></tr><tr><td class="confluenceTd" colspan="1">Any method containing from/to parameter</td><td class="confluenceTd" colspan="1"><p><code>Invalid currency:&nbsp;{currency} not found</code></p></td><td class="confluenceTd" colspan="1"><p>This currency is not listed on Changelly.</p></td></tr><tr><td class="confluenceTd" colspan="1"><p>createTransaction,&nbsp;<br />createFixTransaction</p></td><td class="confluenceTd" colspan="1"><p><code>Error: Invalid address<br /></code></p></td><td class="confluenceTd" colspan="1"><p>You've specified an invalid payout address.</p></td></tr><tr><td class="confluenceTd" colspan="1"><p>createFixTransaction</p></td><td class="confluenceTd" colspan="1"><p><code>Error:<code class="c-mrkdwn__code c-mrkdwn__code--no_left_cap" style="text-align: left;"> Invalid refund address</code></code></p></td><td class="confluenceTd" colspan="1"><p>You've specified an invalid refund address.</p></td></tr><tr><td class="confluenceTd" colspan="1">Any method</td><td class="confluenceTd" colspan="1"><p><code><code class="c-mrkdwn__code c-mrkdwn__code--no_left_cap" style="text-align: left;">Parameter {param} is invalid</code></code></p></td><td class="confluenceTd" colspan="1"><p>You've specified an invalid parameter.&nbsp;</p></td></tr><tr><td class="confluenceTd" colspan="1"><p>createTransaction</p></td><td class="confluenceTd" colspan="1"><p><code><code class="c-mrkdwn__code c-mrkdwn__code--no_left_cap" style="text-align: left;"><span>Not enough liquidity in pair {from_currency}-&gt;{to_currency}. Max amount is {max_from} {from_currency}.</span><br /></code></code></p></td><td class="confluenceTd" colspan="1"><p><span>The amount you've specified exceeds maximal volume.</span></p></td></tr><tr><td class="confluenceTd" colspan="1">createFixTransaction</td><td class="confluenceTd" colspan="1"><code>Error: rateId was expired or already used. Use method getFixRateForAmount to generate new rateId&nbsp;</code></td><td class="confluenceTd" colspan="1">New rateId has to be generated.</td></tr><tr><td class="confluenceTd" colspan="4"><br /></td></tr><tr><td class="confluenceTd"><code>-32603</code></td><td class="confluenceTd" colspan="1">createFixTransaction</td><td class="confluenceTd" colspan="1"><p><code>Error: Creating fix transactions limit exceeds, wait 5 minute<br /></code></p></td><td class="confluenceTd" colspan="1"><p>The limit for creating fix-rate transactions was exceeded. Please wait for 5 more minutes and try again.</p></td></tr><tr><td class="confluenceTd"><br /></td><td class="confluenceTd" colspan="1">createTransaction</td><td class="confluenceTd" colspan="1"><p><code>An error encountered during address generation. Please try again later.<br /></code></p></td><td class="confluenceTd" colspan="1"><p>An error occurred during address generation.</p></td></tr><tr><td class="confluenceTd"><br /></td><td class="confluenceTd" colspan="1">Any method</td><td class="confluenceTd" colspan="1"><p><code>Internal Error OR Error</code></p></td><td class="confluenceTd" colspan="1"><p>Most likely, the problem is on our side. Further investigation is required.</p></td></tr></tbody></table>
