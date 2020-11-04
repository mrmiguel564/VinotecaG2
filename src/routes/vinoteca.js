const express = require('express');
const passport = require('passport');
const router = express.Router();

const conn = require('../database'); // Buscando el archivo de conf de la base de datos

router.get('/', (req,res) => {
    //res.render('index.ejs');
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('vinoteca.ejs',   { datos: resp });
    });
    
});
//hola2 
router.post('/login',passport.authenticate('local',{
    successRedirect: "/correcto",
    failureRedirect: "/login"
}));

router.get('/contacto', (req,res) => {
    res.render('contacto.ejs',{title: 'Pagina de contacto'});
});
router.get('/prueba', (req,res) => {
    res.render('prueba.ejs',{title: 'Pagina de contacto'});
});

router.get('/admin', (req,res) => {
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('admin.ejs',   { datos: resp });
    });
});
router.get('/admin/productos', (req,res) => {
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('productos.ejs',   { datos: resp });
    });
});

router.get('/admin/personas', (req,res) => {
    conn.query('Select * from usuario', (err,resp,campos) => {
        //console.log(resp);
        res.render('personas.ejs',   { datos: resp });
    });
});

router.get('/admin/compras', (req,res) => {
    conn.query('Select * from compra', (err,resp,campos) => {
        //console.log(resp);
        res.render('compras.ejs',   { datos: resp });
    });
});
router.get('/login', (req,res) => {
    res.render('login.ejs',{title: 'chequeo del login'});
});

router.get('/eliminar/:id_producto', (req,res) =>{
    
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

router.get('/eliminar1/:correo', (req,res) =>{
    
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

router.get('/eliminar2/:id_compra', (req,res) =>{
    
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

router.post('/ingresa/productos',(req, res) => {
    //console.log(req.body);
    const {nombre, precio, activo, descripcion,} = req.body;
    conn.query('INSERT into producto SET? ',{
        nombre: nombre,
        precio: precio,
        activo: activo,
        descripcion : descripcion,
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

router.post('/ingresa/personas',(req, res) => {
    //console.log(req.body);
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

router.post('/ingresa/compras',(req, res) => {
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
// router.get('/', (req,res) => {
//     //res.render('listad.ejs');
//     conn.query('Select * from producto', (err,resp,campos) => {
//         //console.log(resp);
//         console.log("estoy dentro")
//         res.render('admin.ejs',  {datitos: resp});
//     });
// });


// router.post('/',(req, res) => {
//     conn.query('insert into jugador values("8","Luis","Cisternas","2020-05-15")',(err,resp,campos) =>{
//         if(!err) {
//             res.json({status: 'Jugador Ingresado'});
//           } else {
//             console.log(err);
//           }
//     });
// });

module.exports = router;
