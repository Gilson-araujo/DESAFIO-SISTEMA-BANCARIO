const jwt = require('jsonwebtoken');
const senhaJWT= 'umasenhasegura';

const Verificar_user_logado = async (req,res,next) => {
    try{
    const {authorization} = req.headers;

    const token = authorization.split(' ')[1];

    const verificarToken = jwt.verify(token,senhaJWT); // verifica se o token ta correto

    if(!verificarToken){
       return res.status(401).json({mensagem:'Não Autorizado'})
    }

    next()

}catch(error){
    return res.status(401).json({mensagem:'Não Autorizado'})
}
}

module.exports = {Verificar_user_logado}
