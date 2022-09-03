import express, { Application,Request,Response } from "express";
import dotenv from 'dotenv'
import Routes from "./routes";
import logging from "./config/logging";
import cors from 'cors'
import helmet from 'helmet'
import { createProxyMiddleware } from "http-proxy-middleware";
import RedisRateStore from 'rate-limit-redis';
import rateLimit from "express-rate-limit";
import Redis from 'ioredis';

dotenv.config()

const NAMESPACE = 'Gateway_Server';
const app: Application = express();

/** Cors Setup */
app.use(cors())

/** Helmet Setup */
app.use(helmet())

/** Redis Setup */
const options  = { 
    port: process.env.REDIS_PORT,
    name: process.env.REDIS_NAME, 
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
    host: process.env.REDIS_HOST, 
} as any

const redisClient = new Redis(options)

/** Log the request */
app.use((req, res, next) => {

    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Welcome Route */
app.get('/', (_, res) => {
    return res.status(200).json({
        status: 200,
        message: "Welcome to the API Gateway"
    })
})

/** Rate limit & Persistance with Redis */
Routes.forEach(r => {
    app.use(
        r.url, 
        rateLimit({
            ...r.rateLimit,
            store: new RedisRateStore({
                // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
                sendCommand: (...args: string[]) => redisClient.call(...args),
            })
        })
    );
})

/** Routes go here */
Routes.forEach(r => {
    app.use(r.url, createProxyMiddleware(r.proxy));
})

/** Error handling */
app.use((_, res, __) => {
    const error = new Error('API Gateway couldn\'t find this route');
    return res.status(404).json({
        status: 404,
        error: error.name,
        message: error.message,
    });
});

export default app
