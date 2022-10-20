import config from "../config/config.js";

const version = config.version;

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Show case API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/matovm15/showcase/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

export default swaggerDef;
