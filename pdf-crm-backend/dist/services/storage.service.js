"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordStorage = createRecordStorage;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function createRecordStorage(data) {
    const date = new Date()
        .toISOString()
        .split("T")[0];
    const folderPath = path_1.default.join(process.cwd(), "records", date, data.id);
    fs_1.default.mkdirSync(folderPath, {
        recursive: true,
    });
    // metadata.json
    fs_1.default.writeFileSync(path_1.default.join(folderPath, "metadata.json"), JSON.stringify({
        id: data.id,
        title: data.title,
        createdAt: new Date().toISOString(),
    }, null, 2));
    // html-content.html
    fs_1.default.writeFileSync(path_1.default.join(folderPath, "html-content.html"), data.descriptionHtml || "");
    // document.json
    fs_1.default.writeFileSync(path_1.default.join(folderPath, "document.json"), JSON.stringify(data, null, 2));
    return folderPath;
}
