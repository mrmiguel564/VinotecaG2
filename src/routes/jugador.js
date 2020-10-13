const express = require('express');
const router = express.Router();

const conn = require('../database'); // Buscando el archivo de conf de la base de datos

router.get('/', (req,res) => {
    //res.render('index.ejs');
    conn.query('Select * from producto', (err,resp,campos) => {
        console.log(resp);
        res.render('vinoteca.ejs',   { datos: resp });
    });
    
});


router.get('/contacto', (req,res) => {
    res.render('contacto.ejs',{title: 'Pagina de Contacto'});
});

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