/*<style>.j-category-layout-252 .categoryLayout-two-column .categoryLayout-two-column-t{display:block !important;}
.j-category-layout-252 .category-navigator > span{position:relative;}
.j-category-layout-252 .category-navigator > span a{position:absolute;top:0;left:0;width:100%;height:100%;}
.mt{margin-top:45px}</style>
<script>$(document).ready(function(){
  var list_arr = [];
  $(".j-category-layout-252 .categoryLayout-two-column ul.categoryLayout-two-column-t").each(function(){
    var id = "_"+$(this).attr("data-moduleids")
    $(this).attr("id",id);
    list_arr.push(id);
  })
  $(".j-category-layout-252 .category-navigator > span").each(function(index){
    $(this).append("<a href="#"+list_arr[index]+""+list_arr[index]+""></a>");
  })

  $(".j-category-layout-252 .category-navigator > span a").click(function(){
    var id = $("this").attr("href").splice(0,1);
    $("#"+id).addClass('mt');
  })

  $(window).scroll(function(){
    $(".categoryLayout-two-column-t").removeClass("mt");
  })
  
})
</script>*/

$(document).ready(function(){
  var navTop = $("#nav").offset().top,
      f1Top = $("#floor-1").offset().top,
      f2Top = $("#floor-2").offset().top,
      f3Top = $("#floor-3").offset().top,
      floorArr = [f1Top,f2Top,f3Top],
      f3_bool = false;
      console.log(floorArr);
  $(window).scroll(function(){
    var scrollTop = $(this).scrollTop();
    if (!f3_bool) {f3Top =$("#floor-3").offset().top;};
    if (scrollTop>f3Top && !f3_bool) {f3_bool=true;f3Top=f3Top};
    
    console.log(f3Top);
    if (scrollTop>navTop) {
      $("#nav").css({
        "position":"fixed",
        "top":"0",
        "width":"100%"
      })
    }else{
      $("#nav").css({
        "position":"static"
      })
    }
  })

  $("#nav a").click(function(e){
    floorArr[2]=f3Top;
    e.preventDefault();
    var index = $(this).parent().index();
    $(window).scrollTop(floorArr[index]);
  })
})
