import Hapi from 'hapi';
import { routes } from './routes/events';

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route(routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

export default server;