module.exports = {

    connectDatabase: function connectDatabase() {
        var mysql = require('mysql');
        
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });

        return con;
    }
}