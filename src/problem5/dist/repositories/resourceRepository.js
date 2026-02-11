"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRepository = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class ResourceRepository {
    async create(data) {
        return prisma_1.default.resource.create({ data });
    }
    async findAll(filter, skip, take) {
        return prisma_1.default.resource.findMany({ where: filter, skip, take, orderBy: { updatedAt: 'desc' } });
    }
    async count(filter) {
        return prisma_1.default.resource.count({ where: filter });
    }
    async findById(id) {
        return prisma_1.default.resource.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma_1.default.resource.update({ where: { id }, data });
    }
    async delete(id) {
        return prisma_1.default.resource.delete({ where: { id } });
    }
}
exports.ResourceRepository = ResourceRepository;
