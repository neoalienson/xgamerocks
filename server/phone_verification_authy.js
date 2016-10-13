// a very simple promise wrapper for authy 

module.exports = function (api_key, api_url) { 
  return new AuthyFactory(api_key, api_url)
}

function AuthyFactory(api_key, api_url) {
  this.authy = require('authy')(api_key, api_url)
}

AuthyFactory.prototype.register = function(username, phone, country_code) {
  var that = this
  return new Promise(function(resolve, reject) {
    that.authy.register_user(username, phone, country_code, 
      function (err, result) {
        console.log(result)
        if (err) {
          reject(err.message)
        } else {
          resolve()
        }
      }
    );
  })
}
  
AuthyFactory.prototype.requestToken = function(uid) {
  var that = this
  return new Promise(function(resolve, reject) {
    that.authy.request_sms(uid, function (err) {
      if (err) {
        reject(err.message)
      } else {
        resolve(username)
      } 
    })
  })
}

AuthyFactory.prototype.verify = function() {
  var that = this
  return new Promise(function(uid, token) {
    that.authy.verify(uid, token, function (err, result) {
      if (err == null) {
        resolve()
      } else {
        reject(err.message)
      }
    })
  })
}

