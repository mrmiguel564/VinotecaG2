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


module.exports = router;