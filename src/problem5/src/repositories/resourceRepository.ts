import prisma from '../utils/prisma';
import { Resource, Prisma } from '@prisma/client';

export class ResourceRepository {
  async create(data: Prisma.ResourceCreateInput): Promise<Resource> {
    return prisma.resource.create({ data });
  }

  async findAll(filter: Prisma.ResourceWhereInput, skip?: number, take?: number): Promise<Resource[]> {
    return prisma.resource.findMany({ where: filter, skip, take, orderBy: { updatedAt: 'desc' } });
  }

  async count(filter: Prisma.ResourceWhereInput): Promise<number> {
    return prisma.resource.count({ where: filter });
  }

  async findById(id: number): Promise<Resource | null> {
    return prisma.resource.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ResourceUpdateInput): Promise<Resource> {
    return prisma.resource.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Resource> {
    return prisma.resource.delete({ where: { id } });
  }
}
