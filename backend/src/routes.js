const express = require('express');
const OngsController = require('./controllers/OngsController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { celebrate, Joi, Segments } = require('celebrate');
const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id : Joi.string().required(),
    })
}), SessionController.create);

routes.get('/ongs', OngsController.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().required().email(),
        whatsapp : Joi.number().required().min(10).max(13),
        city : Joi.string().required(),
        uf : Joi.string().required().length(2),
    })
}), OngsController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}),ProfileController.list);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentsController.list);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), 
celebrate({
    [Segments.BODY]: Joi.object().keys({
        title : Joi.string().required(),
        description : Joi.string().required(),
        value : Joi.number().required()
    })
}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentsController.delete);

module.exports = routes;