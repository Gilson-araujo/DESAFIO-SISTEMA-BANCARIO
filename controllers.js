const lod = require('lodash');
const fs = require('fs/promises');
const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Verificar_user_logado } = require('./AuthMiddleware');
const senhaJWT= 'umasenhasegura';

const pool = new Pool({
    host:'localhost',
    port: 5432,
    user:'postgres',
    password:'**********',
    database:'biblioteca'
})


const login = async (req,res) => {

    try{

     const dados = req.body;

     const user = await pool.query( 
         'SELECT * from clientes WHERE email = $1;',[dados.email]);

    const token = jwt.sign({ id: user.rows[0].id},senhaJWT, {expiresIn: '1h'}); // gera o token para o usuario

    if(user.rowCount < 1){
        res.status(500).json('Email ou senha inválidos');
    }
    
    const verificarSenha = await bcrypt.compare(dados.senha , user.rows[0].senha) 

    if(!verificarSenha){
        res.status(500).json('Email ou senha inválidos');
    }

    const {senha,...usuariologado} = user.rows[0]; // exclui senha criptografada da requisição

    console.log(token)

    res.send('Login efetuado com Sucesso');

}catch(error){
    res.status(500).json(error.message);   
}
}

const criar_conta = async (req,res) => {

    try{
    const dados = req.body;

    const get_cliente = await pool.query( 
        'SELECT * from clientes WHERE email = $1;',[dados.email]);

   if(get_cliente.rowCount == 1){
       res.status(500).json('Email já cadastrado');
   }

   const senhaCriptografada = await bcrypt.hash(dados.senha,10);

    const add_senha = await pool.query( 
        'INSERT INTO clientes (nome, data_nascimento, email, senha, tipo_cliente, saldo) VALUES ($1, $2, $3, $4, $5, $6);',[dados.nome, dados.data, dados.email, senhaCriptografada, dados.tipo, dados.saldo]);

    res.send('Cadastro realizado com sucesso');

   }catch(erro){
    res.status(500).json(erro.message);
   }
}

const homepage = async(req,res) => {
    try{

    res.send('Olá');

} catch(erro){
    res.status(500).json({erro:erro.message});
}
}

const mudar_senha = async (req,res) => {

    const senhaCriptografada = await bcrypt.hash(dados.senha,10);

    const add_senha = await pool.query( 
        'UPDATE clientes SET senha = $1 WHERE email = $2;',[senhaCriptografada,dados.email]);
} //Está para ser criado


module.exports = {
    login,
    criar_conta,
    homepage,
    mudar_senha,
    ExcluirConta
}
