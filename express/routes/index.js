var express = require('express');
const jwt = require('express-jwt');
var router = express.Router();
var base64 = require('base-64');


const auth = jwt({
  secret: 'CARWASH',
  userProperty: 'payload',
  algorithms: ['HS256']
});


async function updateStates(email, res, req) {

  var mongo = require('mongodb');
  var db = req.app.get('db');

  var state1 = req.body.state1;
  var state2 = req.body.state2;
  var state3 = req.body.state3;

  console.log(state1);

  let states = await db.collection('Users').find({'email': email}).toArray();
  db.collection('Users').update({'_id': states[0]._id}, {$set : {'state1': state1, 'state2': state2, 'state3': state3}});

  res.send("Success");

}

/* GET home page. */
router.get('/:year', auth, function(req, res, next) {
  var mongo = require('mongodb');
  var db = req.app.get('db');

  db.collection('ElectionStateData').find({ 'year': parseInt(req.params['year']), 'party': 'republican' }).toArray(function(err, results) {
    res.json(results);
  });
});

router.get('/', auth,function(req, res, next) {
  var mongo = require('mongodb');
  var db = req.app.get('db');
  db.collection('ElectionStateData').aggregate([{$group: {'_id': '$year'}}, {$sort: { _id: -1 }}], {collation: {
      locale: "en_US",
      numericOrdering: true
    }}).toArray(function(err, results) {
    res.json(results);
  });
});


router.post('/states', auth,function(req, res, next) {

  let token = req.get("Authorization");
  let payload = token.split(".")[1];
  let email = JSON.parse(base64.decode(payload))['email'];

  updateStates(email, res, req);

});



module.exports = router;
