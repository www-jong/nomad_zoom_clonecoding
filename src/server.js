import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();


app.set('view engine',"pug");
app.set("views",__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*", (req,res) => res.redirect("/")); // catchall url
console.log("Server On 👍");

// 포트번호3000
const handleListen = () => console.log('Listening one http://localhost:3000');
//app.listen(3000,handleListen);

// http서버 생성 for express.js 이용
const server = http.createServer(app);
// wss(웹 소켓 서버) 생성, 안에 server을 꼭 전달해 줄필요는 없음
// http와 wss 둘다 이용하는 경우임. server 전달안할경우 wss만 이용
// 같은포트를 이용

// 여기서 socket은 연결된 브라우저를 뜻함
const wss = new WebSocket.Server({ server });

// 웹소켓 이벤트
// callback으로 socket을 받음(연결된 어떤 사람, 연결된 브라우저와의 연결라인, 소켓을 이용해 메세지를 주고받음)
/* 익명함수 쓰기 전
function handleConnection(socket) {
    console.log(socket);
}
wss.on("connection", handleConnection)
*/

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser ✔ , ",sockets.length);
    socket.on("close", () => {
        console.log("Disconnected from the Browser ❌");
    });
    socket.on("message", (message) => {
        // 브라우저가 보낸 메세지 확인
        console.log(message.toString('utf8'));
        sockets.forEach(aSocket => aSocket.send(message.toString()));
    });
    // Back에서 Front로 보내는 부분
    //socket.send("hello"); // front로 전달
});

server.listen(3000, handleListen);
