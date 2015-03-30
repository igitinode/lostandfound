// 监视当登录和注册的时候点击items相关的会提示框2015/3/29

$(function() {
	$(document).tooltip(
		{
			items: "input:text,input:password,textarea",
			track: false, //跟踪鼠标
			position : {
				my : "right top",
				at : "right bottom+5"
			},
			open: function( event, ui ) {
				 ui.tooltip.animate({ top: ui.tooltip.position().top + 5  }, "slow" );
			 },
			delay: 250,
			show: null
		}		 
	);
});
