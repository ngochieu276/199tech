"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./utils/prisma"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await prisma_1.default.$connect();
    }
    catch (err) {
        console.error('Prisma connection error');
        process.exit(1);
    }
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
start();
