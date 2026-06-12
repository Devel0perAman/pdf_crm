"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const pdf_route_1 = __importDefault(require("./routes/pdf.route"));
const activity_route_1 = __importDefault(require("./routes/activity.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/pdfs", pdf_route_1.default);
app.use("/api/activity", activity_route_1.default);
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/analytics", analytics_route_1.default);
app.use("/api/notifications", notification_route_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PDF CRM API Running",
    });
});
exports.default = app;
