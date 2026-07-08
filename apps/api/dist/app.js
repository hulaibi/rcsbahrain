"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Bahrain Red Crescent API is running",
    });
});
//# sourceMappingURL=app.js.map