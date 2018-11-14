var express = require('express');
var router = express.Router();
var table = require('../models/table');
var calcular = require('../utils/calular');

/* GET users listing. */
router.get('/', function (req, res) {
  this.table.valorDoImovel = req.query.valorDoImovel;
  this.table.taxa = req.query.taxa;
  this.table.parcelas = req.query.parcelas;
  this.table.valorDaEntrada = req.query.valorDaEntrada;

  res.send(this.table);
});

/* GET users listing. */
router.post('/new', function (req, res) {
  console.log(req.body);
  res.send();
});

module.exports = router;
