import { Router } from 'express';
import swaggerJsdoc from('swagger-jsdoc');
import swaggerUi from('swagger-ui-express');
import swaggerDef from  '../../docs/swaggerDef.js';

const router = Router();

const specs = swaggerJsdoc({
  swaggerDef,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
