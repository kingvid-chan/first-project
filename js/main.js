$(document).ready(function(){
	$("#btn-base-ie9").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").addClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-all").hide();
		$("#base-ie8").hide();
		$("#base-ie6").hide();
		$("#base-ie5").hide();
		$("#base-ie").hide();
		$("#base-others").hide();
		$("#base-ie9").show();
	});
	$("#btn-base-ie8").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").addClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-all").hide();
		$("#base-ie9").hide();
		$("#base-ie6").hide();
		$("#base-ie5").hide();
		$("#base-ie").hide();
		$("#base-others").hide();
		$("#base-ie8").show();
	});
	$("#btn-base-ie6").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").addClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-all").hide();
		$("#base-ie9").hide();
		$("#base-ie8").hide();
		$("#base-ie5").hide();
		$("#base-ie").hide();
		$("#base-others").hide();
		$("#base-ie6").show();
	});
	$("#btn-base-ie5").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").addClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-all").hide();
		$("#base-ie9").hide();
		$("#base-ie8").hide();
		$("#base-ie6").hide();
		$("#base-ie").hide();
		$("#base-others").hide();
		$("#base-ie5").show();
	});
	$("#btn-base-ie").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").addClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-all").hide();
		$("#base-ie9").hide();
		$("#base-ie8").hide();
		$("#base-ie6").hide();
		$("#base-ie5").hide();
		$("#base-others").hide();
		$("#base-ie").show();
	});
	$("#btn-base-others").click(function(){
		$("#btn-base-all").removeClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").addClass("active");
		$("#base-all").hide();
		$("#base-ie9").hide();
		$("#base-ie8").hide();
		$("#base-ie6").hide();
		$("#base-ie5").hide();
		$("#base-ie").hide();
		$("#base-others").show();
	});
	$("#btn-base-all").click(function(){
		$("#btn-base-all").addClass("active");
		$("#btn-base-ie9").removeClass("active");
		$("#btn-base-ie8").removeClass("active");
		$("#btn-base-ie6").removeClass("active");
		$("#btn-base-ie5").removeClass("active");
		$("#btn-base-ie").removeClass("active");
		$("#btn-base-others").removeClass("active");
		$("#base-ie9").hide();
		$("#base-ie8").hide();
		$("#base-ie6").hide();
		$("#base-ie5").hide();
		$("#base-ie").hide();
		$("#base-others").hide();
		$("#base-all").show();
	});
	/*wechat code*/
	$('#wechat').popover({
					'html':true,
					'content':$('#weixinQR').html(),
					'trigger':'hover',
					'placement':'top'
				});
})