import express, { Application } from "express";
import dotenv from 'dotenv'
import Routes from "./routes";
import logging from "./config/logging";
import cors from 'cors'
import helmet from 'helmet'
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

dotenv.config()

const NAMESPACE = 'Gateway_Server';
const app: Application = express();

/** Body parsing Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Cors Setup */
app.use(cors())

/** Helmet Setup */
app.use(helmet())

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE,  `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Welcome Route */
app.get('/',(_,res)=>{
    return res.status(200).json({
        status:200,
        message: "Welcome to the API Gateway"
    })
})

/** Api_Req Window Limit */
Routes.forEach(r => {
    if(r.rateLimit)
    app.use(r.url, rateLimit(r.rateLimit));
})

/** Routes go here */
Routes.forEach(r => {
    app.use(r.url, createProxyMiddleware(r.proxy));
})


/** Error handling */
app.use((_, res, __) => {
    const error = new Error('API Gateway couldn\'t find this route');
    return res.status(404).json({
        status:404,
        error:error.name,
        message: error.message,
    });
});

export default app
