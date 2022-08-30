"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
const logging_1 = __importDefault(require("./src/config/logging"));
const server = http_1.default.createServer(app_1.default);
const port = Number(process.env.PORT) || 4000;
const NAMESPACE = "Initializer";
server.listen(port, () => {
    logging_1.default.info(NAMESPACE, `Server is running ${port}`);
});
//# sourceMappingURL=index.js.map