var express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
var mongo = require('mongodb');
var base64 = require('base-64');
const jwt2 = require('express-jwt');

class User {

  password;
  success;
  email;

  register = async function (email, password, res) {
    this.email = email;
    this.password = password;

    if (await this.userExists(email) == false) {

      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 8);
      db.collection('Users').insert({'email': email, 'password': this.password});
      let token = jwt.sign(
        {
          email: email,
          exp: parseInt(expiry.getTime() / 1000)
        },
        'CARWASH'
      );

      res.json({'token': token});
    } else {
      res.json({'error': 'User already exists.'})
    }

  }

  userExists = async function (email) {
    let user = await db.collection('Users').find({'email': email}).toArray();
    if (user.length > 0) return true;
    return false;
  }

  userExistsPW = async function (email, password) {
    let user = await db.collection('Users').find({'email': email, 'password': password}).toArray();
    if (user.length > 0) return true;
    return false;
  }

  async changePassword(email, password, newPassword, res) {


    if (await this.userExistsPW(email, password)) {
        db.collection('Users').update({'email': email, 'password': password}, {'password': newPassword});
    }

  }

  login = async function (email, password, res) {
    this.password = password;
    if(await this.userExistsPW(email, this.password) === true) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 8);
      db.collection('Users').insert({'email': email, 'password': this.password});
      let token = jwt.sign(
        {
          email: email,
          exp: parseInt(expiry.getTime() / 1000),
        },
        'CARWASH'
      );

      res.json({'token': token});
    } else {
      res.json({'error': 'Incorrect credentials.'})
    }

  }

}



let db;
const auth = jwt2({
  secret: 'CARWASH',
  userProperty: 'payload',
  algorithms: ['HS256']
});

async function getStates(email, res, req) {
  const mongo = await require('mongodb');
  const db = await req.app.get('db');
  let states = await db.collection('Users').find({'email': email}).toArray();
  let stateList = await {'state1': states[0].state1,'state2': states[0].state2, 'state3': states[0].state3};
  res.json(stateList);

}

var routerA = express.Router();
routerA.post('/register', function(req, res, next) {
   db = req.app.get('db');

   let email = req.body.email;
   let password = req.body.password;

   let user = new User();
   user.register(email, password, res);

});

routerA.post('/login', function(req, res, next) {
  db = req.app.get('db');

  let email = req.body.email;
  let password = req.body.password;

  let user = new User();
  user.login(email, password, res);

});

routerA.post('/changePW', auth, function(req, res, next) {
  db = req.app.get('db');
  let token = req.get("Authorization");
  let payload = token.split(".")[1];
  let email = JSON.parse(base64.decode(payload))['email'];
  let password = req.body.password;
  let newPassword = req.body.newPassword;

  let user = new User();
  user.changePassword(email, password, newPassword, res);

});

routerA.get('/states', auth, function(req, res, next) {
  db = req.app.get('db');
  let token = req.get("Authorization");
  let payload = token.split(".")[1];
  let email = JSON.parse(base64.decode(payload))['email'];

  getStates(email, res, req);
});

module.exports = routerA;
