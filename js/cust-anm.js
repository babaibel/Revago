jQuery(document).ready(function($) {
  // $(window).unbind('scroll').scroll(function(event) {
  //   var el = $(window).scrollTop();
  //   if (el > 90) {
  //     $('#resp').css({right: 0, top: 0});
  //     $('.right-side nav').css('padding-top', '0').css('top', '-6px');
  //   }else {
  //     $('#resp').animate({right: 10, top: 35}, 200);
  //     $('.right-side nav').css('padding-top', '39px').css('top', 'inherit');
  //   }
  // });
  // Scroll first screen
  $('.scroll-tab').click(function(){
      $('html,body').animate({
          scrollTop: $('.city').offset().top - 60
      }, 1200);
      $('.top-panel').addClass('.sticky');
  });
});