const socket=io();
document.getElementById('button').addEventListener('click', sendMessage);

function sendMessage(){
    const message= document.getElementById("messageinput.value")
    socket.emit("newMessage", message)
}

function appendMessage(socketid, message){
    const messagelist= document.getElementById("messageList")
    const newMessage= document.createElement("p")
    newMessage.textContent="${socketId}:${message}"
    messagelist.appendChild(newMwssage)
}

socket.on("messageList", (messages) => {
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";

  messages.forEach((message) => {
    appendMessage(message.socketId, message.message);
  });
});


socket.on("newMessage",(data)=>{
    appendMessage(data,socketId,data.message)
})

