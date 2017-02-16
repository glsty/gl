/**
 * Created by administror on 2017/2/16 0016.
 */
/*
var fake={
 pageNumber: 每页个数,
 total:      总数,
 ulDom:      插入dom,
 check:      ul中查询总数
 }
*
*
*
* */
//获取ul中总条数
function one(){
    var total=$("#ult").prev().children("li").length;
    var fake={
        pageNumber:6,			//每页个数
        total:total,	    	//总数
        ulDom:$("#ult"),     	//插入dom
        check:$("#ult").prev()	//ul中查询总数
    }
    paging(fake);
}
//加载分页
function paging(fake){
    var page=Math.ceil(fake.total/fake.pageNumber);
    fake.page=page;
    var html="";
    if(page>1){
        for(var i=0;i<page;i++){
            html+='<li></li>';
        }
        $(fake.ulDom).html(html);
        $(fake.ulDom).children("li:first").addClass("pitch");
    }
    $(fake.check).children("li").hide();
    for(var i=0;i<fake.pageNumber;i++){
        $(fake.check).children("li").eq(i).show();
    }
    ck(fake)
}
//注册事件函数
function ck(fake){
    $(fake.ulDom).children("li").click(function(){
        $(fake.check).children("li").hide();
        $(fake.ulDom).children("li").removeClass("pitch");
        var curr=$(this).index();
        var currPage=fake.pageNumber*(curr+1);
        if(currPage==fake.page){
            currPage=fake.total;
        }
        for(var i=(curr*fake.pageNumber);i<currPage;i++){
            $(fake.check).children("li").eq(i).show();
        }
        $(fake.ulDom).children("li").eq(curr).addClass("pitch");
    })
}