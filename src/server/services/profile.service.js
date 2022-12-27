import httpStatus from 'http-status';
import { Profile, Token } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a profile
 * @param {Object} profileBody
 * @returns {Promise<Profile>}
 * @throws {ApiError}
 *
 */
const createProfile = async (profileBody, id) => {
  return Profile.create({
    user: id,
    title: profileBody.title,
    avatar: profileBody.avatar,
    skills: profileBody.skills,
    bio: profileBody.bio,
    fee: profileBody.fee,
  });
};

/**
 * Query for profiles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 * @throws {ApiError}
 *
 */
const queryProfiles = async (filter, options) => {
  const profiles = await Profile.paginate(filter, options);
  return profiles;
};

/**
 * Get profile by id
 * @param {ObjectId} id
 * @returns {Promise<Profile>}
 * @throws {ApiError}
 *
 */
const getProfileById = async (id) => {
  return Profile.findById(id);
};

/**
 * Get user by token
 * @param {string} token
 * @returns {Promise<User>}
 */
const getUserByToken = async (token) => {
  return Token.findOne({ token: token });
};

/**
 * Update profile by id
 * @param {ObjectId} profileId
 * @param {Object} updateBody
 * @returns {Promise<Profile>}
 * @throws {ApiError}
 *
 */
const updateProfileById = async (profileId, updateBody) => {
  const profile = await getProfileById(profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  Object.assign(profile, updateBody);
  await profile.save();
  return profile;
};

/**
 * Delete profile by id
 * @param {ObjectId} profileId
 * @returns {Promise<Profile>}
 * @throws {ApiError}
 *
 */
const deleteProfileById = async (profileId) => {
  const profile = await getProfileById(profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  await profile.remove();
  return profile;
};

/**
 * Get profile for current user
 * @param {Object} userId
 * @param {ObjectId} profileId
 * @returns {Promise<Profile>}
 * @throws {ApiError}
 *
 */
const getProfileForUser = async (userId, profileId) => {
  const profile = await getProfileById(profileId);
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');
  }
  if (profile.userId !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  return profile;
};

const getProfileByUserId = async (userId) => {
  return Profile.findOne({ user: userId });
};

export const profileService = {
  createProfile,
  queryProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  getProfileForUser,
  getProfileByUserId,
  getUserByToken,
};
