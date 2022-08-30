"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ROUTES = [
    {
        url: '/enroll',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 10 * 60 * 1000,
            max: 5 // Limit each IP to 100 requests per `window` (here, per 10 minutes)
        },
        proxy: {
            target: "https://container-service-2.un88os8tdngie.eu-central-1.cs.amazonlightsail.com/",
            changeOrigin: true,
            pathRewrite: {
                [`^/enroll`]: '',
            },
        }
    },
    {
        url: '/uam',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "https://container-service-1.un88os8tdngie.eu-central-1.cs.amazonlightsail.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/uam`]: '',
            },
        }
    }
];
exports.default = ROUTES;
//# sourceMappingURL=index.js.map