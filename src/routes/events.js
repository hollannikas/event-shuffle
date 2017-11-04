import { helloWorld } from '../handlers/events';

export const routes = [
    { method: 'GET', path: '/hello', handler: helloWorld }
];