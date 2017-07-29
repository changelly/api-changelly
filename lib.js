'use strict';
module.exports = (function() {
  var URL = 'https://api.changelly.com';
  var io = require('socket.io-client');
  var jayson = require('jayson');
  var crypto = require('crypto');
  var client = jayson.client.https(URL);

  function Changelly(apiKey, apiSecret) {
    this._id = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    this._sign = function (message) {
      return crypto
        .createHmac('sha512', apiSecret)
        .update(JSON.stringify(message))
        .digest('hex');
    };

    this._request = function (method, options, callback) {
      var id = this._id();
      var message = jayson.utils.request(method, options, id);
      client.options.headers = {
        'api-key': apiKey,
        'sign': this._sign(message)
      };

      client.request(method, options, id, function (err, response) {
        callback(err, response);
      });
    };

    const self = this;
  }
    
  Changelly.prototype = {
    getCurrencies: function(callback) {
      return this._request('getCurrencies', {}, callback);
    },
    generateAddress: function(from, to, address, extraId, callback) {
      var params = {
        from: from,
        to: to,
        address: address,
        extraId: extraId
      };

      return this._request('generateAddress', params, callback);
    },
    getMinAmount: function(from, to, callback) {
      var params = {
        from: from,
        to: to
      };

      return this._request('getMinAmount', params, callback);
    },
    getExchangeAmount: function(from, to, amount, callback) {
      var params = {
        from: from,
        to: to,
        amount: amount
      };

      return this._request('getExchangeAmount', params, callback);
    },
    getTransactions: function(limit, offset, currency, address, extraId, callback) {
      var params = {
        limit: limit,
        offset: offset,
        currency: currency,
        address: address,
        extraId: extraId
      };

      return this._request('getTransactions', params, callback);
    },
    getStatus: function(id, callback) {
      var params = {
        id: id
      };

      return this._request('getStatus', params, callback);
    },
    enableSocket: function(callback) {
      self._socket = io.connect(URL, {
        'reconnection': true,
        'reconnectionDelay': 1000,
        'reconnectionDelayMax': 5000,
        'reconnectionAttempts': 'Infinity'
      });

      return new Promise(res => {
        self._socket.on('connect', () => {
          const message = {
            "Login": {}
          };

          self._socket.emit('subscribe',
            {
              apiKey: this._apiKey,
              sign: this._sign(message),
              message: message
            }
          );
          res();
          if(callback) {
            callback();
          }
        });
      });
    },
    on: function(channel, callback) {
      self._socket.on(channel, callback);
    }
  };
  
  return Changelly;
})();
    