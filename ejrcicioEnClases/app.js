const { exec } = require('child_process');
const chalk = require('chalk')
const http = require('http');
const url = require('url')
const {gente} = require('./index.js')
//uso: puerto 3000
// 1.- abrir el archivo index.html en el navegador.
// 2._ejecutar en la terminal 'npm start'
// 3.-presionar el boton 'Consultar' en el navegador
exec('node index.js',()=>{
    // console.log(gente)
     let users='' 
     let users2='' //para HTML
     gente.forEach((el, index)=>{
         users =  users + el.ficha() + '\n';
         users2=users2 + el.ficha() + '</li> <li>'
        })
      
    http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type': 'text/html'})
        const params = url.parse(req.url, true).query 
        console.log(params.usuarios)
        if(req.url.includes('/consulta')){
            console.log(chalk.blue.bgWhite.bold(users))
            console.log(chalk.blue.bgWhite.bold('exito en la consulta'))
            res.write(`<h1>Consulta</h1><br> <h2>Lista de usuarios</h2><br/><ol><li>${users2.slice(0, users2.length-4)}</ol>`, 'UTF-8')
            res.end()
        }else{
            res.write(`<h1 class='text-warning '>Consulta inválida</h1><br> <h2>vuelva a intentarlo</h2><br/>`, 'UTF-8')
            res.end()
        }
    }).listen(3000,()=> console.log('Escuchando en el puerto 3000'))
})
