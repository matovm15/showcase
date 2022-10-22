import { Router } from 'express';
import validate from "../../middlewares/validate.js";
import gigValidation from "../../validations/gig.validation.js";
import auth from '../../middlewares/auth.js';
import { gigController } from '../../controllers/gig.controller.js';

const router = Router();

router
    .route('/')
    .post(auth('manageGigs'), validate(gigValidation.createGig), gigController.createGig)
    .get(auth('getGigs'), validate(gigValidation.getGigs), gigController.getGigs);

router
    .route('/:gigId')
    .get(auth('getGigs'), validate(gigValidation.getGig), gigController.getGigById)
    .patch(auth('manageGigs'), validate(gigValidation.updateGig), gigController.updateGigById)
    .delete(auth('manageGigs'), validate(gigValidation.deleteGig), gigController.deleteGigById);

export default router;

/**
 * @swagger
 * tags:
 *  name: Gigs  
 * description: Gig management and retrieval
 * 
*/

/**
 * @swagger
 * /gigs:
 *   post:
 *    summary: Create a gig
 *    description: Only authenticated users can create gigs.
 *    tags: [Gigs]
 *    security:
 *     - bearerAuth: []
 *   requestBody:
 *    required: true
 *   content:
 *   application/json:
 * 
 * 
 * 
 * 
 * 
 */