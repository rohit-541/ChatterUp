
//connect to chat server
let socket;
try {
    socket = io.connect('https://chatterup-q02b.onrender.com/');
} catch (error) {
    alert('Please try later');
}

let avatarSelected = null;
let username;
let room;

//Get the elements
const joinRoom = document.querySelector('.join');
const userNameEl = document.getElementById('userName');
const roomEl = document.getElementById('roomName');
const roominfo = document.getElementsByClassName('join-room');
const chatBox = document.getElementById('chatBox');
const messageList = document.getElementById('messageList');
const userimage = document.querySelector('.image');
const userName = document.querySelector('.name');
const sendBtn = document.querySelector('.send');

//Remove error class if textbox is filled with input
userNameEl.addEventListener('input',()=>{
    userNameEl.classList.remove('error');
})
roomEl.addEventListener('input',()=>{
    roomEl.classList.remove('error');
})

//On the click of join 
joinRoom.addEventListener('click',()=>{

    //If the input field are empty then mark error
    if(userNameEl.value == ""){
        userNameEl.classList.add('error');
        return;
    }
    if(roomEl.value == ""){
        roomEl.classList.add('error');
        return;
    }

    // if server is offline alert the user and reset the value in input field
    if(!socket){
        alert("Server is offline now");
        userNameEl.value = "";
        roomEl.value = "";
        return;
    }

    
    
    username = userNameEl.value;
    //now shift the chat box has hidden
    roominfo[0].classList.add('hidden');
    setTimeout(()=>{
        
        //show the chatbox after the join-room disappeared
        chatBox.classList.remove('hide');
        chatBox.classList.add('chatBox');
        
        //show username and store the data;
        userName.innerHTML = userNameEl.value;
        const url = `url(./avatars/${avatarSelected}.png)`;
        
        //set user avatar
        userimage.setAttribute('style',`background-image:${url}`);
        
        //reset the values
        userNameEl.value = "";
        roomEl.value = "";
        
    },500);
    
    
    // emit the join event for new joining
    const user = "Rohit";
    const message = {
        user:userNameEl.value,
        room:roomEl.value
    }
    socket.emit('join',message);
}); 

const avatars = document.querySelectorAll('.avatar');
avatars.forEach(element => {
        element.addEventListener('click',()=>{
            avatars.forEach((element)=>{
                element.classList.remove('selected');
            });
            element.classList.add('selected');
            avatarSelected = element.getAttribute('data-image');
        });
});

const messageBox = document.querySelector('.message')

sendBtn.addEventListener('click',()=>{
    const message = {
        user:username,
        text:messageBox.value,
    }
    if(messageBox.value == ""){
        return;
    }
    messageBox.value='';
    renderMessage(message);
    socket.emit('newMessage',message);
})

roomEl.addEventListener('keypress',(event)=>{
    if(event.key == 'Enter'){
        joinRoom.click();
    }
});

userNameEl.addEventListener('keypress',(event)=>{
    if(event.key=='Enter'){
        joinRoom.click();
    }
})


function renderMessage(message){
    const newMessage = document.createElement('div');
    newMessage.innerText = `${message.text} -${message.user}`;
    if(message.user == username){
        newMessage.classList.add('myMessage');
    }else{
        newMessage.classList.add('otherList');
    }
    messageList.append(newMessage);
    newMessage.scrollIntoView({
        behavior:"smooth"
    });
}

socket.on('newJoin',(message)=>{
    const newJoinMessage =  document.createElement('div');
    newJoinMessage.innerHTML = message;
    newJoinMessage.classList.add('welcome');
    messageList.append(newJoinMessage);
})

socket.on('welcome',(message)=>{
    message.oldMessage.forEach((message)=>{
        renderMessage(message);
    })
    const newJoinMessage =  document.createElement('div');
    newJoinMessage.innerHTML = message.welcome;
    newJoinMessage.classList.add('welcome');
    messageList.append(newJoinMessage);
    setTimeout(()=>{
        newJoinMessage.scrollIntoView({
            behavior:"smooth"
        })
    },500);
})

socket.on('newMessage',(message)=>{
    renderMessage(message);
});

const typingEl = document.getElementById('typing')

messageBox.addEventListener('keypress',(event)=>{
    if(event.key == 'Enter'){
        sendBtn.click();
    }
})

socket.on('typing',(message)=>{
    typingEl.innerHTML = `${message} is typing...`
});

messageBox.addEventListener('keyup',()=>{
    socket.emit('notTyping')
})


socket.on('notTyping',()=>{
    setTimeout(()=>{
        typingEl.innerHTML="";
    },500);
})


messageBox.addEventListener('input',()=>{
    socket.emit('typing',username);
})