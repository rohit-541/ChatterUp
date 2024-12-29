import express from 'express'
import http, { METHODS } from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import { setupSocketHandlers } from './socketConnection/HandelConnectRequest.js';

const app = express();
app.use(cors());
export const server = http.createServer(app);

const io =  new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

setupSocketHandlers(io);
export default io;



