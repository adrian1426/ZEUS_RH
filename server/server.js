/*
Archivo de servidor, archivo de express, nos permite crear e inicializar nuestro servidor,
gracias a este archivo vamos a arrancar el servidor
*/
const express=require('express');
const morgan=require('morgan');
const path=require('path');
const app=express();
const {mongoose}=require('../models/connect_database');

//--Settings(configuración)
//configuramos cuando nuestro sitio sea desplegado en la nube
app.set('port',process.env.PORT||3001);


//--Middlewares(funciones que se ejecutan antes de que lleguen a las rutas)
//morgan sirve para visualizar las peticiones en consola
app.use(morgan('dev'));
//esta función comprueba si un dato es formato json y accede a ella
app.use(express.json());


//--Routes(urls que nuestro servidor tendrá)

//api para usuarios_prueba *eliminar después
app.use('/api/users',require('../routes/user.routes'));

//api para test
app.use('/api/test',require('../routes/test.routes'));

//api para eneatipos
app.use('/api/eneatipos',require('../routes/eneatipos.routes'));

//api para preguntas
app.use('/api/preguntas',require('../routes/preguntas.routes'));

//api para respuesta de desempate
app.use('/api/res_desempate',require('../routes/res_desempate.routes'));

//api para casos de desempate
app.use('/api/caso_desempate',require('../routes/casos_desempate.routes'));

//api para guardar y publicar
app.use('/api/guardar_test',require('../routes/guardar_test.routes'));

//api para guardar y consultar resultados
app.use('/api/resultados',require('../routes/guardar_resultado.routes'));

//api para tipos de test
app.use('/api/tipos_test',require('../routes/tipos_test.routes'));

//api para idiomas
app.use('/api/idiomas',require('../routes/idiomas.routes'));

//api para idiomas
app.use('/api/paises',require('../routes/paises.routes'));

//api para usuarios
app.use('/api/usuarios',require('../routes/usuario.routes'));


//--Starting the server
app.listen(app.get('port'),()=>{
    //otra forma de desplegar mensaje e inicia el servicio
    console.log(`Server on port: ${app.get('port')}`);
});

