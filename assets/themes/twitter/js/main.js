(function($){
	$(window).on("load",function(){
		// prettyprint
		$("pre").addClass("prettyprint").addClass("linenums");
		prettyPrint();
		// mCustomScrollbar
		$("body").mCustomScrollbar({
			theme:"minimal-dark",
			autoHideScrollbar:true,  // 是否自动隐藏滚动条
			horizontalScroll:false,  // 是否显示水平滚动条
			mouseWheelPixels:300,    // 鼠标滚轮滚动的像素数目
			scrollInertia:500        // 鼠标滚轮滚动的缓动速度
		});
	});
})(jQuery);
