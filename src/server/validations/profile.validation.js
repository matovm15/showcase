import Joi from 'joi';
import { objectId } from './custom.validation.js';

const createProfile = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    title: Joi.string().required(),
    avatar: Joi.string().required(),
    bio: Joi.string().required(),
    skills: Joi.array().required(),
    services: Joi.array().items(Joi.string().custom(objectId)),
    work_experience: Joi.array().items(
      Joi.object().keys({
        job_title: Joi.string().required(),
        company: Joi.string().required(),
        current: Joi.boolean().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
      })
    ),
    education_history: Joi.array().items(
      Joi.object().keys({
        school_name: Joi.string().required(),
        start_year: Joi.string().required(),
        end_year: Joi.string().required(),
      })
    ),
    certifications: Joi.array().items(Joi.string()),
    fee: Joi.string().required(),
  }),
};

const getProfiles = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProfile = {
  params: Joi.object().keys({
    profileId: Joi.string().custom(objectId),
  }),
};

const updateProfile = {
  params: Joi.object().keys({
    profileId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.string().custom(objectId),
      avatar: Joi.string(),
      services: Joi.array().items(Joi.string().custom(objectId)),
      work_experience: Joi.array().items(
        Joi.object().keys({
          job_title: Joi.string().required(),
          company: Joi.string().required(),
          current: Joi.boolean().required(),
          start_date: Joi.string().required(),
          end_date: Joi.string().required(),
        })
      ),
      education_history: Joi.array().items(
        Joi.object().keys({
          school_name: Joi.string().required(),
          start_year: Joi.string().required(),
          end_year: Joi.string().required(),
        })
      ),
      certifications: Joi.array().items(Joi.string()),
      fee: Joi.string(),
    })
    .min(1),
};

const deleteProfile = {
  params: Joi.object().keys({
    profileId: Joi.string().custom(objectId),
  }),
};



export default {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
