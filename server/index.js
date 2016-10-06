var config = require('../config');
var express = require('express');
var app = express();
var authy = require('authy')(config.authyApiKey);
var crypto = require('crypto');
var Parse = require('parse/node');

// initiate and login to parse
Parse.initialize(config.parseAppId);
Parse.serverURL = config.parseUrl;

app.get('/', function (req, res) {
  res.send('xgamerocks server version 1.0.0');
  console.log(req.query);
});

sendVerificationSms = function(res, uid ) {
  authy.request_sms(uid, function (err) {
    if (err) {
      res.send(err);
    }      
  });
}

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
  user.save(info)
    .then(function() {
      console.log('user created');
      result['username'] = username;
      res.send(result);
    }).catch(function(user, error) {
      console.log('user creation failed');
      console.log(info);
      res.send({ success: false, message: 'failed to create user' });
    });
}

// create a user on authy, and then ask authy to send a SMS verification token
app.get('/register', function (req, res) {
  var phone = req.query.phone;
  var country_code = req.query.country_code;
  var username = country_code + phone;
  console.log('register');
  authy.register_user(phone + '@neo.works', phone, country_code, function (err, result) {
    if (err) {
      console.log('user register failed: ' + phone + ', ' + country_code);
      res.send(result);
      return;
    } 
    
    // save the user info into parse
    var User = Parse.Object.extend("_User");
    var query = new Parse.Query(User);
    query.equalTo("username", username);
    query.find({ 
      success: function(results) {
        var uid = result.user.id;
        if (results.length == 0) {
          createUser(uid, username, country_code, phone);
        } else {
          uid = results[0].get('authy_id');
        }
        sendVerificationSms(res, uid);
        result['username'] = username;
        res.send(result);
      },
      error: function(error) {
      }
    });
  });
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
        authy.verify(uid, token, function (err, result) {
          err = null;
          if (err == null) {
            console.log('authy success');          
            res.send({ success: true, pass: pass });
          } else {
            res.send({success: false, message: 'authy error'});
          }
        });
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