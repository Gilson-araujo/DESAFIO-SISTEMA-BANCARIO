const express = require('express');
const axios = require('axios');

const app = express();


const instanciaAxios = axios.create({

    
})

app.get('/', async(req,res) => {
    const resultado = await axios.get('http://localhost:3000/homepage/off')
    //axios.post()
    console.log(resultado)
})
