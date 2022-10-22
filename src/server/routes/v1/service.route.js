import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import serviceValidation from '../../validations/service.validation.js';
import auth from '../../middlewares/auth.js';
import { serviceController } from '../../controllers/service.controller.js';

const router = Router();

router
  .route('/')
  .post(auth('manageServices'), validate(serviceValidation.createService), serviceController.createService)
  .get(auth('getServices'), validate(serviceValidation.getServices), serviceController.getServices);

router
  .route('/:serviceId')
  .get(auth('getServices'), validate(serviceValidation.getService), serviceController.getServiceById)
  .patch(auth('manageServices'), validate(serviceValidation.updateService), serviceController.updateServiceById)
  .delete(auth('manageServices'), validate(serviceValidation.deleteService), serviceController.deleteServiceById);

export default router;
