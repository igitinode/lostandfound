var nml={
	"go":go,	
	"logout":logout,	
	"dialog":dialog,
	"contains":contains,
	"datepicker":datepicker
};
 

 
//timedMsg()
function logout(){
	//location.href="/login/login.jspx?nav=login";
	location.href="/";
}
function go(url){
	window.location.href=url;
}
function dialog(divObj,title,autoOpen,modal,width,height,buttons,top,left){
	var dialog = divObj.dialog({
		autoOpen: autoOpen,
		modal	: modal,
		title	: title,
		width	: width,
		height	: height,
		buttons	: buttons
	});
	return dialog;
}

function getEffect(){
	var random = parseInt(Math.random()*(14-1)+1,10);//返回10-20的随机数
	var effert = new Array();
	effert.push("blind");
	effert.push("bounce");
	effert.push("clip");
	effert.push("drop");
	effert.push("fade");
	effert.push("explode");
	effert.push("fold");
	effert.push("highlight");
	effert.push("pulsate");
	effert.push("puff");
	effert.push("scale");
	effert.push("size");
	effert.push("shake");
	effert.push("slide");
	//alert(effert[random-1]);
	return effert[random-1];
}
function datepicker(divid){
	$( "#"+divid ).datepicker({ 
	    showOn: "both", 
	    buttonImage: "/images/calendar/calendar.gif", 
	    buttonImageOnly: true,
	    buttonText: "选择日期",
	    closeText:'关闭',
	    prevText:'前一月',
	    nextText:'后一月',
	    currentText:'今日',
	    showMonthAfterYear : true,
	    numberOfMonths : 1,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	    yearRange: '1911:2111',
	    dateFormat: 'yy-mm-dd',
	    autoSize: true, 
	    defaultDate: new Date()
		} 
	);
	//设置文本框默认日期
	var date = new Date();
	$('#'+divid).val((new Date()).format('yyyy-mm-dd'));
	
	$('#'+divid).datepicker( "option", "showAnim","show" );	
}


//contains 函数 - JS
/*
*
*string:原始字符串
*substr:子字符串
*isIgnoreCase:忽略大小写
*/

function contains(string, substr, isIgnoreCase) {
	if (isIgnoreCase) {
		string = string.toLowerCase();
		substr = substr.toLowerCase();
	}
	var startChar = substr.substring(0, 1);
	var strLen = substr.length;
	for ( var j = 0; j < string.length - strLen + 1; j++) {
		if (string.charAt(j) == startChar)// 如果匹配起始字符,开始查找
		{
			if (string.substring(j, j + strLen) == substr)// 如果从j开始的字符与str匹配，那ok
			{
				return true;
			}
		}
	}
	return false;
}




function checkValue(obj,wayobj,msgspanobj){
	//alert(wayobj.val())
	msgspanobj.css({"width":"200px","background": "url('') no-repeat","margin-left":"10px"});
	msgspanobj.html("");
	var msgspancss = {"display":"inline-block","line-height":"16px","height":"16px","width":"16px","background": "url(/images/ok.png) no-repeat","margin-left":"10px"}; 
	
	var thisway = wayobj.val();
	var thisnumber = $.trim($(obj).val());
	//alert(thisway+"="+thisnumber);
	//验证  联系方式
	if(thisway=='手机'){
		var partten = /^0{0,1}(13[0-9]|15[3-9]|15[0-2]|18[0-9])[0-9]{8}$/i;  
		var shouji=partten.test(thisnumber);  
		if(!shouji){
			 msgspanobj.html("您输入的手机号码有误！");
			 msgspanobj.css("background","");
			 //$(obj).focus();
			 //alert("您输入的手机号码有误！") ; 
			 //return false;
		}else{
			 //msgspanobj.html("sj right!!!");
			 //msgspanobj.html("&nbsp;&nbsp;&nbsp;&nbsp;");
			 msgspanobj.css(msgspancss);
			 //return true;
		}
	}
	if(thisway=='电话'){
		var partten = /^(\d{3,4}\-)?\d{7,8}$/i;
		var zuoji=partten.test(thisnumber);  
		if(!zuoji){
			// alert("您输入的电话有误！") ; 
			 msgspanobj.html("您输入的电话有误！");
			 msgspanobj.css("background","");
			 //$(obj).focus();
			// return false;  
		}else{
			 //msgspanobj.html("dh right!!!");
			 //msgspanobj.html("&nbsp;&nbsp;&nbsp;&nbsp;");
			 msgspanobj.css(msgspancss);
			 //return true;
		}
	}
	if(thisway=='QQ'){
		var partten = /^[1-9]\d{4,11}$/i;
		var QQ=partten.test(thisnumber);  
		if(!QQ){
			 //alert("您输入的QQ有误！") ; 
			 msgspanobj.html("您输入的QQ有误！");
			 msgspanobj.css("background","");
			 //$(obj).focus();
			 //return false;  
		}else{
			 //msgspanobj.html("QQ right!!!");
			 //msgspanobj.html("&nbsp;&nbsp;&nbsp;&nbsp;");
			 msgspanobj.css(msgspancss);
			 //return true;
		}
	}
	if(thisway=='微信'){
		msgspanobj.css(msgspancss);
	}
	if(thisway=='微博'){
		msgspanobj.css(msgspancss);
	}
	
}


function waitDialog(title,msg,top,left){
	 if(top=="undefined"){
		 top = 200;
	 }
	 if(left=="undefined"){
		 left = 450;
	 }
	 var divObj = $("#waitDialog");
	 divObj.html(msg);
	 var  buttons= {};
	 var dialog =  nml.dialog(divObj,title,true,true,180,70,buttons,top,left);
	 $(".ui-dialog .ui-dialog-content").css("height","20px");
	 $(".ui-dialog .ui-dialog-titlebar").css("display","none");
	 return dialog;
}





