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

sendVerificationSms = function( uid ) {
  authy.request_sms(uid, function (err) {
    if (!err) {
      res.send(result);
    } else {
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
  var password = crypto.createHash('sha1').update(current_date + random).digest('hex');
  var info = {
    username: username, 
    email: email, 
    country_code: country_code,
    phone: phone,
    authy_id: uid,
    password: password,
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
          result['username'] = username;
          res.send(result);
        }
        sendVerificationSms(uid);
      },
      error: function(error) {
      }
    });
  });
});

// verify token from SMS. return a password if success for future login
app.get('/verify', function (req, res) {
  var token = req.query.token;
  var uid = req.query.uid;
  
  var TestObject = Parse.Object.extend("Video");
  var testObject = new TestObject();
  testObject.save({title: "bar"}).then(function(object) {
    res.send({ success: true, password: ''});
  })
  .catch((error) => {
    res.send({ success: false, message: error.message });    
  });
  return;
  
  authy.verify(uid, token, function (err, result) {
    res.send({success: (err == null)});
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