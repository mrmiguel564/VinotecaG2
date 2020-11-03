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
//hola 
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
        res.render('admin.ejs',   { datos: resp });
    });
});

router.get('/admin/personas', (req,res) => {
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('admin.ejs',   { datos: resp });
    });
});

router.get('/admin/compras', (req,res) => {
    conn.query('Select * from producto', (err,resp,campos) => {
        //console.log(resp);
        res.render('admin.ejs',   { datos: resp });
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
            res.redirect('/admin')
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

router.post('/ingresa',(req, res) => {
    //console.log(req.body);
    const {nombre, precio, activo, descripcion,} = req.body;
    conn.query('INSERT into producto SET? ',{
        nombre: nombre,
        precio: precio,
        activo: activo,
        descripcion : descripcion,
    }, (err, result) => {
        if(!err) {
            res.redirect('/admin');
            console.log("Datos agregados con exito");
            console.log(result);
        } else {
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
