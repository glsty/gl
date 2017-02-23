/**
 * Created by administror on 2017/2/17 0017.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use('/',express.static(__dirname + '/chats'));  //指定静态资源处理的中间件
/*app.get('/',function(req,res){
    res.writeHead(200, {
        'Content-Type': 'text/html' //将返回类型由text/plain改为text/html
    });
    res.send('<h2>welcome to chats</h2>');
    res.end();
})*/

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
var onlineName=[];
io.on('connection',function(socket){

    //监听新用户加入
    socket.on('login', function(obj){
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        //socket.name = obj.userid;
        //console.log(obj.userName)
        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userName)) {
            onlineName[onlineCount]=obj.userName;
            onlineUsers.userName = onlineName;

            //在线人数+1
            onlineCount++;
        }
        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.userName+'加入了聊天室');
});
    socket.on('disconnect',function(list){
        //将退出的用户从在线列表中删除
       // console.log(disconnect);
        console.log(username);
        if(onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = { username:onlineUsers[list.name]};
            //删除
            delete onlineUsers[list.name];
            //在线人数-1
            onlineCount--;
        }
        //向所有客户端广播用户退出
        io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount});
        console.log(list.userName+'退出了聊天室');
    })
    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.userName+'说：'+obj.content);
    });
});
server.listen(3245,function(){
    console.log(11111111)
});