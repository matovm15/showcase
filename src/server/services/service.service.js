import httpStatus from 'http-status';
import { Service } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a service
 * @param {Object} serviceBody
 * @returns {Promise<Service>}
 * @throws {ApiError}
*/
const createService = async (serviceBody) => {
  return Service.create(serviceBody);
};

/**
 * Query for services
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 * @throws {ApiError}
*/

const queryServices = async (filter, options) => {
  const services = await Service.paginate(filter, options);
  return services;
}

/**
 * Get service by id
 * @param {ObjectId} id
 * @returns {Promise<Service>}
 * @throws {ApiError}
*/

const getServiceById = async (id) => {
  return Service.findById(id);
}

/**
 * Update service by id
 * @param {ObjectId} serviceId
 * @param {Object} updateBody
 * @returns {Promise<Service>}
 * @throws {ApiError}
 */

const updateServiceById = async (serviceId, updateBody) => {
    const service = await getServiceById(serviceId);
    if (!service) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
    }
    Object.assign(service, updateBody);
    await service.save();
    return service;
    }

/**
 * Delete service by id
 * @param {ObjectId} serviceId
 * @returns {Promise<Service>}
 * @throws {ApiError}
 */

const deleteServiceById = async (serviceId) => {
    const service = await getServiceById(serviceId);
    if (!service) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
    }
    await service.remove();
    return service;
}


export const serviceService = {
    createService,
    queryServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
};
