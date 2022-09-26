import express from "express";

const app = express();


app.set('view engine',"pug");
app.set("views",__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/",(req,res)=> res.render("home"));

app.get("/*", (req,res) => res.redirect("/")); // catchall url
console.log("hello");

// 포트번호3000
const handleListen = () => console.log('Listening one http://localhost:3000');
app.listen(3000,handleListen);