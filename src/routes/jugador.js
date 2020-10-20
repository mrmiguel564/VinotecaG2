const express = require('express');
const passport = require('passport');
const router = express.Router();

const conn = require('../database'); // Buscando el archivo de conf de la base de datos

router.get('/', (req,res) => {
    //res.render('listad.ejs');
    conn.query('Select * FROM jugador', (err,resp,campos) => {
        console.log(resp);
        res.render('index.ejs',{
            datos: resp
        });
    });
});

router.get('/contacto', (req,res) => {
    res.render('contacto.ejs',{title: 'SUPER PAGINA!!!!'});
});

router.post('/ingresar',(req, res) => {
    //console.log(req.body);
    const {id_jugador, nombre, apellido} = req.body;
    conn.query('INSERT into jugador SET? ',{
        id_jugador: id_jugador,
        nombre: nombre,
        apellido: apellido,
        fecha_nacimiento: new Date()
    }, (err, result) => {
        if(!err) {
            res.redirect('/');
        } else {
            console.log(err);
        }
    });
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

// MANEJO DE SESIONES
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