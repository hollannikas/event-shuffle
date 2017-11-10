import Hapi from 'hapi';
import routes from './routes/events';

const port = process.env.PORT || 8000;

const server = new Hapi.Server();
server.connection({
  port,
  routes: {
    cors: true,
  },
});

server.route(routes);

server.start((err) => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`Server running at: ${server.info.uri}`);
});

export default server;
