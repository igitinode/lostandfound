function isAutoLogin(username, nickname, password) {
		var data = {
			"username" : username,
			"nickname" : nickname,
			"password" : password,
		};
		$.ajax({
			url : "/lostandfound/login/isAutoLogin.json",
			data : data,
			type:"post",
			dataType:"json",
			success : function(result) {
				//局部 刷新页面
				if (result.isAutoLogin == true){
					$("#head-top-right-span").html(loginHtml());
					$("#hypocorism_top").html(nickname);
				}
			},
		});
	}

function logout() {
	//清除 自动 登录 cookies
	$.cookie('nmluserinfo', null, {path:'/'});
	jAlert("安全退出成功！请稍后！", "提示", function() {
		window.location.href="/lostandfound";
	});
}

// 登录重定向 2015/3/28
function login() {
	window.location.href = "/lostandfound/login.html";
}

function createVisitCode() {
	//更新谈话 时间
	$
			.ajax({
				url : "/visitcode/createVisitCode.json",
				type : "post",
				data : "status=0",
				async : false,
				dataType : "json",
				success : function(result, status) {
					//alert(result.visitCode.code);// notReadMsg 
					var isok = result.isok;
					if ("true" == isok) {
						$("#visitCodeSpan").html(result.visitCode.code);
						$("#createCountSpan").html(result.createCount);
						var divObj = $("#visitCodeDialog");
						var buttons = {};
						nml.dialog(divObj, "获取邀请码", true, true, 600, 300,
								buttons, 200, 450);
					} else {
						//0~14
						jConfirm(
								"每个用户只能申请15个邀请码<br>您已经获取了"
										+ result.createCount
										+ "个邀请码，不能再继续申请邀请码<br>如果需要继续申请，可以联系管理员！邮箱:feedback@kuaiyixun.com<br>竭诚为您服务！",
								"提示");
					}
				}
			});
}

function loginHtml() {
	var loginHtmlContent = "";
	loginHtmlContent += "<a href='/lostandfound/quickRegGoods.html'  target='_blank' style='float:right'><b  class='white'>快速发布</b></a>";
	//loginHtmlContent += "<span style='float:right'><a href='/personal/forward.jspx?forward=/personal/p-scorerule-info&nav=p-scorerule-info&action=zhishuguize'      style='color:#gray; display:inline-block;' class='qr_icon pointer'><b  class='white qr_icon'  >快易寻指数(<span id='scoreSpan'>0</span>)</b></a></span>";
	loginHtmlContent += "<span style='float:right'><a href='/personal/forward.jspx?forward=/personal/p-user-info&nav=p-user-info&action=xiugaitouxiang'><b  class='white'>我的快易寻</b></a><a  id='notReadMsg' href='/personal/forward.jspx?forward=/personal/p-message-info&nav=p-message-info' style='cursor:pointer;' title='进入私信'></a> </span>";
	loginHtmlContent += "<a href='#' onclick='logout()' style='float:right' ><b  class='white'>[退出]</b></a>";
	loginHtmlContent += "<span style='float:right'><b  class='white'>您好！</b></span>";
	loginHtmlContent += "<a href='#' style='margin-right: 5px;float:right;cursor:text;'  ><b  class='white'><span id='hypocorism_top' ></span></b></a>";
	return loginHtmlContent;
}












//显示城市页面
function changeCity(province_name,city_name) {
	$("#changeCitySpan").toggle();
	$("#top_province").show('slow');
	$("#searchCity").focus();
	//$("#top_city").show('slow');
	$.ajax({
				url : "/goods/queryGoodsPlaceList.json?parentid=0",
				success : function(result) {
					var length = result.data.length;
					// var options = "<option value='-1'></option>";
					//var province_name = "${province_name}";
					//var wordindex = "${wordindex}";
					var options = "";
					for ( var i = length - 1; i >= 0; i--) { //for(var i=0;i<length;i++){
						var goodsplace = result.data[i];
						var id = goodsplace.id;
						var wordindex = "";
						//var wordindex = goodsplace.wordindex;
						var placename = goodsplace.placename;
						var placeqp = goodsplace.placeqp;
						var _selected = "";
						if (province_name == placename) {
							_selected = "selected=selected";
						}
						options = options
								+ "<option value='"+id+"'   "+_selected+"   placeqp='"+placeqp+"'>"
								+ wordindex + placename + "</option>";
					}
					$("#top_province").empty();
					$(options).appendTo("#top_province");
					//显示  省份
					$("#top_province").change();
				}
			});

	$("#top_province").change(
					function() {
						//城市  city
						var province = $("#top_province").val();//province id 
						if (province == -1) {
							$("#top_city").hide();
						} else {
							$.ajax({
										url : "/goods/queryGoodsPlaceList.json?parentid="
												+ province,
										success : function(result) {
											var length = result.data.length;
											//alert(length)
											if (length == 0) {
												$("#top_city").hide();
												//如果没有二级城市，自动跳转
												//如果当前选择的城市 才跳转
												if ("${city_id}" != province) {
													confirmCity();
												}
											} else {
												$("#top_city").show();
												var options = "<option value='-1'>请选择</option>";
												//var options = "";
												//var city_name = "${city_name}";
												for ( var i = 0; i < length; i++) {
													var goodsplace = result.data[i];
													var id = goodsplace.id;
													var placename = goodsplace.placename;
													var placeqp = goodsplace.placeqp;
													var _selected = "";
													if (city_name == placename) {
														_selected = "selected=selected";
													}
													options = options
															+ "<option value='"+id+"' placeqp='"+placeqp+"'   "+_selected+"  style='height:17px'>"
															+ placename
															+ "</option>";
												}
												$("#top_city").empty();
												$(options).appendTo(
														"#top_city");
											}
										}
									});
						}
					});

	$("#top_city").change(function() {
		//自动跳转	
		confirmCity();
	});

}
//confirmCityButton 确定选择城市 事件
function confirmCity() {
	var city_id = "";
	var city_placeqp = "";
	var city_name = "";
	var province_name = "";
	if ($("#top_city").css("display") != "none") {
		city_id = $("#top_city option:selected").val();
		city_placeqp = $("#top_city option:selected").attr("placeqp");
		city_name = $("#top_city option:selected").text();
		province_name = $("#top_province option:selected").text();
	} else {
		city_id = $("#top_province option:selected").val();
		city_placeqp = $("#top_province option:selected").attr("placeqp");
		city_name = $("#top_province option:selected").text();
		province_name = $("#top_province option:selected").text();
	}
	if (city_id == -1) {
		jAlert("请选择切换城市！", "提示");
		return false;
	}
	//通知后台 切换了  城市
	//alert($("#city_id").val())
	doChangeCity(city_id, city_placeqp, city_name, province_name);

}
function doChangeCity(city_id, city_placeqp, city_name, province_name) {
	var data = {
		"city_id" : city_id,
		"city_placeqp" : city_placeqp,
		"city_name" : encodeURI(city_name),
		"province_name" : encodeURI(province_name)
	};
	$.ajax({
		url : "/common/changeCity.json",
		data : data,
		success : function(result) {
			$("#goCitySpan").html(city_name);
			$("#changeCitySpan").hide();
			//alert(1)
			$("#goCitySpan").click();
		}
	});
}












//原标题 	
var docTitle = document.title;
function getNotReadMsg() {
	//更新谈话 时间
	$
			.ajax({
				url : "/message/queryMessagesNotRead.json",
				type : "post",
				//data:data,
				dataType : "json",
				success : function(result, status) {
					//alert(result.data.length) notReadMsg
					if (result.data != undefined) {
						var count = result.data.length;
						if (count > 0) {
							//var msgImg = "<img src='/images/msg.png' alt='快易寻'/>" ;
							var msgImg = "<img src='/images/letter.gif' alt='快易寻'/>";
							$("#notReadMsg").html(msgImg);
							document.title = "(" + count + "封未读)"
									+ docTitle;
							//提示有新邮件
							art.dialog
									.notice({
										title : "站内信",
										width : 300,// 必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致artDialog收缩
										content : "您有<a href='/personal/forward.jspx?forward=/personal/p-message-info&nav=personalCenter'>"
												+ count
												+ "</a>条未读消息，请及时查看！",
										//icon: "face-sad",
										icon : "face-smile",
										time : 5
									});
						} else {
							$("#notReadMsg").html("");
							document.title = docTitle;
						}
					}
				}
			});
}