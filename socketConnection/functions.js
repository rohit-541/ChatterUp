import { messageModel } from "../messageModel/messageSchema.js";

export const newJoin = async (message,socket)=>{

    //Create a new join message to broadcast to every user
    const newMessage = `New user ${message.user} joined in the room`;
    socket.broadcast.to(socket.room).emit('newJoin',newMessage);
    
    //Attach the information to socket
    socket.user = message.user;
    socket.room = message.room;

    //attach this user to room which it has entered
    socket.join(message.room);

    //Emit the welcome message to new joiny
    //find all the message and send the object to user
    const result = await messageModel.find({room:socket.room});
    const Replymessage={
        oldMessage:result,
        welcome:`Welcome ${message.user} in ${message.room}`
    }
    socket.emit('welcome',Replymessage);
}