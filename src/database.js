const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '7epBwKuwyEMC9Lu0',
    database: 'vinoteca'
});

conn.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('La base de dato esta conectada')
    }
});




module.exports = conn;