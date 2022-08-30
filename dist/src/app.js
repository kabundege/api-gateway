"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const logging_1 = __importDefault(require("./config/logging"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const NAMESPACE = 'Gateway_Server';
const app = (0, express_1.default)();
/** Body parsing Middleware */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/** Cors Setup */
app.use((0, cors_1.default)());
/** Helmet Setup */
app.use((0, helmet_1.default)());
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Welcome Route */
app.get('/', (_, res) => {
    return res.status(200).json({
        status: 200,
        message: "Welcome to the API Gateway"
    });
});
/** Api_Req Window Limit */
routes_1.default.forEach(r => {
    if (r.rateLimit)
        app.use(r.url, (0, express_rate_limit_1.default)(r.rateLimit));
});
/** Routes go here */
routes_1.default.forEach(r => {
    app.use(r.url, (0, http_proxy_middleware_1.createProxyMiddleware)(r.proxy));
});
/** Error handling */
app.use((_, res, __) => {
    const error = new Error('API Gateway couldn\'t find this route');
    return res.status(404).json({
        status: 404,
        error: error.name,
        message: error.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map