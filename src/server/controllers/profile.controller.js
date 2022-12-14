import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { profileService } from '../services/index.js';

const createProfile = catchAsync(async (req, res) => {
  const id = req.body.id;
  console.log(id);
  const profile = await profileService.createProfile(req.body, id);
  res.status(httpStatus.CREATED).send(profile);
});

const getProfiles = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await profileService.queryProfiles(filter, options);
  res.send(result);
});

// get user via token
const getUserViaToken = catchAsync(async (req, res) => {
  const { token } = req.params;
  const userToken = await profileService.getUserByToken(token);
  const id = userToken.user.toString();
  res.json({ id });
});

// get profile for current user
const getProfile = catchAsync(async (req, res) => {
  const profile = await profileService.getProfileByUserId(req.user.id);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  res.send(profile);
});

const getProfileById = catchAsync(async (req, res) => {
  const profile = await profileService.getProfileById(req.params.profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  res.send(profile);
});

const updateProfileById = catchAsync(async (req, res) => {
  const profile = await profileService.updateProfileById(req.params.profileId, req.body);
  res.send(profile);
});

const deleteProfileById = catchAsync(async (req, res) => {
  await profileService.deleteProfileById(req.params.profileId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const profileController = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  getProfile,
  getUserViaToken,
};
