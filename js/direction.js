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
$(document).ready(function() {
    // Search position
    $('.main-search').css('padding-top',$('header').height() / 100 * 37);

    // Autocomplete field
    var availablePlaces = [
        "Аликанте",
        "Андалусия",
        "Балеарские острова",
        "Барселона",
        "Бенидорм",
        "Бильбао",
        "Валенсия",
        "Город Ибица",
        "Гран-Канария",
        "Гранада",
        "Жирона",
        "Ибица",
        "Кадис",
        "Канарские острова",
        "Каталония",
        "Кордова",
        "Коста-Бланка",
        "Коста-Брава",
        "Коста-Дорада",
        "Коста-дель-Соль",
        "Лансароте",
        "Ллорет-де-Мар",
        "Мадрид",
        "Майорка",
        "Малага",
        "Марбелья",
        "Пальма-де-Майорка",
        "Реус",
        "Салоу",
        "Санта-Крус-де-Тенерифе",
        "Сарагоса",
        "Севилья",
        "Ситжес",
        "Сьерра-Невада",
        "Таррагона",
        "Тенерифе",
        "Толедо",
        "Фигерас"
    ];
    $("#place").autocomplete({
        source: availablePlaces,
        appendTo: '#place-wrapper'
    });

    // Custom Select
    $('#guests').selectmenu({
        appendTo: '#guests-wrapper'
    });

    $(".read-next").click(function(){
        $(this).hide('slow').parent().parent().find('#hid').animate({height: "show"}, 250);
      });

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

    //fix for IE7 and IE8
    $.support.placeholder = ('placeholder' in document.createElement('input'));
    if (!$.support.placeholder) {
        $("[placeholder]").focus(function () {
            if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
        }).blur(function () {
            if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
        }).blur();

        $("[placeholder]").parents("form").submit(function () {
            $(this).find('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            });
        });
    }
  //Hide button more description.
  $('.show-project').click(function() {$(this).hide().delay(300);});
  //Hover effects to controll sliders.
  $(window).bind('load resize', function(event) {
      if ($(window).width() > 991) {
        $('#main-apartments li').hover(function() {$(this).find('.carousel-control').fadeIn(200);},function() {$(this).find('.carousel-control').fadeOut(200);});
      }else {
        $('#main-apartments li').find('.carousel-control').fadeIn(200);
      }
  });

  $(window).bind('resize load', function() {
    if ($(window).width() > 991) {
      // Menu transform
      function scrolling(){
        var $panel = $('.top-panel');
        ($(document).scrollTop() > 150) ? $panel.addClass('sticky') : $panel.removeClass('sticky');
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