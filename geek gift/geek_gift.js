$(document).ready(function(){
	touch.on(".seaHouse-list-inner","touchstart hold tap",function(){
		$(this).find(".qw_border").addClass("active");
		$(this).siblings().find(".qw_border").removeClass("active");
	})
})