var config = require('../config')
var express = require('express')
var app = express()
var crypto = require('crypto')
var Parse = require('parse/node')
var verificationFactory = require('./phone_verification_authy')(config.authyApiKey)

// initiate and login to parse
Parse.initialize(config.parseAppId);
Parse.serverURL = config.parseUrl;

process.on('unhandledRejection', function(reason, p) {
  console.log("Unhandled Rejection:", reason.stack);
  process.exit(1);
});

app.get('/', function (req, res) {
  res.send('xgamerocks server version 1.0.0');
  console.log(req.query);
});

createUser = function(uid, username, country_code, phone) {
  var email = username + '@neo.works';

  var User = Parse.Object.extend("_User");
  var user = new User();
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var pass = crypto.createHash('sha1').update(current_date + random).digest('hex');
  var info = {
    username: username, 
    email: email, 
    country_code: country_code,
    phone: phone,
    authy_id: uid,
    pass: pass,
  }
  return user.save(info);
}

// create a user on authy, and then ask authy to send a SMS verification token
app.get('/register', function (req, res) {
  var phone = req.query.phone;
  var country_code = req.query.country_code;
  var username = country_code + phone;
  console.log('register');
  
  verificationFactory.register(phone + '@neo.works', phone, country_code)
  .then( () => { 
    console.log('try to locate user: ' + username);
    var User = Parse.Object.extend("_User");
    var query = new Parse.Query(User);
    query.equalTo("username", username);
    return query.find();
  })
  .catch( (error) => { console.log(error)
    res.send({ success: false, message: error }) })
  .then( (results) => {
    if (results.length == 0) {
      return createUser(uid, username, country_code, phone);
    }
    
    uid = results[0].get('authy_id');

    if (config.skipSms) {
      console.log('skipped sms request');
      res.send( { success: true, username: username, } )
      return ;
    }
    
    return verificationFactory.requestAuthToken(uid)
  })
  .catch( (error) => {
      res.send({ success: false, message: 'fail to query Parse object User: ' + error });
  })
});

// verify token from SMS. return a pass if success for future login
app.get('/verify', function (req, res) {
  var token = req.query.token;
  var username = req.query.username;
  
  var User = Parse.Object.extend("_User");
  var query = new Parse.Query(User);
  query.equalTo("username", username);
  query.find({ 
    success: function(results) {
      if (results.length == 0) {
        res.send({ success: false, message: 'user not found: ' + username });    
        return;
      } else {
        var uid = results[0].get('authy_id');
        var pass = results[0].get('pass');
        if (config.skipSms) {
          console.log('skipped sms verification');
          res.send({ success: true, pass: 'sms verification skipped' })
          return;
        }

        authFactory.verify(uid, token)
        .then( () => { res.send({ success: true, pass: pass }) } )
        .catch( (error) => { res.send({ success: false, message: 'verify error' }) });
      }
    }
  })
  .catch((error) => {
    res.send({ success: false, message: error.message });    
  });
  
});

app.get('/video', function(req, res) {
  var Video = Parse.Object.extend("Video");
  var query = new Parse.Query(Video);
  query.find()
  .then( function(result) {
    res.send(result);
  })
});

app.listen(8000, function() {
  console.log('server started');
});
