import os from 'os'
import http from 'http'
import app from './src/app'
import logging from './src/config/logging';

const server:http.Server = http.createServer(app)

const port = Number(process.env.PORT) || 4000;

const NAMESPACE = "Initializer"

server.listen(port,():void => {
    logging.info(NAMESPACE, `Server is running ${port}`)
})