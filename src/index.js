const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs'); 

// Middleware (funciones que se procesan antes de llegar a rutas)
app.use(express.json()); //Transfomar a formato JSON 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('el secreto'));
app.use(session({
     secret: 'el secreto',
     resave: true, //la sesión se guardar cada vez
     saveUninitialized: true    //Si inicializamos y no le guardamos nada igual va a guardar
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username,password,done){
    if(username === "programacionweb" && password === "987654321")
    
     return done(null,{id:1, name: "Manuel"});

     done(null,false);
}));
//Serialización, parar la información para identificar usuario en passport
passport.serializeUser(function(user,done){
     done(null,user.id);
});
//Deserializacion
passport.deserializeUser(function(id,done){
     done(null, {id:1, name: "Manuel"})
});

app.use(require('./routes/vinoteca'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
     console.log('Servidor en puerto ',app.get('port'))
});