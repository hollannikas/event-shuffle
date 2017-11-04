import {
    event,
    eventList,
    createEvent
} from '../handlers/events';

export const routes = [
    { method: 'GET', path: '/event/list', handler: eventList },
    { method: 'GET', path: '/event/{id}', handler: event },
    { method: 'POST', path: '/event', handler: createEvent }
];