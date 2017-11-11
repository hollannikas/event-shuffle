import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import routes from './routes/events';

const port = process.env.PORT || 8000;

const server = new Hapi.Server();

server.connection({
  port,
  routes: {
    cors: true,
  },
});

const startServer = async () => {
  try {
    await server.register(Inert);
    await server.register(Vision);
    await server.register({
      register: HapiSwagger,
      options: {
        info: {
          title: 'Event Shuffle API Documentation',
          version: '1',
        },
      },
    });
    await server.start();
    server.route(routes);
    // eslint-disable-next-line no-console
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(-1);
  }
};

startServer();

export default server;
