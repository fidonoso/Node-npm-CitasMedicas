
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
const _ = require('lodash')
const axios = require("axios");
//uso: puerto 3000
// 1.- abrir el archivo index.html en el navegador.
// 2._ejecutar en la terminal 'npm start'
// 3.-presionar el boton 'Consultar' en el navegador
let gente =[]
function Personas(nombre, apellido, ID, timestamp){
    this._nombre=nombre,
    this._apellido=apellido,
    this._ID=ID,
    this._timestamp=timestamp   
    this.ficha=function(){
       return `Nombre: ${this._nombre} - Apellido: ${this._apellido} - ID: ${this._ID} - Timestamp: ${this._timestamp}`
     }   
}
axios
.get("https://randomuser.me/api/?results=7")
.then((info) => {
const dato = info.data.results.map(el=> Object.values(el.name).splice(1,2))
dato.forEach(el =>{
    let persona = new Personas(el[0], el[1], uuidv4().slice(30,36) ,moment().format('MMMM Do YYYY, h:mm:ss a'))
    gente.push(persona)
})
})
.catch((e) => {
console.log(e);
});

module.exports = {gente}