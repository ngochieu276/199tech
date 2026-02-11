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

  async getResources(status?: string, name?: string): Promise<Resource[]> {
    const filter: any = {};
    if (status) filter.status = status;
    if (name) filter.name = { contains: name }; 
    return this.resourceRepository.findAll(filter);
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
