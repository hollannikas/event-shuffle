import {
    event,
    eventList,
    createEvent,
    addVote,
    result
} from '../handlers/events';
import Joi from 'joi';

export const routes = [
    { method: 'GET', path: '/api/v1/event/list', handler: eventList },
    { method: 'GET', path: '/api/v1/event/{id}', handler: event },
    { method: 'GET', path: '/api/v1/event/{id}/results', handler: result },
    { method: 'POST', path: '/api/v1/event/{id}/vote', config: {
        handler: addVote,
        validate: {
            payload: {
                name: Joi.string().min(1).required(),
                votes: Joi.array().min(1).required()
            }
        }
    } },
    { method: 'POST', path: '/api/v1/event', config: {
        handler: createEvent,
        validate: {
            payload: {
                name: Joi.string().min(1).required(),
                dates: Joi.array().min(1).required()
            }
        }
    } }
];