import { ResourceRepository } from '../repositories/resourceRepository';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { Resource } from '@prisma/client';

export class ResourceService {
  private resourceRepository: ResourceRepository;

  constructor() {
    this.resourceRepository = new ResourceRepository();
  }

  async createResource(data: any): Promise<Resource> {
    return this.resourceRepository.create(data);
  }

  async getResources(status?: string, name?: string, page: number = 1, limit: number = 10): Promise<{ items: Resource[]; meta: { page: number; limit: number; total: number; totalPages: number } }> {
    const filter: any = {};
    if (status) filter.status = status;
    if (name) filter.name = { contains: name, mode: 'insensitive' };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.resourceRepository.findAll(filter, skip, limit),
      this.resourceRepository.count(filter),
    ]);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return { items, meta: { page, limit, total, totalPages } };
  }

  async getResourceById(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findById(id);
    if (!resource) {
      throw new AppError('Resource not found', StatusCodes.NOT_FOUND);
    }
    return resource;
  }

  async updateResource(id: number, data: any): Promise<Resource> {
    await this.getResourceById(id); // Ensure exists
    return this.resourceRepository.update(id, data);
  }

  async deleteResource(id: number): Promise<void> {
    await this.getResourceById(id); // Ensure exists
    await this.resourceRepository.delete(id);
  }
}
