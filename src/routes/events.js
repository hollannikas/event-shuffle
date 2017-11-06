import {
    event,
    eventList,
    createEvent,
    addVote
} from '../handlers/events';

export const routes = [
    { method: 'GET', path: '/event/list', handler: eventList },
    { method: 'GET', path: '/event/{id}', handler: event },
    { method: 'POST', path: '/event/{id}/vote', handler: addVote },
    { method: 'POST', path: '/event', handler: createEvent }
];