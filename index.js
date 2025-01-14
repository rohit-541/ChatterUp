import express from 'express'
import http, { METHODS } from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import path from 'path'
import { setupSocketHandlers } from './socketConnection/HandelConnectRequest.js';

const app = express();
app.use(cors());

const publicPath = path.join(path.resolve(),"Public");
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    const pathToFile = path.join(path.resolve(),"Client","index.html");
    // res.send("Hi")
    res.sendFile(pathToFile);
})



export const server = http.createServer(app);

const io =  new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

setupSocketHandlers(io);
export default io;



