const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'mrmiguel.ddns.net',
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

//conn.query("insert into usuario values('hola','hola123','wew','1999-09-14','cliente')", (err,res,campos) =>{
//	if(err) throw err;
//	console.log(res);
//});






//conn.query("select usuario.nombre, compra.id_compra, compra.pago_total from usuario join compra where compra.pago_total >4000 and usuario.correo = 'mauriciofaker@gmail.com' and compra.correo ='mauriciofaker@gmail.com'",(err,res,campos)=>{
//    if(err) throw err;
//    console.log(res);
//}); 

//conn.query("update usuario set nombre = 'Mauricio De Juan' where nombre='Mauricio de juan';",(err,res,campos)=>{
//    if(err) throw err;
//    console.log(res);
//}); 



module.exports = conn;
