var kingvid_drt = angular.module('kingvid_drt', []);

kingvid_drt.directive('typewriter', function(){
	return {
		scope : {},
		restrict : 'AE',
		template : '<h1>Welcome To My Personal Page,<br>Hope You Would Like It!</h1><p>---Kingvid</p><small>You May Visit By the Newest Version Browser ~</small>',
		// replace : true,
		// transclude : true, 保留选中元素中的内容
		link : function(scope,element){
			var str = element.html();
			// scope.$apply("myFunction()");
			var progress = 0;
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				element.html(str.substring(0, progress) + (progress && 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					element.html(str.substring(0, progress));
					element.append('<br><a class="btn btn-default" href="src/index.html">Enter</a>');
				}	
			}, 80);
		}
	}
});

