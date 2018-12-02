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

router.get('/check/:userId', function (req, res) {
  var userId = req.params.userId;
  var prazoFinanciamento = req.query.prazoFinanciamento;
  var valorImovel = req.query.valorImovel;
  var connectUtils = require('../utils/connect');
    con = connectUtils.connectDatabase();
    con.query("SELECT * FROM `financiamento`.`operacao` WHERE id =  ? ", userId, function (err, result) {             
        if(err) {
            console.log("error: ", err);
        }
        else{
            user = result[0]
            logicResult = tools.calcularParcelasByUser(user, valorImovel, prazoFinanciamento);
            res.send(logicResult);
        }
    }); 
});


router.get('/operations', function (req, res) {
  var offset = req.query.offset;
  var limit = req.query.limit;
  var connectUtils = require('../utils/connect');
    con = connectUtils.connectDatabase();
    con.query("SELECT * FROM financiamento.operacao ORDER BY dataCriacao LIMIT "+limit+" OFFSET "+offset+";",function (err, result) {             
        if(err) {
            console.log("error: ", err);
        }
        else{
            res.send(result);
        }
    }); 
});

module.exports = router;
