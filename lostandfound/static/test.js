<script type="text/javascript">
function checkUserName(obj){
    
    $("#username-msg-span").css("color","red");
    var username = $.trim($(obj).val());
    //alert(username)
     //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9]+[_]*|[\_]*|[\.]*|[\-]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //var myreg =/^[a-za-z0-9_-]{1,}@[a-za-z0-9_-]{1,}.[a-za-z0-9_-.]{1,}$/; 
    if(username==''){
        $("#username-msg-span").html("请输入邮箱（用户名）！");
        return false;
    }else if(!myreg.test(username))
    {
        $("#username-msg-span").html("请输入有效的邮箱（用户名）！");
        //$(obj).focus();
        return false;
   }else{
        var  user = {
                "username":username
        };
        var isValidate = false;
        $.ajax({
            url:"/login/userExist.json",
            type:"post",
            data:user,
            dataType:"json",
            async: false,
            success:function(result,status){
                if(result.isok=='true'){
                    $("#username-msg-span").html("用户已经存在！");
                    isValidate = false;
                    $(obj).focus();
                    //jAlert("用户已经存在！","提示");
                }else{
                    
                    $("#username-msg-span").css("color","green");
                    $("#username-msg-span").html("恭喜：该邮箱可以注册！");
                    isValidate = true;
                    //jAlert("恭喜：用户不存在，可以注册！","提示");
                }
            },
            error:function(){
                //jAlert("error！","提示");
                //alert("error");
                isValidate = false;
            }
        });
        //alert(isValidate)
        return isValidate ;
       //$("#username-msg-span").html("邮箱（用户名）有效！");
       
   }
}
function checkHypocorism(obj){
    
    $("#hypocorism-msg-span").css("color","red");
    var hypocorism = $.trim($(obj).val());
    //alert(username)
    if(hypocorism==''){
        $("#hypocorism-msg-span").html("请输入昵称！");
        return false;
   }else{
        var  user = {
                "hypocorism":hypocorism
        };
        var isValidate = false;
        $.ajax({
            url:"/login/userExist.json",
            type:"post",
            data:user,
            dataType:"json",
            async: false,
            success:function(result,status){
                if(result.isok=='true'){
                    $("#hypocorism-msg-span").html("昵称已经存在，请重新填写昵称！");
                    isValidate = false;
                    //jAlert("用户已经存在！","提示");
                }else{
                    $("#hypocorism-msg-span").css("color","green");
                    $("#hypocorism-msg-span").html("恭喜：该昵称可以使用！"); 
                    isValidate = true;
                    //jAlert("恭喜：用户不存在，可以注册！","提示");
                }
            },
            error:function(){
                //jAlert("error！","提示");
                //alert("error");
                isValidate = false;
            }
        });
        //alert(isValidate)
        return isValidate ;
       //$("#username-msg-span").html("邮箱（用户名）有效！");
       
   }
}
$(document).ready(function(){ 
    //alert("aaaaaaaaaaaaa");
    $('#userRegTable #appendcode').bind('keydown', function(event){
       if (event.keyCode=="13"){
           $("#reg_submit").click();
       }
    }); 
    
    // 注册提交
    $("#reg_submit").click(function(){
        
        var username = encodeURI(removeHTML($.trim($("#username").val())));
        var hypocorism = encodeURI(removeHTML($.trim($("#userRegTable #hypocorism").val())));
        //var c_username = encodeURI($("#c_username").val());
        //var username = $("#username").val();

        //jAlert(username,'username');
        
        var password = $.trim($("#userRegTable #password").val());
        var c_password = $.trim($("#userRegTable #c_password").val());
        var appendcode = $.trim($("#userRegTable #appendcode").val());
        var visitcode = $.trim($("#visitcode").val());
        
        
        var openlevel = $("#userRegTable #openlevel").val();
        var date = $("#userRegTable #date").val();
        var ip = $("#userRegTable #ip").val();
        var isuse = $("#userRegTable #isuse").val();
        var isonline = $("#userRegTable #isonline").val();
        var status = $("#userRegTable #status").val();
        var remark = encodeURI(removeHTML($.trim($("#userRegTable #remark").val())));
        // 验证表单
        if(!checkUserName($("#username"))){
            return;
        }
        if(!checkHypocorism($("#hypocorism"))){
            return;
        }
        /* if(username==''){
            jAlert("请输入注册邮箱 ",'提示',function(){$("#username").focus();});
            return false;
        }  */
        /* if(c_username==''){
            jAlert("请输入确认email ",'提示',function(){$("#c_username").focus();});
            return false;
        } */
        //alert(username+"="+c_username);
        /* if(username!=c_username){
            jAlert("email 与   确认email 不一致 ",'提示',function(){$("#c_username").focus();});
            return false;
        } */
        if(password==''){
            jAlert("请输入密码 ",'提示',function(){$("#password").focus();});
            return false;
        }
        if(c_password==''){
            jAlert("请输入确认密码 ",'提示',function(){$("#c_password").focus();});
            return false;
        }
        if(password!=c_password){
            jAlert("密码 与   确认密码 不一致 ",'提示',function(){$("#c_password").focus();});
            return false;
        }
        // if(appendcode==''){
        //     jAlert("请输入验证码！ ",'提示',function(){$("#appendcode").focus();});
        //     return false;
        // }
        var  user = {
                "username":username,
                "password":password,
                "visitcode":visitcode,
                "appendcode":appendcode,
                "hypocorism":hypocorism,
                "openlevel":openlevel,
                "ip":ip,
                "date":date,
                "isuse":isuse,
                "isonline":isonline,
                "facefilename":"",
                "status":status,
                "remark":remark
        };
        
        //  ajax submit
        $.ajax({
            url:"/login/userRegister.json",
            type:"post",
            data:user,
            dataType:"json",
            success:function(result,status){
                if(result.isok=='true'){
                    //jAlert("注册成功！","提示"); 
                    window.location.href="/" ;
                }else{
                    if(result.msgtip=='appendcode'){
                        jAlert("注册失败！ 验证码不正确 ！","提示",function(){$("#appendcode").focus();});
                    }else{
                        jAlert("注册失败！","提示",function(){$("#username").focus();});
                    }
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("error！","提示");
                //alert("error");
            }
        });
        
        
    });
    
    $("#userRegTable #username").blur(function(){
        var username = encodeURI($("#username").val());
        if(username==''){
            $("#userRegTable #span_username").html("请输入注册邮箱!");
            return false;
        }
        var  user = {
                "username":username
        };
        $.ajax({
            url:"/login/userExist.json",
            type:"post",
            data:user,
            dataType:"json",
            success:function(result,status){
                if(result.isok=='true'){
                    $("#span_username").html("用户已经存在！");
                    //jAlert("用户已经存在！","提示");
                }else{
                    $("#span_username").html("恭喜：用户不存在，可以注册！");
                    //jAlert("恭喜：用户不存在，可以注册！","提示");
                }
            },
            error:function(){
                //jAlert("error！","提示");
                //alert("error");
            }
        });
        
        
        
    });
    
    
    
    
}); 
    
    

function changeAppendcodeImg(){
    var src   =  $("#appendcodeimg").attr("src");
    var srcpath = "../jsp/common/image.jsp?it="+Math.random() ;
    $('#appendcodeimg').attr('src',srcpath);
}

</script>