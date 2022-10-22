import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { gigService } from '../services/index.js';

const createGig = catchAsync(async (req, res) => {
  const gig = await gigService.createGig(req.body);
  res.status(httpStatus.CREATED).send(gig);
});

const getGigs = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gigService.queryGigs(filter, options);
  res.send(result);
});


const getGigById = catchAsync(async (req, res) => {
  const gig = await gigService.getGigById(req.params.gigId);
  if (!gig) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Gig not found');
  }
  res.send(gig);
});

const updateGigById = catchAsync(async (req, res) => {
  const gig = await gigService.updateGigById(req.params.gigId, req.body);
  res.send(gig);
});

const deleteGigById = catchAsync(async (req, res) => {
  await gigService.deleteGigById(req.params.gigId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const gigController = {
  createGig,
  getGigs,
  getGigById,
  updateGigById,
  deleteGigById,
};
