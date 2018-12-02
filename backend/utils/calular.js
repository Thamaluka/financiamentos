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
    }

}