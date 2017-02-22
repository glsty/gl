/**
 * Created by administror on 2017/2/21 0021.
 */
window.onload=function(){
        var texts= document.getElementById('texts');
        texts.value=null;

    (function(){

        var doc=document;

        var chat={
            userName:doc.getElementById('user_name'),
            msg:doc.getElementById('message'),
            screenHeight:window.innerHeight ? window.innerHeight:doc.documentElement.clientHeight,
            userId:null,
            socket:null,
            //浏览器滚动天保持在最底部
            scrollBot:function(){
                window.scrollTo(0,this.msg.clientHeight);
            },
            logout:function(){
                location.reload();
            },
            submit:function(){
                var content=doc.getElementById('texts').value;
                if(content){
                  //  alert(chat.userName);
                    var list={
                        userName:chat.userName,
                        /*userId:userId,*/
                        content:content
                    };
                    this.socket.emit('message',list);
                    doc.getElementById('texts').value=null;
                }
                return ;
            },
            update:function(o,action){
                //当前在线用户列表
                var onlineUsers = o.onlineUsers;
                //当前在线人数
                var onlineCount = o.onlineCount;
                //新加入用户的信息
                var user = o.user;
                //更新人数
                var userhtml='';
                var separ='';
                for(key in onlineUsers){
                    if(onlineUsers.hasOwnProperty(key)){
                        userhtml+=separ+onlineUsers[key];
                        separ='、';
                    }
                }
                doc.getElementById('onlinePeople').innerHTML='当前共有'+onlineCount+'个用户';
                //添加系统消息
                var html='';
                var div=doc.createElement('div');
                div.className='system-msg';
                html+=   '<span>'+ user.userName ;
                html+=(action == 'login') ? ' 加入了聊天室' : ' 退出聊天室';
                html+='</span>';
                div.innerHTML=html;
                doc.getElementById('notice').appendChild(div);
                this.scrollBot();
            },
            userSubmit:function(){
                var userName=doc.getElementById('userName').value;
                if(userName){
                    d.getElementById("username").value = '';
                    d.getElementById("loginbox").style.display = 'none';
                    d.getElementById("chatbox").style.display = 'block';
                    this.init(userName);
                }
            },
            init:function(userName){
                this.userName = userName;
                //链接websocket后端服务器
                this.socket = io.connect();
                //告诉服务端登录
               // alert(chat.userName);
                this.socket.emit('login',{userName:chat.userName});
                this.socket.on('login',function(o){
                    chat.update(o,'login');
                });
                this.socket.on('logout', function (o) {
                    chat.update(o,'logout');
                })
                this.socket.on('message',function(obj){
                    var isMe =(obj.userName == this.userName) ? true : false ;
                    var html = '';
                    var div=doc.createElement('div');
                    div.className='message-list';
                    html='<span>'+obj.content+'</span>'
                    if(isMe){

                        div.className='message-list right';
                        div.innerHTML=html;
                    } else {
                        div.innerHTML=html;
                    }
                    chat.msg.appendChild(div);
                    chat.scrollBot();
                })
            }
        };
        var user_name=doc.getElementById("user_name");
        chat.init(user_name.innerText);
      //通过“回车”提交用户名
        user_name.onkeydown  = function(e) {
            var e = e || event;
            if (e.keyCode === 13) {
                chat.userSubmit();
            }
        };
        //通过“回车”提交信息
        doc.getElementById("texts").onkeydown = function(e) {
            e = e || event;
            if (e.keyCode === 13) {
                chat.submit();
            }
        };
    })();
};
