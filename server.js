import  dotenv from 'dotenv'
dotenv.config();
import {server} from './index.js'
// import { connectToDataBase } from './Configuration/Database/Connection.js';

server.listen(process.env.PORT||3000,async ()=>{
    console.log("Server is listening");
    //connect to database
    // await connectToDataBase();
});