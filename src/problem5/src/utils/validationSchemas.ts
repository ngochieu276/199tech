import { z } from 'zod';

export const createResourceSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});

export const updateResourceSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});
