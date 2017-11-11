import Joi from 'joi';
import {
  event,
  eventList,
  createEvent,
  addVote,
  result,
} from '../handlers/events';

const routes = [
  {
    method: 'GET',
    path: '/api/v1/event/list',
    config: {
      handler: eventList,
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/api/v1/event/{id}',
    config: {
      handler: event,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/event/{id}/results',
    config: {
      handler: result,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/event/{id}/vote',
    config: {
      handler: addVote,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number(),
        },
        payload: {
          name: Joi.string().required(),
          votes: Joi.array().items(Joi.date()).min(1).unique()
            .required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/event',
    config: {
      handler: createEvent,
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().required(),
          dates: Joi.array().items(Joi.date()).min(1).unique()
            .required(),
        },
      },
    },
  },
];

export default routes;
