import httpStatus from 'http-status';
import { Gig } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a gig
 * @param {Object} gigBody
 * @returns {Promise<Gig>}
 * @throws {ApiError}
 */
const createGig = async (gigBody) => {
  return Gig.create(gigBody);
};

/**
 * Query for gigs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 * @throws {ApiError}
 */
const queryGigs = async (filter, options) => {
  const gigs = await Gig.paginate(filter, options);
  return gigs;
};

/**
 * Get gig by id
 * @param {ObjectId} id
 * @returns {Promise<Gig>}
 * @throws {ApiError}
 */
const getGigById = async (id) => {
  return Gig.findById(id);
};

/**
 * Update gig by id
 * @param {ObjectId} gigId
 * @param {Object} updateBody
 * @returns {Promise<Gig>}
 * @throws {ApiError}
 */
const updateGigById = async (gigId, updateBody) => {
  const gig = await getGigById(gigId);
  if (!gig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gig not found');
  }
  Object.assign(gig, updateBody);
  await gig.save();
  return gig;
};

/**
 * Delete gig by id
 * @param {ObjectId} gigId
 * @returns {Promise<Gig>}
 * @throws {ApiError}
 * @throws {ApiError}
 */
const deleteGigById = async (gigId) => {
  const gig = await getGigById(gigId);
  if (!gig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gig not found');
  }
  await gig.remove();
  return gig;
};

/**
 * Get gigs by user id
 * @param {ObjectId} userId
 * @returns {Promise<Gig[]>}
 * @throws {ApiError}
 */
const getGigsByUserId = async (userId) => {
  return Gig.find({ user: userId });
};

export const gigService = {
  createGig,
  queryGigs,
  getGigById,
  updateGigById,
  deleteGigById,
  getGigsByUserId,
};
