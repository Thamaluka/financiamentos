module.exports = {

    calcularParcelas: function calculoParcelas(valor_imovel, taxa_juro, percentual_entrada, qt_parcelas) {
        valor_imovel = valor_imovel - (percentual_entrada * 100);
        var amortizacao = valor_imovel / qt_parcelas;
        response = [];
        var parcela = { saldo_devedor: valor_imovel, ordem: 1 };
        response.push(parcela);
        for (var i = 0; i <= qt_parcelas; i++) {
            var juros = valor_imovel * (taxa_juro / 100);
            valor_imovel = valor_imovel - amortizacao
            var valorParcela = amortizacao + juros
            var parcela_sac = { saldo_devedor: valor_imovel, ordem: i, juros: juros, amortizacao: amortizacao, prestacao: valorParcela };
            response.push(parcela_sac);
        }
        return response;
    },
    createOperation: function createOperation(salarioUsuario, taxaAnual, percentualEntrada, nomeCompleto, cpf, dataNascimento, hasFgts, valorFgts, email) {

        var connectUtils = require('./connect');
        con = connectUtils.connectDatabase();

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var todayDate = new Date().toISOString().slice(0, 10);
            var sql = "INSERT INTO `financiamento`.`operacao` (`salarioUsuario`, `taxaAnual`, `percentualEntrada`, `valorMaximoParcela`, `nomeCompleto`, `cpf`, `dataNascimento`, `hasFgts`, `valorFgts`, `dataCriacao`, `email`) VALUES ( '" + salarioUsuario + "', '" + taxaAnual + "', '" + percentualEntrada + "', '" + salarioUsuario / 100 * 30 + "', '" + nomeCompleto + "', '" + cpf + "', '" + dataNascimento + "', '" + hasFgts + "', '" + valorFgts + "', '" + todayDate + "', '" + email + "');";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                con.end();
                console.log("1 record inserted");
            });
        });

        return "Teste";
    },

    calcularParcelasByUser: function calcularParcelasByUser(user, valorImovel, qtParcelas) {
        var nodemailer = require('nodemailer');
        if (qtParcelas <= 45) {
            valorImovel = valorImovel - (user.percentualEntrada * 100);
            qtParcelas = qtParcelas * 12
            var amortizacao = valorImovel / qtParcelas;
            var response = [];
            var parcela = { saldo_devedor: valorImovel, ordem: 1 };
            response.push(parcela);
            for (var i = 0; i <= qtParcelas; i++) {
                var juros = valorImovel * (user.taxaAnual / 100);
                valorImovel = valorImovel - amortizacao
                var valorParcela = amortizacao + juros
                var parcela_sac = { saldo_devedor: valorImovel, ordem: i, juros: juros, amortizacao: amortizacao, prestacao: valorParcela };
                response.push(parcela_sac);
            }
            var responseAll = []
            var primeiraParcela = response[1];
            var logic;
            if (primeiraParcela.prestacao <= user.valorMaximoParcela) {
                logic = true;
            } else {
                logic = false;
            }
            var response_obj = { parcelas: response, podeParcelar: logic, maxParcela: user.valorMaximoParcela }
            responseAll.push(response_obj)
            if (user.email) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'webservice.financiamento.segalla@gmail.com',
                        pass: 'Lu17031975'
                    }
                });
                var menssage = "DETALHES DO SEU FINANCIAMENTO \n"
                menssage += 'SALDO DEVEDOR DE : R$ ' + responseAll[0].parcelas[0].saldo_devedor + '\n';
                menssage += 'AMORTIZAÇÃO DE : R$ ' + responseAll[0].parcelas[1].amortizacao + '\n';
                for (var i = 0; i <= responseAll.length; i++) {
                    if (responseAll[i] != undefined) {
                        if (responseAll[i].parcelas) {
                            for (var index = 0; index < responseAll[i].parcelas.length; index++) {
                                menssage += 'PARCELA' + index + ': R$' + responseAll[i].parcelas[index].prestacao + ' COM JUROS DE : R$ ' + responseAll[i].parcelas[index].juros + '\n';
                            }
                        }
                    }


                }
                var mailOptions = {
                    from: 'webservice.financiamento.segalla@gmail.com',
                    to: user.email,
                    subject: 'Financiamento',
                    text: menssage
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
            return responseAll
        } else {
            var response = []
            var response_obj = { error: 'O Prazo de financiamento tem que ser inferior a 45 Anos.' }
            response.push(response_obj)
            return response;
        }


    },

}