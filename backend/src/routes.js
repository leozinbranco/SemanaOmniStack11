const express = require('express');

const routes = express.Router();  //modulo de rotas em uma nova variável, no lugar de app.

const ongController = require('./controllers/OngControllers');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

connection = require('./database/connection');

routes.get('/ongs',ongController.index);
routes.post('/ongs', ongController.create); 

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);

routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.index);

routes.post('/sessions', sessionController.create);

module.exports = routes;