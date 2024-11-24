const express = require('express')

const cors=require('cors')
class Server{


    constructor(){
        this.app=express();
        this.port=process.env.PORT || 3000; // Aqui se declara el puerto en el archivo .env
        this.usuariosPath='/api/usuarios';

        //middlewares 
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares(){
        //Cors

        this.app.use( cors() ); // Configuracion general para usar el cors como middleware

        //Lectura y parseo del body

        this.app.use(express.json())
        //Direcorio publico como el home
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
          
    }
        
    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }
}



module.exports=Server;
