import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from  '../../docs/swaggerDef.js';

const router = Router();

const specs = swaggerJsdoc({
  definition: swaggerDef,
  apis: ['src/server/docs/*.yml', 'src/server/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

export default router;
