/**
 * Created by administror on 2017/2/17 0017.
 */
var express=require("express");
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io')(server);
server.listen(8080,function(){
    console.log(11111111)
});
app.get('/',function(req,res){
    res.send('<h2>welcome to chats</h2>')
})

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection',function(){
    //监听新用户加入
    socket.on('login', function(obj){
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }
})