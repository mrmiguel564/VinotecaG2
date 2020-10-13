const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

// Configuración
console.log(__dirname);
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views')); 
app.set('view engine','ejs'); 

// Middleware (funciones que se procesan antes de llegar a rutas)
app.use(express.json()); //Transfomar a formato JSON 
app.use(bodyParser.urlencoded({extended: false}));

// Rutas (URL)
// app.get('/',(req,res) => { 
//      res.render('index.ejs')
//      //res.sendFile(path.join(__dirname,'views/index.html'));
//      //console.log(path.join(__dirname,'views/index.html'));
// });
app.use(require('./routes/jugador'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
     console.log('Servidor en puerto ',app.get('port'))
});