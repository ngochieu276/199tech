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
    async getResources(status, name, page = 1, limit = 10) {
        const filter = {};
        if (status)
            filter.status = status;
        if (name)
            filter.name = { contains: name };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.resourceRepository.findAll(filter, skip, limit),
            this.resourceRepository.count(filter),
        ]);
        const totalPages = Math.max(1, Math.ceil(total / limit));
        return { items, meta: { page, limit, total, totalPages } };
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
