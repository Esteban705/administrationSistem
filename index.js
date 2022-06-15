const express = require('express');
const conectDB = require('./database/config');
require('dotenv').config();



//crear el servidor

const app = express();

conectDB();

//directorio publico

app.use(express.static('public'));

app.use( express.json() );

//rutas
 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/mesas', require('./routes/mesas'));


//escuchar peticiones 
app.listen(process.env.PORT, () =>{

    console.log(`corriendo el puerto ${process.env.PORT}`)
})

