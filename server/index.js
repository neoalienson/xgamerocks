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


// create a user on authy, and then ask authy to send a SMS verification token
app.get('/register', function (req, res) {
  var phone = req.query.phone;
  var country_code = req.query.country_code;
  var username = phone + country_code;
  var email = username + '@neo.works';
  
  authy.register_user(phone + '@neo.works', phone, country_code, function (err, result) {
    if (err) {
      res.send(result);
      return;
    } 
    
    // save the user info into parse
    var User = Parse.Object.extend("_User");
    var user = new User();
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var password = crypto.createHash('sha1').update(current_date + random).digest('hex');
    
    user.save({
        username: username, 
        email: email, 
        country_code: country_code,
        phone: phone,
        authy_id: result.user.id,
        password: password
      }
    ).then(function() {
      console.log('user created');
      authy.request_sms(result.user.id, function (err) {
        if (!err) {
          res.send(result);
        } else {
          res.send(err);
        }      
      });
      result['password'] = password;
      res.send(result);
    }).catch(function(user, error) {
      res.send({ success: false, message: 'failed to create user' });
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