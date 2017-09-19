# Changelly PRO

The following methods are used to empower your service with Changelly exchange features. You can implement these features or request more by contacting our developers team. Changelly PRO is always white-labeled and you can use it the way you like.

### **Table of contents**:

1. [Getting started](#getting-started)
2. [Usage](#usage)
   - [Protocol](#protocol)
   - [Authentication](#authentication)
   - [Currency list](#currencies-list)
   - [Setting up addresses](#setting-up)
   - [Estimated exchange amount](#estimated-exchange)
   - [Minimum exchangeable amount](#minimum-exchangeable)
   - [Identifying the transaction](#identifying-the-transaction)
   - [Getting exchange status](#getting-exchange-status)
   - [Socket.io](#socket)
   - [Support](#support)
3. [Basic UI](#basic-ui)
4. [Coming soon](#coming-soon)

* * *

### **Getting started**

1.  Contact pro@changelly.com for API access.
2.  Get verification.
3.  Get the API key and API secret.
4.  Start implementing.

* * *

### **Usage**

#### Protocol

Changelly API uses JSON-RPC 2.0 protocol, defining only a handful of data types and commands.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getMinAmount",
      "params": {
        "from": "btc",
        "to": "bcn"
      },
      "id": 1
    }

#### Authentication

All calls must contain the following headers:

<span>**api-key** — Your API key.</span>  
<span>**sign** — The query's data signed by your key's "secret" according to the HMAC-SHA512 method.</span>

<span>NodeJs example:</span>

    var crypto = require("crypto");

    var message = {
      "jsonrpc": "2.0",
      "method": "getMinAmount",
      "params": {
        "from": "btc",
        "to": "bcn"
      },
      "id": 1
    };

    var sign = crypto
                 .createHmac('sha512', apiSecret)
                 .update(JSON.stringify(message))
                 .digest('hex');

#### Currency list

Command **'getCurrencies'** will return you the currency list available for an exchange. Check the list of available currencies at [Supported currencies page](https://changelly.com/supported-currencies) before you start.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getCurrencies",
      "params": {},
      "id": 1
    }

#### Setting up addresses

With the method **'generateAddress'**, you will create a pair of addresses for deposits and withdrawals. Every pair is unique for a user. So if a user sends some coins to the same address twice, the coins will be exchanged and sent to the user's wallet.  

**'address'** is necessary for sending exchanged coins.
**'extraId'** is a field required by some currencies as additional information to proceed with the transaction: payment ID (CryptoNote currencies), destination tag (XRP) or public key (NXT).

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "generateAddress",
      "params": {
        "from": "eth",
        "to": "xmr",
        "address": "47hxsKgUYrKb37beq2vowcf1ojfxu1X3zjpUH6uGyBjrWHnGQLGbLwa5LKQcUN8jVG9SprG8s2hRMexJWhdvEPmuV3ncZSQ",
        "extraId": "ad5baa2b10ce0a015aa153a369bdc096ef29954a5096b98042296ddd79b3a4a8"
      },
      "id": 1
    }

#### Estimated exchange amount

You can notify users of the amount they will receive after exchange using **'getExchangeAmount'**. You need to provide the request with currency pair ('**from**', '**to**') and the 'amount' user is exchanging.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getExchangeAmount",
      "params": {
        "from": "eth",
        "to": "btc",
        "amount": "3.99"
      },
      "id": 1
    }

#### Minimum exchangeable amount

We don’t have maximum limits, but to proceed with an exchange we need it to be larger than the exchange fee. Use '**getMinAmount**' with a currency pair ('**from**', '**to**') to notify users of the minimum amount they need to send.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getMinAmount",
      "params": {
        "from": "btc",
        "to": "eth",
      },
      "id": 1
    }

**Note**: most users do not read the information about the minimum amount. Be sure to highlight this information in your UI. If users send less than the minimum amount, their coins will likely be lost.

#### Identifying the transaction

In some cases, you'll have to identify the exchange a user has ordered (for example, to provide support or to show the exchange process). You can use two unique identifiers: '**transactionID**' and '**transactionHash**'.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getTransactions",
      "params": {
        "currency": "xmr", //optional
        "address": "47hxsKgUYrKb37beq2vowcf1ojfxu1X3zjpUH6uGyBjrWHnGQLGbLwa5LKQcUN8jVG9SprG8s2hRMexJWhdvEPmuV3ncZSQ", //optional
        "extraId": null, //optional
        "limit" 10,
        "offset" : 10
      },
      "id": 1
    }

#### Getting exchange status

With the transaction ID, you can get Exchange status to notify your user or to provide additional support.

<span>Example:</span>

    {
      "jsonrpc": "2.0",
      "method": "getStatus",
      "params": {
        "id": "1d36f592f21e"
      },
      "id": 1
    }

<table class="statuses">

<thead>

<tr>

<th>Status</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>

<td>confirmed</td>

<td>Payment was received. The exchange is processing.</td>

</tr>

<tr>

<td>finished</td>

<td>Exchange is completed. Payout has been made to user's address.</td>

</tr>

<tr>

<td>failed</td>

<td>Transaction has failed. In most cases, the amount was less than the minimum.</td>

</tr>

<tr>

<td>refunded</td>

<td>Exchange was failed and coins were refunded to user's wallet. The wallet address should be provided by user.</td>

</tr>

</tbody>

</table>

#### Socket.io

As well as JSON RPC, the API provides [socket.io](http://socket.io) interface for receiving exchange status. You can subscribe on **'payin'** and **'payout'** events. The subscription should be signed and have a valid logon message.

<span>Example:</span>

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

    socket.on("payin", function(data) {
      console.log(data);
    });

    socket.on("payout", function(data) {
      console.log(data);
    });

#### Support

Direct your users to Changelly's support. You can receive the widget code and instructions by request.

* * *

### **Extra options**

* Revenue share — set your own exchange fee and receive revenue
* Widget — implement Changelly exchange with a simple widget
* Back office — start supporting your users with and easy-to-use

* * *

### **Coming soon**

* Basic UI

* * *

Contact pro@changelly.com for API access.

