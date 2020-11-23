const express = require('express');
const passport = require('passport');
const router = express.Router();

const conn = require('../database'); // Buscando el archivo de conf de la base de datos
router.get('/', (req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
    //res.render('index.ejs');
    },(req,res) =>{
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('vinoteca.ejs',   { datos: resp });
    });

});

router.get('/login', (req,res) =>{
    res.render('login.ejs');
    
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
        conn.query('SELECT MIN(producto.precio) as MenorPrecio from producto join especificacion on producto.id_producto = especificacion.id_producto', (err,resp1,campos) => {
            conn.query('SELECT MAX(producto.precio) as MayorPrecio from producto join especificacion on producto.id_producto = especificacion.id_producto', (err,resp2,campos) => {
                conn.query('SELECT AVG(producto.precio) as ElPromedioDeLosPrecios from producto join especificacion on producto.id_producto = especificacion.id_producto', (err,resp3,campos) => {
                    //console.log(resp);
                     res.render('admin.ejs',   { datos: resp, datos1: resp1, datos2: resp2, datos3: resp3 });
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


router.post('/precio', (req,res,next) =>{
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res) =>{
    
    //const { dinero } = req.params;
    const prueba = req.body;
    console.log(prueba)
    conn.query('select producto.nombre, producto.activo, producto.precio, especificacion.contenido from producto join especificacion on producto.id_producto = especificacion.id_producto GROUP BY producto.id_producto having producto.precio > ?', [prueba.precio], (err, resp, campos) => {
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

router.post('/ingresa/productos',(req, res,next) => {

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
  
    const {nombre, precio, activo, descripcion, jpg} = req.body;
    conn.query('INSERT into producto SET? ',{
        nombre: nombre,
        precio: precio,
        activo: activo,
        descripcion : descripcion,
        jpg: jpg
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
            res.redirect('/admin/compras');
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
    
    const {nombre, precio, activo, descripcion, jpg}= datitos =  req.body;
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

module.exports = router;
