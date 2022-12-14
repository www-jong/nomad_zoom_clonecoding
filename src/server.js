import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();


app.set('view engine',"pug");
app.set("views",__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res)=> res.render("home"));
app.get("/*", (req,res) => res.redirect("/")); // catchall url
console.log("Server On ๐");

// ํฌํธ๋ฒํธ3000
const handleListen = () => console.log('Listening one http://localhost:3000');
//app.listen(3000,handleListen);

// http์๋ฒ ์์ฑ for express.js ์ด์ฉ
const server = http.createServer(app);
// wss(์น ์์ผ ์๋ฒ) ์์ฑ, ์์ server์ ๊ผญ ์ ๋ฌํด ์คํ์๋ ์์
// http์ wss ๋๋ค ์ด์ฉํ๋ ๊ฒฝ์ฐ์. server ์ ๋ฌ์ํ ๊ฒฝ์ฐ wss๋ง ์ด์ฉ
// ๊ฐ์ํฌํธ๋ฅผ ์ด์ฉ

// ์ฌ๊ธฐ์ socket์ ์ฐ๊ฒฐ๋ ๋ธ๋ผ์ฐ์ ๋ฅผ ๋ปํจ
const wss = new WebSocket.Server({ server });

// ์น์์ผ ์ด๋ฒคํธ
// callback์ผ๋ก socket์ ๋ฐ์(์ฐ๊ฒฐ๋ ์ด๋ค ์ฌ๋, ์ฐ๊ฒฐ๋ ๋ธ๋ผ์ฐ์ ์์ ์ฐ๊ฒฐ๋ผ์ธ, ์์ผ์ ์ด์ฉํด ๋ฉ์ธ์ง๋ฅผ ์ฃผ๊ณ ๋ฐ์)
/* ์ต๋ชํจ์ ์ฐ๊ธฐ ์ 
function handleConnection(socket) {
    console.log(socket);
}
wss.on("connection", handleConnection)
*/

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser โ , ",sockets.length);
    socket.on("close", () => {
        console.log("Disconnected from the Browser โ");
    });
    socket.on("message", (message) => {
        // ๋ธ๋ผ์ฐ์ ๊ฐ ๋ณด๋ธ ๋ฉ์ธ์ง ํ์ธ
        console.log(message.toString('utf8'));
        sockets.forEach(aSocket => aSocket.send(message.toString()));
    });
    // Back์์ Front๋ก ๋ณด๋ด๋ ๋ถ๋ถ
    //socket.send("hello"); // front๋ก ์ ๋ฌ
});

server.listen(3000, handleListen);
