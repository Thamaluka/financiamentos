var express = require('express');
var router = express.Router();
var tools = require('../utils/calular');
var cors = require('cors');


router.get('/', cors(), function (req, res) {
  var response = tools.calcularParcelas(req.query.valorDoImovel, req.query.taxa, req.query.valorDaEntrada, req.query.parcelas)
  console.log('response')
  res.send(this.response);
});

/* GET users listing. */
router.post('/new', function (req, res) {
  var response = tools.createOperation(
    req.query.salario_usuario,
    req.query.taxa_anual,
    req.query.percentual_entrada,
    req.query.nome_completo,
    req.query.cpf,
    req.query.data_nascimento,
    req.query.hasFgts,
    req.query.valorFgts,
    req.query.email
  )
  res.send('Sucess');
});

module.exports = router;
