'use strict'
const { Low, JSONFile } = require('lowdb');
const path = require('path');
const filePath = path.join(__dirname, '/');

const file = path.join(filePath, 'products.json')

let db; 

// Se prueba crear una funcion que retorne la db conformada pero ingresa en un bucle
// Lo que se opta es por que en el archivo json contenga las dos "bases"
// para correr correctamente se tuvo que modificar el package.json para ignorar el archivo puesto 
// generaba un bucle infinito, ya que buscaba cambios constantentes en ese archivo
const createConnection = async () =>{
    db = new Low(new JSONFile(file))
    await db.read()
    db.data ||= { product: [], chat: [] }
    await db.write();
};

const getConnection = () => db;



module.exports = { getConnection, createConnection}