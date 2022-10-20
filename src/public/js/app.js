//const socket = new WebSocket("ws://localhost:3000")
// 여기서 socket은 서버로의 연결을 뜻함

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("Connected to Browser ✔ ")
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log('Disconnected from Server ❌')
});

/*
setTimeout(() => {
    // Front에서 Back으로 보내는 부분
    socket.send("hello from the brower!");
}, 10000)
*/
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
};

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send({
        type : "nickname",
        payload : input.value
    });
};

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);