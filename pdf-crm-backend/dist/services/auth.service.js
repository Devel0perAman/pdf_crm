"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const api_1 = __importDefault(require("./api"));
const registerUser = (data) => api_1.default.post("/auth/register", data);
exports.registerUser = registerUser;
const loginUser = (data) => api_1.default.post("/auth/login", data);
exports.loginUser = loginUser;
const getProfile = () => api_1.default.get("/users/profile");
exports.getProfile = getProfile;
const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
exports.logoutUser = logoutUser;
