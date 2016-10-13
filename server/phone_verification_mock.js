// a very simple mock 

module.exports = function (api_key, api_url) { 
  return new MockFactory(api_key, api_url)
}

function MockFactory(api_key, api_url) {
  this.authy = require('authy')(api_key, api_url)
}

MockFactory.prototype.register = function(username, phone, country_code) {
  return new Promise(function(resolve, reject) {
    resolve()
  })
}
  
MockFactory.prototype.requestToken = function(uid) {
  return new Promise(function(resolve, reject) {
    resolve(username)
  })
}

MockFactory.prototype.verify = function() {
  return new Promise(function(resolve, reject) {
    resolve()
  })
}

