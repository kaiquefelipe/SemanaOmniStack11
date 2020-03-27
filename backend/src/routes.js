const express = require('express');
const OngsController = require('./controllers/OngsController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngsController.list);
routes.post('/ongs', OngsController.create);

routes.get('/profile', ProfileController.list);

routes.get('/incidents', IncidentsController.list);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;