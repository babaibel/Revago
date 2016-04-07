$(document).ready(function  () {
  $('#resp').click(function () {
    if ($(this).attr('aria-extended') == 'false') {
      $(this).attr('aria-extended', 'true');
      $('header nav ul').slideToggle();
    } else {
      $(this).attr('aria-extended', 'false');
      $('header nav ul').slideToggle();
    }
  });
  $('#aniimated-thumbnials').lightGallery({
      selector: '.screenerr',
      thumbnail: true,
      animateThumb: true
    });

  $('.bxslider').bxSlider({
    maxSlides: 3,
    maxWidth: 930,
    slideWidth: 300,
    slideMargin: 10,
    pager: false
  });
  // Currency
  var $currency = $('.currency');
  $('.currency span').click(function(){
      $(this).next('ul').addClass('show');
  });

  $('body').click(function() {
    var even = $(event.target).parents('.currency');
    if ($('.currency ul').hasClass('show')) {
      if (!even.length) {
        $('.currency ul').removeClass('show');
      }
    }
  });

  $('.currency li').click(function(){
      $('.currency li').removeClass('active');
      $(this).addClass('active');
      $currency.find('span').html($(this).html());
      $currency.find('ul').removeClass('show');
  });

  $(window).bind('resize load', function() {
    if ($(window).width() > 991) {
      // Menu transform
      function scrolling(){
        var $panel = $('.top-panel');
        ($(document).scrollTop() > $(window).height()-65) ? $panel.addClass('sticky') : $panel.removeClass('sticky');
      }
      $(window).scroll(function() {
        scrolling();
      });
      scrolling();
    }
  });
  // animate button menu #resp
  // $(window).scroll(function(event) {
  //   if ($(window).scrollTop() > 90) {
  //     $('#resp').css({right: 0, top: 0});
  //     $('.right-side nav').css('padding-top', '0').css('top', '-6px');
  //   }else {
  //     $('#resp').animate({right: 10, top: 18}, 200);
  //     $('.right-side nav').css('padding-top', '39px').css('top', 'inherit');
  //   }
  // });
});