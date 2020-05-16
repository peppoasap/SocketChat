var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
    console.log("A user connected.");
    
    socket.on("user connected", function(username){
        io.emit("user connected", username);
    });

    socket.on("chat message", function(username, msg){
        io.emit("chat message", username, msg);
    });

    socket.on("user disconnected", function(username){
        console.log(username + " disconnected");
        io.emit("user disconnected", username);
    });
}); 

http.listen(3000, function(){
    console.log("listening on 3000");
});