import { Request, Response } from 'express';
import { ResourceService } from '../services/resourceService';
import { StatusCodes } from 'http-status-codes';

const resourceService = new ResourceService();

export const createResource = async (req: Request, res: Response) => {
  const resource = await resourceService.createResource(req.body);
  res.status(StatusCodes.CREATED).json({ status: 'success', data: resource });
};

export const getResources = async (req: Request, res: Response) => {
  const { status, name, page, limit } = req.query;
  const result = await resourceService.getResources(
    status as string,
    name as string,
    page ? parseInt(page as string) : undefined,
    limit ? parseInt(limit as string) : undefined
  );
  res.status(StatusCodes.OK).json({ status: 'success', data: result.items, meta: result.meta });
};

export const getResource = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const resource = await resourceService.getResourceById(id);
  res.status(StatusCodes.OK).json({ status: 'success', data: resource });
};

export const updateResource = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const resource = await resourceService.updateResource(id, req.body);
  res.status(StatusCodes.OK).json({ status: 'success', data: resource });
};

export const deleteResource = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await resourceService.deleteResource(id);
  res.status(StatusCodes.NO_CONTENT).send();
};
