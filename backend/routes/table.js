var express = require('express');
var router = express.Router();
var table = require('../models/table');

/* GET users listing. */
router.get('/', function (req, res) {
  console.log(req.query.name);
  res.send('req');
});

/* GET users listing. */
router.post('/new', function (req, res) {
  console.log(req.body);
  res.send();
});

module.exports = router;
