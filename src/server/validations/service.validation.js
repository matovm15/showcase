import Joi from 'joi';
import { objectId } from './custom.validation.js';

const createService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    skills: Joi.array().required(),
  }),
};

const getServices = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getService = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
};

const updateService = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    skills: Joi.array(),
  }),
};

const deleteService = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
};

export default {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
