import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
    room:{
        type:String,
        required:true
    }
})

export const messageModel = mongoose.model('Messages',messageSchema);