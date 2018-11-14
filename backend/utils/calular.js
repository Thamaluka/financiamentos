module.exports = {

    calcularParcelas: function calculoParcelas(table) {
        let financiamento = table.valorDoImovel - table.valorDaEntrada;
        let numeroParcelas = table.parcelas;
        let amortizacao = financiavel / numeroParcelas;
        let taxa = table.taxa;
        let today = new Date();
        let day = today.getUTCDay();
        let month = today.getMonth();
        let year = today.getFullYear();
        let parcelas = [];
        let dataInicial = day + '/' + month + '/' + year;

        for (let i = 0; i < numeroParcelas; i++) {
            let numero = '';
            let saldoDevedor = '';
            let juros = '';
            let valorParcela = '';
            let dataParcela = '';

            if (i == 0) {
                numero = i + 1;
                saldoDevedor = financiavel;
                juros = Math.round((saldoDevedor * taxa) * 100) / 100;
                valorParcela = Math.round((juros + amortizacao) * 100) / 100;
                dataParcela = dataInicial;

                parcelas.push({
                    numero,
                    saldoDevedor,
                    juros,
                    valorParcela,
                    dataParcela
                });
            } else {
                numero = i + 1;
                saldoDevedor = Math.round((parcelas[i - 1].saldoDevedor - amortizacao) * 100) / 100;
                juros = Math.round((saldoDevedor * taxa) * 100) / 100;
                valorParcela = Math.round((juros + amortizacao) * 100) / 100;
                dataParcela = this.calculoDataParcelas(parcelas[i - 1].dataParcela);

                parcelas.push({
                    numero,
                    saldoDevedor,
                    juros,
                    valorParcela,
                    dataParcela
                });
            }
        }
        return dataParcela;
    },
    calculoDataParcelas: function calculoDataParcelas(data) {
        //transforma data que vem em string para formato Date do javascript
        let dia = data.substring(0, 2);
        let mes = data.substring(3, 5);
        let ano = data.substring(6, 10);
        let dataAnterior = new Date(ano, mes, dia);

        //Calculo da nova data
        let novoMes = (dataAnterior.getMonth() + 1) % 13;
        let novoAno = dataAnterior.getFullYear() + (((dataAnterior.getMonth() + 1) - novoMes) / 12);
        let novoDia = dia;

        novoMes = this.correcaoMes(novoMes);
        let dataParcela = novoDia + '/' + novoMes + '/' + novoAno;

        return dataParcela;
    },
    correcaoMes: function correcaoMes(mes) {
        if (isNaN(mes)) return false;
        //Se for menor que dez 1~9, adiciona o 0 antes do numero;
        return mes < 10 ? "0" + mes : mes;
    },
    
    verificaSalario: function verificaSalario(salario, valorParcela) {
        salario = salario * 0.3;
        if (salario > valorParcela) return true;
        else return false;
    }

}