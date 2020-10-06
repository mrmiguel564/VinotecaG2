const express = require('express');
const router = express.Router();

const conn = require('../database');

router.get('/', (req,res) => {
    conn.query('Select * from producto', (err, resp, campos) => {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id', (req,res) =>{
    const { id } = req.params;
    conn.query('Select * from jugador WHERE  = ?', [id], (err, resp, campos) => {
        if(!err){
            //res.json(resp); Mostar Arreglo Json
            res.json(resp[0]); //Mostrar Objeto 
        }else{
            console.log(err);
        }
    });
});

router.post('/',(req, res) => {
    conn.query('insert into jugador values("5","Pedro","Gonzales","2020-05-15")',(err,resp,campos) =>{
        if(!err) {
            res.json({status: 'Jugador Ingresado'});
          } else {
            console.log(err);
          }
    });
});

module.exports = router;