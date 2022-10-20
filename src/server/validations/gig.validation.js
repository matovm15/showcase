import Joi from 'joi';
import { objectId } from './custom.validation.js';

const createGig = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    title: Joi.string().required(),
    description: Joi.string().required(),
    service_provider: Joi.string().required().custom(objectId),
    duration: Joi.string().required(),
    price: Joi.string().required(),
    status: Joi.string().required().valid('open', 'closed'),
  }),
};

const getGigs = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getGig = {
  params: Joi.object().keys({
    gigId: Joi.string().custom(objectId),
  }),
};

const updateGig = {
  params: Joi.object().keys({
    gigId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.string().custom(objectId),
      title: Joi.string(),
      description: Joi.string(),
      service_provider: Joi.string().custom(objectId),
      duration: Joi.string(),
      price: Joi.string(),
      status: Joi.string().valid('open', 'closed'),
    })
    .min(1),
};

const deleteGig = {
  params: Joi.object().keys({
    gigId: Joi.string().custom(objectId),
  }),
};

export default {
  createGig,
  getGigs,
  getGig,
  updateGig,
  deleteGig,
};
