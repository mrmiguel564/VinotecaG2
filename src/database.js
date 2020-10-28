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
//Consultas etapa 1
//1.-
conn.query("select * from usuario where nombre = 'Mauricio de juan'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//2.-
conn.query("select compra.correo,compra.id_compra, direccion_envio.comuna from compra join direccion_envio on compra.id_compra = '4' and direccion_envio.id_compra = '4'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//3.-
conn.query("select usuario.nombre, compra.id_compra, compra.pago_total from usuario join compra on compra.pago_total >4000 and usuario.correo = 'mauriciofaker@gmail.com' and compra.correo ='mauriciofaker@gmail.com'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//4.-
//conn.query("drop table telefono", (err,res,campos) =>{
//	if(err) throw err;
//	console.log(res);
//});
//5.-
conn.query("alter table usuario alter rol SET default 'cliente'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//6.-
conn.query("alter table producto alter activo set default false", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//7.-
conn.query("update usuario set nombre = 'Mauricio De Juan' where nombre='Mauricio de juan'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//8.-
conn.query("update usuario set password ='Hola123' where password= 'hola123'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//9.-
conn.query("insert into usuario values('soy.correo@correo.soy','Renato','C0nst4nt1n0pl4','1995-03-24','cliente','92726363')", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//10.-
conn.query("insert into sucursal values('Botilleria don alfredo','2 norte con 3 oriente 412, viña del mar')", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//11.-
conn.query("insert into usuario values('buenas.tardes@hotmail.com','Sonia','gameOver123','1996-03-24','cliente','928736162')", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//12.-
conn.query("update usuario set password='Nerfeatres' where correo='soy.correo@correo.soy'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//13.-
conn.query("update usuario set telefono=974563428 where correo='soy.correo@correo.soy'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//14.-
conn.query("delete from usuario where correo ='soy.correo@correo.soy'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//15.-
conn.query("delete from sucursal where nombre ='Botilleria don alfredo'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//Consulta opcional para no tener problemas con el backend
conn.query("delete from usuario where correo ='buenas.tardes@hotmail.com'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//Consultas etapa 2
//1.-
conn.query("SELECT * FROM usuario JOIN compra ON usuario.correo = compra.correo WHERE compra.correo = 'mauriciofaker@gmail.com'", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//2.-
conn.query("SELECT usuario.correo, usuario.nombre, producto_carrito.cantidad_producto, producto_carrito.id_producto from usuario join producto_carrito on usuario.correo = producto_carrito.correo where producto_carrito.cantidad_producto = 20", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//3.-
conn.query("select producto.nombre, producto.precio, especificacion.nombre_especificacion from producto join especificacion on producto.id_producto = especificacion.id_producto where producto.id_producto = 1", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//4.-
conn.query("select producto.nombre, producto.activo, producto.precio, especificacion.contenido from producto join especificacion on producto.id_producto = especificacion.id_producto GROUP BY producto.id_producto having producto.precio > 6000", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//5.-
conn.query("SELECT SUM(producto_carrito.cantidad_producto) from producto_carrito where exists(select * from usuario join producto_carrito where usuario.correo = producto_carrito.correo = 'mauriciofaker@gmail.com')", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//6.-
conn.query("SELECT usuario.nombre, producto.nombre AS NumeroPedidos FROM ((producto_carrito INNER JOIN usuario ON producto_carrito.correo=usuario.correo) INNER JOIN producto ON producto_carrito.id_producto=producto.id_producto) GROUP BY usuario.nombre, producto.nombre", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//7.-
conn.query("select count(stock.id_producto) from stock where exists(select * from producto join stock on producto.id_producto = stock.id_producto < 5)", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//8.-
conn.query("SELECT usuario.correo, Count(producto_carrito.id_producto) AS NumeroPedidos FROM producto_carrito LEFT JOIN usuario ON producto_carrito.correo=usuario.correo GROUP BY usuario.nombre", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//9.- (ver esta consulta porque no arroja bien los datos)
conn.query("select producto_compra.id_producto, producto.nombre, producto.precio from producto join producto_compra where producto.id_producto = producto_compra.id_compra in (1,2,3,4)", (err,res,campos) =>{
	if(err) throw err;
	console.log(res);
});
//10.-
//conn.query("create USER 'mauricio'@'localhost' IDENTIFIED BY 'pass_tbd'", (err,res,campos) =>{
//	if(err) throw err;
//	console.log(res);
//});
//11.-
//conn.query("drop user 'mauricio'@'localhost'", (err,res,campos) =>{
//	if(err) throw err;
//	console.log(res);
//});


//Consultas etapa 3



module.exports = conn;