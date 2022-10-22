import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { serviceService } from '../services/index.js';

const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  res.status(httpStatus.CREATED).send(service);
});

const getServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryServices(filter, options);
  res.send(result);
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send(service);
});

const updateServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.serviceId, req.body);
  res.send(service);
});

const deleteServiceById = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const serviceController = {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
