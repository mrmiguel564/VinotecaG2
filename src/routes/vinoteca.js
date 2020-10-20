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

router.get('/contacto', (req,res) => {
    res.render('contacto.ejs',{title: 'Pagina de contacto'});
});

router.get('/admin', (req,res) => {
    res.render('Admin.ejs',{title: 'Pagina del Administrador de Vinoteca'});
});

router.get('/eliminar/:id', (req,res) =>{
    const { id } = req.params;
    conn.query('DELETE from jugador WHERE id_jugador = ?', [id], (err, resp, campos) => {
        if(!err){
            //res.json(resp); Mostar Arreglo Json
            //res.json(resp[0]); //Mostrar Objeto 
            res.redirect('/')
        }else{
            console.log(err);
        }
    });
});

router.get('/login', (req,res) =>{
    res.render('login.ejs');
});

router.post('/login',passport.authenticate('local',{
    successRedirect: "/correcto",
    failureRedirect: "/login"
}));

router.get('/correcto', (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    
    res.redirect('/login');
},(req,res) =>{
    res.render('ingreso.ejs');
});
module.exports = router;
//router.post('/ingresar',(req, res) => {
//    //console.log(req.body);
//    const {id_jugador, nombre, apellido} = req.body;
//    conn.query('INSERT into jugador SET? ',{
//        id_jugador: id_jugador,
//        nombre: nombre,
//        apellido: apellido,
//        fecha_nacimiento: new Date()
//   }, (err, result) => {
//        if(!err) {
//            res.redirect('/');
//        } else {
//            console.log(err);
//        }
//    });
//});



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