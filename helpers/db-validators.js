const Role= require('../models/role')
const Usuario= require('../models/usuario')
const esRoleValido = async (rol='') =>{

    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }

   }

const emailValido=  async (correo='') =>{
    const emailExiste= await Usuario.findOne({correo});
    if(emailExiste){
      return res.status(400).json({
        msg: 'El correo ya está registrado'
      })
    }
}



   module.exports= {
    esRoleValido,
    emailValido
   }