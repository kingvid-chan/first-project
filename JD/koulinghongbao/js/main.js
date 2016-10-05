function w() {
    var x = window;
    var v, u, t, tes,
        s = x.document,
        r = s.documentElement,
        a = r.getBoundingClientRect().width;

    if (!v && !u) {
        var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
        v = x.devicePixelRatio;
        tes = x.devicePixelRatio;
        v = n ? v : 1, u = 1 / v;
    }
    document.documentElement.setAttribute('style', 'font-size:' + a / 320 * 20 + "px");
}
window.addEventListener("resize", function() {
    w();
});
w();

$('.status').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    if ($(this).hasClass('slideIn')) {
        $(this).removeClass('slideIn').addClass('active');
    }else{
        $(this).removeClass('slideOut active');
    }
});
$('.description').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    if ($(this).hasClass('des_slideIn')) {
        $(this).removeClass('des_slideIn').addClass('active');
    }else{
        $(this).removeClass('des_slideOut active');
    }
});

$(function() {
    var windowHeight = $(window).height();
    $('body').css('min-height', windowHeight + 'px');

});