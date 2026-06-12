"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePdf = exports.updatePdf = exports.getPdfById = exports.getPdfs = exports.createPdf = void 0;
const api_1 = __importDefault(require("./api"));
const createPdf = (data) => api_1.default.post("/pdfs", data);
exports.createPdf = createPdf;
const getPdfs = () => api_1.default.get("/pdfs");
exports.getPdfs = getPdfs;
const getPdfById = (id) => api_1.default.get(`/pdfs/${id}`);
exports.getPdfById = getPdfById;
const updatePdf = (id, data) => api_1.default.put(`/pdfs/${id}`, data);
exports.updatePdf = updatePdf;
const deletePdf = (id) => api_1.default.delete(`/pdfs/${id}`);
exports.deletePdf = deletePdf;
