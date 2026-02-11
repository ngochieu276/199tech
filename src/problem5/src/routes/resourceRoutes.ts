import { Router } from 'express';
import * as resourceController from '../controllers/resourceController';
import { validate } from '../middleware/validate';
import { createResourceSchema, updateResourceSchema } from '../utils/validationSchemas';
import { asyncWrapper } from '../utils/asyncWrapper';

const router = Router();

router.post('/', validate(createResourceSchema), asyncWrapper(resourceController.createResource));
router.get('/', asyncWrapper(resourceController.getResources));
router.get('/:id', asyncWrapper(resourceController.getResource));
router.patch('/:id', validate(updateResourceSchema), asyncWrapper(resourceController.updateResource));
router.delete('/:id', asyncWrapper(resourceController.deleteResource));

export default router;
