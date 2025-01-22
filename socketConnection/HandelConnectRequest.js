import { newJoin } from "./functions.js";


export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log("User is connected");

        //On new Joiny 
        socket.on('join',(message)=>{
            newJoin(message,socket);
        });

        //Broadcast the new Message to every user
        socket.on('newMessage',async (message)=>{
            // const newMessage = new messageModel({
            //     user:message.user,
            //     text:message.text,
            //     room:socket.room
            // });
            // await newMessage.save();
            socket.to(socket.room).emit('newMessage',message);
        });

        socket.on('typing',(message)=>{
            socket.to(socket.room).emit('typing',message);
        })

        socket.on('notTyping',()=>{
            socket.to(socket.room).emit('notTyping');
        })

        //On disconnect 
        socket.on('disconnect', () => {
            console.log('User is disconnected');
        });
    });
};




