import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import profileValidation from '../../validations/profile.validation.js';
import auth from '../../middlewares/auth.js';
import { profileController } from '../../controllers/profile.controller.js';

const router = Router();

router
  .route('/')
  .post(auth('manageProfiles, manageProfile'), validate(profileValidation.createProfile), profileController.createProfile)
  .get(auth('getProfiles'), validate(profileValidation.getProfiles), profileController.getProfiles);

router.route('/me').get(auth('getProfile'), validate(profileValidation.getProfile), profileController.getProfile);

router
  .route('/:profileId')
  .get(auth('getProfiles'), validate(profileValidation.getProfile), profileController.getProfileById)
  .patch(auth('manageProfiles'), validate(profileValidation.updateProfile), profileController.updateProfileById)
  .delete(auth('manageProfiles'), validate(profileValidation.deleteProfile), profileController.deleteProfileById);

router.route('/token/:token').get(profileController.getUserViaToken);

router.route('/create-profile').post(profileController.createProfile);

export default router;
