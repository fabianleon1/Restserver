const { Router } = require("express");
const {check} = require('express-validator')
const { esRoleValido, emailValido } = require("../helpers/db-validators");

const {validarCampos} = require('../middlewares/validar-campos')
const { usuariosGet,
   usuariosPut, 
   usuariosPost, 
   usuariosDelete ,
    usuariosPatch} = require("../controllers/usuarios");



const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut
);

router.post("/",[
    
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('password', ' La contraseña debe de ser mas de 6 caracteres').isLength({min:6}),
    check('correo').custom(emailValido),
   // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check('rol').custom( esRoleValido ),
    validarCampos
]
    , usuariosPost);

router.delete("/", usuariosDelete
);
router.patch("/", usuariosPatch
);
module.exports = router;
