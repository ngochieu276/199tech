"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResourceSchema = exports.createResourceSchema = void 0;
const zod_1 = require("zod");
exports.createResourceSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'inactive']).optional(),
    }),
});
exports.updateResourceSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['active', 'inactive']).optional(),
    }),
});
