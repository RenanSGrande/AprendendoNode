const express = require('express');
const connection = require('./database/connection');
const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')



const routes = express.Router();

routes.post('/sessions' , sessionController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.index);




module.exports = routes;