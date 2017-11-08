import {
    event,
    eventList,
    createEvent,
    addVote
} from '../handlers/events';
import Joi from 'joi';

export const routes = [
    { method: 'GET', path: '/event/list', handler: eventList },
    { method: 'GET', path: '/event/{id}', handler: event },
    { method: 'POST', path: '/event/{id}/vote', config: {
        handler: addVote,
        validate: {
            payload: {
                name: Joi.string().min(1).required(),
                votes: Joi.array().min(1).required()
            }
        }
    } },
    { method: 'POST', path: '/event', config: {
        handler: createEvent,
        validate: {
            payload: {
                name: Joi.string().min(1).required(),
                dates: Joi.array().min(1).required()
            }
        }
    } }
];