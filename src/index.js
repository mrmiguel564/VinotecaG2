const express = require('express');
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000); 

// Middleware (funciones que se procesan antes de llegar a rutas)
app.use(express.json()); //Transfomar a formato JSON 

// Rutas (URL)
app.use(require('./routes/jugador'));


 app.listen(app.get('port'), () => {
     console.log('Servidor en puerto ',app.get('port'))
 });