/**
 * Created by administror on 2017/2/21 0021.
 */
window.onload=function(){
        var texts= document.getElementById('texts');
        texts.value=null;

    (function(){

        var doc=document;

        var chat={

            msg:doc.getElementById('message'),
            userId:null,
            socket:null,
            //浏览器滚动天保持在最底部
            scrollBot:function(){
                var show=document.getElementById('message-show');

                if(this.msg.clientHeight>show.offsetHeight){
                    show.scrollTop =this.msg.clientHeight;
                }
            },
            logout:function(){
               window.close();
            },
            submit:function(){
                var content=doc.getElementById('texts').value;
                if(content){
                    var list={
                        userName:this.userName,
                        /*userId:userId,*/
                        content:content
                    };
                    this.socket.emit('message',list);
                    texts.value='';
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
              /*  var userhtml='';
                var separ='';
                for(key in onlineUsers){
                    if(onlineUsers.hasOwnProperty(key)){
                        userhtml+=separ+onlineUsers[key];
                        separ='、';
                    }
                }*/
                doc.getElementById('onlinePeople').innerHTML='当前共有'+onlineCount+'个用户';
                //添加系统消息
                var html='';
                var div=doc.createElement('div');
                div.className='system-msg';
                html+=   '<span>'+ onlineUsers.userName[onlineCount-1];
                html+=(action == 'login') ? ' 加入了聊天室' : ' 退出聊天室';
                html+='</span>';
                div.innerHTML=html;
                doc.getElementById('message').appendChild(div);
                this.scrollBot();
            },
            userSubmit:function(){
                if(this.userName){
                    doc.getElementById("user_name").value = '';
                    document.getElementsByClassName('shade')[0].style.display='none';
                    document.getElementsByClassName('main')[0].style.display='block';
                    this.init(this.userName);
                }
            },
            init:function(){
                //链接websocket后端服务器
                this.socket = io.connect();
                //告诉服务端登录
                this.socket.emit('login',{userName:this.userName});
                this.socket.on('login',function(o){
                    chat.update(o,'login');
                });
                this.socket.on('logout', function (o) {
                    chat.update(o,'logout');
                })
                this.socket.on('message',function(obj){
                    console.log(chat.userName);
                    var isMe =(obj.userName == chat.userName) ? true : false ;
                    var html = '';
                    var div=doc.createElement('div');
                    div.className='message-list';
                    if(isMe){
                        div.className='message-list right';
                        html='<div class="avatar avatar-right"><img src="images/1.jpg" alt=""></div><span class="right"><i class="i-right"></i>'+obj.content+'</span>';
                        div.innerHTML=html;
                    } else {
                        html='<div class="avatar"><img src="images/1.jpg" alt=""></div><span><i class="i-left"></i>'+obj.content+'</span>';
                        div.innerHTML=html;
                    }
                    chat.msg.appendChild(div);
                    chat.scrollBot();
                })
            }
        };
        var user_name=doc.getElementById("user_name");

       //    chat.init(user_name.innerText);
      //通过“回车”提交用户名
        user_name.onkeydown  = function(e) {
            var e = e || event;
            if (e.keyCode === 13) {
                chat.userName =user_name.value;
                chat.userSubmit();
            }
        };
        //通过“回车”提交信息
        var texts = doc.getElementById("texts");
        texts.onclick=function(){
            if( texts.value !=''){
                chat.submit();
            }
        };
        texts.onkeydown = function(e) {
            e = e || event;
            if (e.keyCode === 13) {
                event.returnValue = false;
                if( texts.value !=''){
                    chat.submit();
                }

            }
        };
    })();
};
