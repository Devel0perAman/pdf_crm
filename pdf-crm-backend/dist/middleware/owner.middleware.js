"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerOnly = void 0;
const ownerOnly = (req, res, next) => {
    if (!req.user ||
        req.user.role !== "OWNER") {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next();
};
exports.ownerOnly = ownerOnly;
