"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const resourceRepository_1 = require("../repositories/resourceRepository");
const AppError_1 = require("../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
class ResourceService {
    constructor() {
        this.resourceRepository = new resourceRepository_1.ResourceRepository();
    }
    async createResource(data) {
        return this.resourceRepository.create(data);
    }
    async getResources(status, name) {
        const filter = {};
        if (status)
            filter.status = status;
        if (name)
            filter.name = { contains: name };
        return this.resourceRepository.findAll(filter);
    }
    async getResourceById(id) {
        const resource = await this.resourceRepository.findById(id);
        if (!resource) {
            throw new AppError_1.AppError('Resource not found', http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return resource;
    }
    async updateResource(id, data) {
        await this.getResourceById(id); // Ensure exists
        return this.resourceRepository.update(id, data);
    }
    async deleteResource(id) {
        await this.getResourceById(id); // Ensure exists
        await this.resourceRepository.delete(id);
    }
}
exports.ResourceService = ResourceService;
