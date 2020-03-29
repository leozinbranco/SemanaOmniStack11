const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');
const routes = express.Router();  //modulo de rotas em uma nova variável, no lugar de app.

const ongController = require('./controllers/OngControllers');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

connection = require('./database/connection');

routes.get('/ongs',ongController.index);

routes.post('/ongs', celebrate({
    /*QUERY params, body params, route params*/
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),   //outras coisas ele so descartar 
}), profileController.index);


routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),  
}),incidentController.create);

routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), 
    }),
}) ,incidentController.index);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) ,incidentController.delete);


routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        city: Joi.string().required(),
    }),
}) ,sessionController.create);

module.exports = routes;