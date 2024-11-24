const {response}= require('express')



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
    
    const id=req.params.id;
    res.json({
      msg: "put API",
      id
    });
}
const usuariosPost= (req, res) => {
    
    const body=req.body;
    const {nombre,edad}=req.body;
    res.json({
      nombre,edad
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