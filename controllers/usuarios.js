const {response}= require('express')
const bcryptjs= require('bcryptjs');
const Usuario= require('../models/usuario');
const fs = require('fs').promises;  // Importamos fs.promises
const path = require('path');

const usuariosGet=(req=request, res=response) =>{

    const {q,nombre='No name',apikey,page=1,limit=10}=req.query;

    res.json({
 
      "msg":"get api controlador"  ,
      q,
      nombre,
      apikey,
      page,
      limit
    })
}
const usuariosPut= (req, res) => {
    
    const body=req.body;
    res.json({
      "msg" : "Put",
      body
    });
}
const usuariosPost= async (req, res) => {
    

    const {nombre,correo,password,rol}=req.body;
    const usuario= new Usuario({nombre,correo,password,rol});

    //Verificar si el correo existe

/*     const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
      return res.status(400).json({
        msg: 'El correo ya está registrado'
      })
    } */

    //Encriptar la contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password, salt);

    await usuario.save(); //Guardar en DB


    //Se crea un directorio para uardar los archivos del usuario
    async function crearDirectorio(nombre) {
      try {
        // Obtén la ruta absoluta del directorio raíz del proyecto
        const rutaDirectorio = path.resolve(__dirname, '../public/uploads/UsersFileSystem', nombre);
    
        // Crea el directorio de manera asincrónica usando promesas
        await fs.mkdir(rutaDirectorio, { recursive: true });
        console.log(`Directorio ${rutaDirectorio} creado correctamente`);
      } catch (error) {
        console.error('Error al crear el directorio:', error.message, error.stack);
      }
    }
    //Se manda a llamar la funcion para crear la carpeta del usuario
    crearDirectorio(nombre);
    

    res.json({
      msg: 'post API - usuariosPost',
      usuario
    });
}



const usuariosDelete= (req, res) => {
    res.json({
      msg: "delete API",
})};

const usuariosPatch= (req, res) => {
    res.json({
      msg: "patch API",
})};
module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}