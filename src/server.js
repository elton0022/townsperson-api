const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const port = process.env.PORT || 3333;
const app = express()

app.use(cors());

app.use('/photos', express.static(path.resolve(__dirname, 'uploads', 'resized')));

app.use(express.json());

app.use(routes)

app.listen(port, ()=>{
    console.info('Rodando na porta')
});