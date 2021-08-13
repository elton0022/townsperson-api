const express = require('express');
const multer = require('multer');
const uploadConfig = require('./utils/upload');

const upload = multer(uploadConfig);
const routes = express.Router();

const TownspersonController = require('./controllers/TownspersonController');

routes.get('/townsperson', TownspersonController.getAllTownsperson);
routes.post('/townsperson',upload.single('photo'),TownspersonController.addTownsperson);
routes.put('/townsperson/:id',upload.single('photo'),TownspersonController.updateTownsperson);

module.exports = routes;