(function($){
	$(window).on("load",function(){
		// prettyprint
		$("pre").addClass("prettyprint").addClass("linenums");
		prettyPrint();
		// toTop
		$('.to-top').toTop({right:15,bottom:12});
	});
})(jQuery);
