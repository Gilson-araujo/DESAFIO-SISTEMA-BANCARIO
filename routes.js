const express = require('express');
const controllers = require('./controllers');
const middleware = require('./AuthMiddleware');

const route = express();

route.post('/Login', controllers.login);
route.post('/CadastrarUsuario', controllers.criar_conta);
route.delete('/account', controllers.ExcluirConta);

route.use(middleware.Verificar_user_logado);

route.get('/homepage/:log', controllers.homepage);


module.exports = route;
