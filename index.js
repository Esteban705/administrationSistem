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
 app.use(express.urlencoded({ extended: false }));
 app.use(express.json());
 app.get('/urlparam', (req, res) => {
    res.send(req.query);
  });
  app.post('/urljson', (req, res) => {
    res.send(req.body);
  });


//escuchar peticiones 
app.listen(process.env.PORT, () =>{

    console.log(`corriendo el puerto ${process.env.PORT}`)
})
console.log('enzo puto')