const ROUTES = [
    {
        url: '/enroll',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 10 * 60 * 1000, // 10 minutes
            max: 30 // Limit each IP to 30 requests per `window` (here, per 10 minutes)
        },
        proxy: {
            target: "https://container-service-2.un88os8tdngie.eu-central-1.cs.amazonlightsail.com",
            // target: 'http://localhost:1000',
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
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 10 minutes
            max: 100 // Limit each IP to 100 requests per `window` (here, per 10 minutes)
        },
        proxy: {
            target: "https://container-service-1.un88os8tdngie.eu-central-1.cs.amazonlightsail.com",
            // target: 'http://localhost:2000',
            changeOrigin: true,
            pathRewrite: {
                [`^/uam`]: '',
            },
        }
    }
]

export default ROUTES;