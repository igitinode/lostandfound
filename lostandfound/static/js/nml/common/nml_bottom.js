$(document).ready(function(){ 
   /*  $('#replyDialog #appendcode').bind('keydown', function(event){
	   if (event.keyCode=="13"){
		   $("#send").click();
	   }
	});  */
	$('#appendcode').bind('keydown', function(event){
		   if (event.keyCode=="13"){
			   $(".ui-button").eq(0).click();
		   }
   });
    $('#replyDialog #replyContent').bind('textchange', function (event, previousText) {
    	var content = $.trim($('#replyDialog #replyContent').val());
    	var length = content.length;
    	var count = 150 ;
    	//alert(length+"="+count);     
    	if(length >= count){
    		$('#replyDialog #replyContent').val(content.substring(0,count));
    		$("#replyDialog #residualCountSpanId").html(0);
    	} else{
    		$("#replyDialog #residualCountSpanId").html(count-length);
    	}
    });
	
    $("img").each(function(i,obj){
		var thisObj = $(this);
		if(thisObj.prop("src")=="http://eiv.baidu.com/hmt/icon/21.gif"){
			thisObj.hide();
		}
	});
}); 
function disclaimers(){
	 var divObj = $("#disclaimersDialog");
	 var  buttons= {
			 "关闭": function() {
		 $( this ).dialog( "close" );
		}
	 };
	 nml.dialog(divObj,"免责声明",true,true,600,320,buttons,100,450);  
}
//function showAboutUs(){
	 /* var divObj = $("#aboutusDialog");
	 var  buttons= {};
	 nml.dialog(divObj,"关于我们",true,true,400,200,buttons,100,450); */
	 
//}
function showContactUs(){
	 var divObj = $("#contactusDialog");
	 var  buttons= {
				"关闭": function() {
					 $( this ).dialog( "close" );
				}
	 };
	 nml.dialog(divObj,"联系我们",true,true,400,200,buttons,100,450);
}
function showAboutUs(){
	 var divObj = $("#aboutusDialog");
	 var  buttons= {
				"关闭": function() {
					 $( this ).dialog( "close" );
				}
	 };
	 nml.dialog(divObj,"关于我们",true,true,400,250,buttons,100,450);
}
function showReplyUs(){
	 var divObj = $("#replyDialog");
	 $("#replyContent").val("");
	 $("#replyDialog #residualCountSpanId").html(150);
	 $("#replyDialog #appendcode").val("");
	 changeAppendcodeImg_feedback('appendCodeDiv');
	 
	 var  buttons= {
		"提交": function() {
			 var content = $.trim($("#replyContent").val()) ;
			 var appendcode = $.trim($("#appendCodeDiv  #appendcode").val()) ;
			 if(content.length>150){
				jAlert("发送内容不能超过150个字符","提示",function(){
					$("#content").focus();
				});
				return false;
			 }
			 // alert(appendcode)
			 var data = {
			       "content"	:content
			      ,"appendcode"	:appendcode
			 };
			 if(content==""){
				 jAlert("请输入信息！","提示",function(){
					 $("#replyContent").focus();
				 });
			 }else if(appendcode==""){
				 jAlert("请输入验证码！","提示",function(){
					 $("#appendcode").focus();
				 });
			 }else{
				 submitFeedBack(data,$(  this ));
			 }
		},
		"关闭": function() {
			 $( this ).dialog( "close" );
		}
	 };
	 nml.dialog(divObj,"意见反馈",true,true,550,320,buttons,100,450);
}
/**
 * 反馈信息 提交 
 *
 */
function submitFeedBack(data,dialog){
	//var dialogWait = waitDialog("发送反馈信息","信息发送中，请稍后...");
	$.ajax({
		url : "/feedback/insert.json",
		type : "post",
		data : data,
		dataType : "json",
		success : function(result, status) {
			if (result.isok == 'true') {
				//dialogWait.dialog("close");
				jAlert("提交成功！", "提示",function(){
					changeAppendcodeImg_feedback('appendCodeDiv');
					dialog.dialog("close");
				});
			} else {
				 var msg = "" ;
				 if(result.error=="appendcode"){
					 msg = "验证码输入错误！" ;
				 }
				jAlert(msg, "提示" ,function(){
					 changeAppendcodeImg_feedback('appendCodeDiv');
					 if(result.error=="appendcode"){
						 $("#appendCodeDiv #appendcode").focus(); 
					 }else{
						 $("#replyContent").focus();
						 
					 }
				});
			}
		}, 
		error : function() {
			jAlert("error！", "提示");
		}
	});
}






function changeAppendcodeImg_feedback(parentid){
	var src   =  $("#"+parentid+" #appendcodeimg").attr("src"); 
	var srcpath = "../jsp/common/image-feedback.jsp?it="+Math.random() ;
	$('#'+parentid+' #appendcodeimg').attr('src',srcpath);  
}