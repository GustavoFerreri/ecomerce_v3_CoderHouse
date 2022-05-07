'use strict'

require('dotenv').config();

// Puerto del servidor
const port = process.env.PORT || 8000;

// App
const app = require('./src/app')

// Tareas
// const {} = require ('./src/controllers/task.controller')

//  Base de datos
// const { createConnection } = require('./src/database')

// Socket.Io
const http = require ('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Configuramos las entrada y salidas del servidor
io.on("connection", (socket)=>{
    console.warn('User Connected!')
    socket.on('allProduct', ()=>{})
    socket.on('createProduct', ()=>{})
})

// Hacemos que el server corra, y escuche el puerto antes configurado
server.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
});
