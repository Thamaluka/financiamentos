var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
    if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE financiamento", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE `financiamento`.`operacao` (`id` INT NOT NULL AUTO_INCREMENT ,`salarioUsuario` FLOAT NULL,`taxaAnual` FLOAT NULL,`percentualEntrada` FLOAT NULL, `valorMaximoParcela` FLOAT NULL,`nomeCompleto` VARCHAR(155) NULL, `cpf` VARCHAR(45) NULL,`dataNascimento` DATE NULL, `hasFgts` TINYINT NULL, `valorFgts` FLOAT NULL,`dataCriacao` DATE NULL, `email` VARCHAR(45) NULL, PRIMARY KEY (`id`));";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table `operacao` created");
            process.exit(1);
        });
});

