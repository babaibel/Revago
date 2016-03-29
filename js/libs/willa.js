function days() {
  var def =7;
  $('#days').append(def);
  var a = $("#date-from").datepicker('getDate'),
      b = $("#date-to").datepicker('getDate'),
      c = 24*60*60*1000,
      diff = 7;
  diff = Math.round(Math.abs((a - b)/(c)));
  $('#days').empty().append(diff);
  var price = 350,
      pay = price * diff;
  $('#pay').empty().append("= $ " + pay);
};

$(document).ready(function () {
  // Datepicker
  // Min days to buy
  var minDays = 7;

  $('#date-from').datepicker({
      dateFormat: 'dd.mm.yy',
      numberOfMonths: 2,
      minDate: 0,
      onClose: function date() {
        var date1 = $('#date-from').datepicker('getDate');
        var tod = new Date();
        var start = new Date(date1);
        var end = new Date(date1.setDate(date1.getDate() + minDays));
        var diff = Math.round((start-tod)/(1000*60*60*24)) + 1 + Math.round((end-start)/(1000*60*60*24));
        $('#date-to').removeAttr('disabled').datepicker({
          minDate: diff,
          dateFormat: 'dd.mm.yy',
          numberOfMonths: 2,
          onClose: function () {
            days();
          }
        });
        $('#date-to').val('');
        return false;
      }
  });

  $.datepicker.setDefaults($.datepicker.regional["ru"]);
  // Custom Select
  $('#guests').selectmenu({
      appendTo: '#guests-wrapper'
  });

  //Show more
  $(".more").click(function(){
    $(".facilities .hid").animate({height: "show"}, 1000);
    $(this).hide('slow');
  });
  $(".read-next").click(function(){
    $(this).hide('slow').parent().find('.hid').animate({height: "show"}, 200);
  });
  $('.add-review').click(function() {
    $(this).hide();
    $('.feedback-people').show();
  });
  //scroll body
  $(document).ready(function() {
  $('a[href^="#"]').click(function() {
    var el = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(el).offset().top}, 500);
    return false; 
    });
  });
  //leave reviews
  $('.feedbacking').click(function () {
    $(this).hide();
    $('.feedback-people').slideDown(200);
  });

  $('.feedback-people button').unbind('click');
});

$(window).bind('load resize', function() {
  if ($(window).width() > 991) {
    $('#aniimated-thumbnials').lightGallery({thumbnail:true,animateThumb: false, showThumbByDefault: true,});
    $(window).scroll(function () {
      var el = $(window).scrollTop();
      var start = $('#scrolll').offset().top;
      var stop = $('#map').offset().top;
      var heig = $('.wrapper-calc').height() + 90;
      if (el > start) {
        $('.top-nav-fix .top-line').slideDown(200);
        $('.wrapper-calc').addClass('fix');
      }
      else {
        $('.top-nav-fix .top-line').slideUp(200);
        $('.wrapper-calc').removeClass('fix');
      }
      if (el > stop - heig) {
        $('.wrapper-calc').addClass('posit').css('margin-top', stop - heig - heig);
      }else {
        $('.wrapper-calc').removeClass('posit').css('margin-top', '');
      }
    });
  } else {
    $('.top-nav-fix .top-line').slideUp(200);
    $('.wrapper-calc').removeClass('fix');
  }
});

function initMap() {
  //Positon
  var LatLng = {lat: 37.4087, lng: -4.4856};
  //Call options
  var Options = {
    center: LatLng,
    zoom: 9,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  //Create map
  var map = new google.maps.Map(document.getElementById("map"), Options);
  //Create baloon
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Адрес жилья</h1>'+
      '<div id="bodyContent">'+
      '<p>Celle del Aceite, Лусена, Кордова, А-далусия,' +
      '<h2>Испания</h2></p>'+
      '</div>'+
      '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
    //Add marker
  var image = new google.maps.MarkerImage('',
    new google.maps.Size(1, 1)
  );
  var marker = new google.maps.Marker({
   position: LatLng,
   map: map,
   icon: image
  });
  infowindow.open(map, marker);
}
google.maps.event.addDomListener(window, 'load', initMap);
