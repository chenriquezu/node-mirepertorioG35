const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

//importaciones para callback
const{home,leerCanciones,insertarCancion,BorrarCancion,editarCancion} = require('./src/controllers/component');

//se define  carpeta public
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware para el análisis del cuerpo de la solicitud en formato JSON.
app.use(express.json());

app.get('/',home);
app.get('/canciones', leerCanciones);
app.post('/canciones',insertarCancion);
app.delete('/canciones/:id', BorrarCancion);
app.put('/canciones/:id',editarCancion);
//inicio del servidor
app.listen(3000, console.log("¡Servidor encendido!"));
