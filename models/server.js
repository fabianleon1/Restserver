const express = require('express')

const cors=require('cors');
const { dbConnection } = require('../database/config');
class Server{


    constructor(){
        this.app=express();
        this.port=process.env.PORT; // Aqui se declara el puerto en el archivo .env
        this.usuariosPath='/api/usuarios';
    

        //Conectar a base de datos
        this.conectarDB();

        //middlewares 
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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