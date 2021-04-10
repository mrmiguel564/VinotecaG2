const express = require('express');
const passport = require('passport');
const router = express.Router();
const conn = require('../database'); // Buscando el archivo de conf de la base de datos
const multer = require('multer');

router.get('/', (req,res) => {
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('vinoteca.ejs',   { datos: resp });
    });

});

router.get('/login', (req,res) =>{
    res.render('login.ejs');
    
});

router.get('/registro', (req,res) =>{
    res.render('RegistrarUsuario.ejs');
    
});

router.get('/direccionEnvio/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    //res.render('index.ejs');
    },(req,res) =>{
    const{id_compra} = req.params
    conn.query('Select * from compra where id_compra = ?',[id_compra] ,(err,resp,campos) => {
        //console.log(resp);
        res.render('DireccionEnvio.ejs',   { datos: resp });
    });

});

router.get('/ingresarDireccion/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    //res.render('index.ejs');
    },(req,res) =>{

    const{id_compra} = req.params
    conn.query('Select * from compra where id_compra = ?',[id_compra] ,(err,resp,campos) => {
        //console.log(resp);
        res.render('DireccionEnvio.ejs',   { datos: resp });
    });

});

router.post('/ingresa/Direccion/:id_compra',(req, res,next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res) =>{
    //console.log(req.body);
    const {numero_casa, provincia, comuna, numero_block, calle, comentarios} = req.body;
    const { id_compra} = req.params;
    conn.query('INSERT into direccion_envio SET? ',{
        id_compra: id_compra,
        numero_casa: numero_casa,
        provincia: provincia,
        comuna: comuna,
        numero_block: numero_block,
        calle: calle,
        comentarios: comentarios
    }, (err, result) => {
        if(!err) {
            
            res.redirect('/');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.get('/eliminarCompra/:id_compra', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
   

    const { id_compra } = req.params;
    conn.query('DELETE from compra WHERE id_compra = ?', [id_compra], (err, resp, campos) => {
        if(!err){
            console.log("persona eliminada")
            res.redirect('/')
        }else{
            console.log(err);
        }
    });
});
router.post('/registrarUsuario',(req,res) =>{
    //console.log(req.body);
    
   
    const {correo, nombre, password, fecha_nacimiento, telefono} = req.body;
    conn.query('INSERT into usuario SET? ',{
        correo: correo,
        nombre: nombre,
        password: password,
        fecha_nacimiento: fecha_nacimiento,
        telefono, telefono
    }, (err, result) => {
        if(!err) {
            res.redirect('/login');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.post('/login',passport.authenticate('local',{  
    successRedirect: "/listo",
    failureRedirect: "/login"
}));

router.get('/listo/', (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    
    res.redirect('/login');
},(req,res) =>{
    
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="administrador"){
        res.redirect('/admin');
    }else if(tipo_usuario==="cliente"){
        res.redirect('/');
    }   
});

router.get('/modificarCompras/:id_compra', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const { id_compra } =  req.params;
    conn.query('Select * from compra where id_compra = ?', [id_compra] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarCompras.ejs',   { datos: resp });
    });
});

router.get('/modificarProductos/:id_producto', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {id_producto} =  req.params;
    conn.query('Select * from producto where id_producto = ?', [id_producto] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarProductos.ejs',   { datos: resp });
    });
});

router.get('/modificarPersonas/:correo', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {correo} =  req.params;
    conn.query('Select * from usuario where correo = ?', [correo] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarPersonas.ejs',   { datos: resp });
    });
});

router.get('/modificarSucursal/:nombre', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {nombre} =  req.params;
    conn.query('Select * from sucursal where nombre = ?', [nombre] , (err,resp,campos) => {
        //console.log(resp);
        res.render('ModificarSucursal.ejs',   { datos: resp });
    });
});

router.get('/admin', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    
    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    conn.query('SELECT usuario.correo, Count(producto_carrito.id_producto) AS NumeroPedidos FROM producto_carrito LEFT JOIN usuario ON producto_carrito.correo=usuario.correo GROUP BY usuario.nombre', (err,resp,campos) => {
        conn.query('SELECT MIN(producto.precio) as MenorPrecio from producto join stock on producto.id_producto = stock.id_producto', (err,resp1,campos) => {
            conn.query('SELECT MAX(producto.precio) as MayorPrecio from producto join stock on producto.id_producto = stock.id_producto', (err,resp2,campos) => {
                conn.query('SELECT AVG(producto.precio) as ElPromedioDeLosPrecios from producto join stock on producto.id_producto = stock.id_producto', (err,resp3,campos) => {
                    conn.query('select * , max(cantidad_producto) as ProductoMaximo from (producto_carrito INNER JOIN producto)', (err,resp4,campos) => { 
                        conn.query('SELECT * FROM producto WHERE id_producto NOT IN (SELECT id_producto FROM productos_compra)', (err,resp5,campos) => {     
                     res.render('admin.ejs',   { datos: resp, datos1: resp1, datos2: resp2, datos3: resp3, datos4: resp4, datos5:resp5});
                });
            });
        });
         });
        });
    });
    
    
});

router.get('/admin/productos', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('productos.ejs',   { datos: resp });
    });
});

router.get('/admin/personas', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    conn.query('Select * from usuario', (err,resp,campos) => {
        //console.log(resp);
        res.render('personas.ejs',   { datos: resp });
    });
});

router.get('/admin/compras', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
 
    conn.query('Select * from compra', (err,resp,campos) => {
        //console.log(resp);
        res.render('compras.ejs',   { datos: resp });
    });
});

router.get('/admin/sucursales', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
 
    conn.query('Select * from sucursal', (err,resp,campos) => {
        //console.log(resp);
        res.render('Sucursal.ejs',   { datos: resp });
    });
});
router.get('/login', (req,res) => {
    res.render('login.ejs',{title: 'chequeo del login'});
});

router.get('/eliminar/:id_producto', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    const { id_producto } = req.params;
    conn.query('DELETE from producto WHERE id_producto = ?', [id_producto], (err, resp, campos) => {
        if(!err){
            console.log("producto eliminado")
            res.redirect('/admin/productos')
        }else{
            console.log(err);
        }
    });
});


router.post('/precio',(req,res) =>{
    
    //const { dinero } = req.params;
    const prueba = req.body;
    //console.log(prueba)
    conn.query('select producto.nombre, producto.jpg, producto.activo, producto.precio from producto join stock on producto.id_producto = stock.id_producto GROUP BY producto.id_producto having producto.precio > ? ', [prueba.precio], (err, resp, campos) => {
        console.log( resp)
        res.render('vinoteca.ejs',   { datos: resp });
    });
});

router.post('/preciosRangos', (req,res) =>{
        
    var {RangoMenor,RangoMayor} = datitos =  req.body;
    if(RangoMayor==''){
        datitos.RangoMayor=999999;
       
    }
    
    conn.query('select producto.nombre, producto.jpg, producto.activo, producto.precio from producto join stock on producto.id_producto = stock.id_producto GROUP by producto.id_producto having producto.precio BETWEEN ? and ?', [datitos.RangoMenor, datitos.RangoMayor], (err, resp, campos) => {
            res.render('vinoteca.ejs',   { datos: resp });
    });
});
router.get('/eliminar1/:correo', (req,res,next) =>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    const { correo } = req.params;
    conn.query('DELETE from usuario WHERE correo = ?', [correo], (err, resp, campos) => {
        if(!err){
            console.log("persona eliminada")
            res.redirect('/admin/personas')
        }else{
            console.log(err);
        }
    });
});

router.get('/eliminar2/:id_compra', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }

    const { id_compra } = req.params;
    conn.query('DELETE from compra WHERE id_compra = ?', [id_compra], (err, resp, campos) => {
        if(!err){
            console.log("persona eliminada")
            res.redirect('/admin/compras')
        }else{
            console.log(err);
        }
    });
});

router.get('/eliminar3/:nombre', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }

    const { nombre } = req.params;
    conn.query('DELETE from sucursal WHERE nombre = ?', [nombre], (err, resp, campos) => {
        if(!err){
            console.log("sucursal eliminada")
            res.redirect('/admin/sucursales')
        }else{
            console.log(err);
        }
    });
});

//router.post('/ingresar', (req,res) =>{
//    
//    conn.query('INSERT into producto VALUES ?', post , (err, resp, campos) => {
//        if(!err){
//            res.redirect('/admin')
//        }else{
//            console.log(err);
//        }
//    });
//});

router.post('/ingresa/productos', (req, res,next) => {
        
    //console.log(req.files[0].filename);

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{

 

    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
  
    const {nombre, precio, activo, descripcion, jpg} = req.body;
    conn.query('INSERT into producto SET? ',{
        nombre: nombre,
        precio: precio,
        activo: activo,
        descripcion : descripcion,
        jpg         : req.files[0].filename,
    
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/productos');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log(err);
        }
    });
    
});

router.post('/ingresa/personas',(req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    //console.log(req.body);
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
   
    const {correo, nombre, password, fecha_nacimiento, rol, telefono} = req.body;
    conn.query('INSERT into usuario SET? ',{
        correo: correo,
        nombre: nombre,
        password: password,
        fecha_nacimiento: fecha_nacimiento,
        rol: rol,
        telefono, telefono
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/personas');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.post('/ingresa/sucursal',(req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    //console.log(req.body);
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
   
    const {nombre, ubicacion} = req.body;
    conn.query('INSERT into sucursal SET? ',{
        nombre: nombre,
        ubicacion: ubicacion
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin/sucursales');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.post('/ingresa/compras',(req, res,next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res) =>{
    //console.log(req.body);
    const {correo, pago_total, nombre_receptor} = req.body;
    conn.query('INSERT into compra SET? ',{
        correo: correo,
        pago_total: pago_total,
        nombre_receptor: nombre_receptor
    }, (err, result) => {
        if(!err) {
            
            res.redirect('/direccionEnvio/'+result.insertId);
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
            console.log("datos repetidos o no agregados");
            console.log(err);
        }
    });
});

router.post('/modificar2/:id_compra', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {correo, pago_total, nombre_receptor}= datitos =  req.body;
    const {id_compra} = req.params;
    conn.query('UPDATE compra SET? WHERE id_compra = ?', [datitos, req.params.id_compra], (err, resp, campos) => {
        if(!err){
            console.log("persona actualizada")
            res.redirect('/admin/compras')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar3/:id_producto', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {nombre, precio, activo, descripcion, jpg }= datitos =  req.body;
    const {id_producto} = req.params;
    conn.query('UPDATE producto SET? WHERE id_producto = ?', [datitos, req.params.id_producto], (err, resp, campos) => {
        if(!err){
            console.log("Producto actualizado")
            res.redirect('/admin/productos')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar4/:correo', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {nombre, password, fecha_nacimiento, rol, telefono}= datitos =  req.body;
    const {correo} = req.params;
    conn.query('UPDATE usuario SET? WHERE correo = ?', [datitos, req.params.correo], (err, resp, campos) => {
        if(!err){
            console.log("Persona actualizada")
            res.redirect('/admin/personas')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar5/:nombre', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
    let op = require("../index.js")
    let tipo_usuario = op.rol1;
    if(tipo_usuario==="cliente"){
        res.redirect('/')
    }
    
    const {ubicacion}= datitos =  req.body;
    const {nombre} = req.params;
    conn.query('UPDATE sucursal SET? WHERE nombre = ?', [datitos, req.params.nombre], (err, resp, campos) => {
        if(!err){
            console.log("Sucursal actualizada")
            res.redirect('/admin/sucursales')
        }else{
            console.log(err);
        }
    });
});

module.exports = router;
