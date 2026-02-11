"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResource = exports.getResources = exports.createResource = void 0;
const resourceService_1 = require("../services/resourceService");
const http_status_codes_1 = require("http-status-codes");
const resourceService = new resourceService_1.ResourceService();
const createResource = async (req, res) => {
    const resource = await resourceService.createResource(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: 'success', data: resource });
};
exports.createResource = createResource;
const getResources = async (req, res) => {
    const { status, name } = req.query;
    const resources = await resourceService.getResources(status, name);
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: 'success', data: resources });
};
exports.getResources = getResources;
const getResource = async (req, res) => {
    const id = parseInt(req.params.id);
    const resource = await resourceService.getResourceById(id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: 'success', data: resource });
};
exports.getResource = getResource;
const updateResource = async (req, res) => {
    const id = parseInt(req.params.id);
    const resource = await resourceService.updateResource(id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: 'success', data: resource });
};
exports.updateResource = updateResource;
const deleteResource = async (req, res) => {
    const id = parseInt(req.params.id);
    await resourceService.deleteResource(id);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deleteResource = deleteResource;
