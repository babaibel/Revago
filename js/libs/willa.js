function days() {
    var def = 7;
    $('#days').append(def);
    var a = $("#date-from").datepicker('getDate'),
        b = $("#date-to").datepicker('getDate'),
        c = 24 * 60 * 60 * 1000,
        diff = 7;
    diff = Math.round(Math.abs((a - b) / (c)));
    $('#days').empty().append(diff);
    var price = 350,
        pay = price * diff;
    $('#pay').empty().append("= $ " + pay);
};

$(document).ready(function () {
    var isAllow = function (date) {
            var result = false;
            $.each(calendar, function (idx, record) {
                if (date.isBetween(record[0], record[1])) {
                    result = true;
                }
            })
            return result;
        },
        formatPrice = function (price) {
            return $.formatNumber(price, {
                format: "##,##0.",
                locale: "ru"
            })
        }

    $('#date-from').datepicker({
        dateFormat: 'dd.mm.yy',
        numberOfMonths: 2,
        minDate: 0,
        beforeShowDay: function (date) {
            if (isAllow(moment(date)) == true) {
                return [false]
            }
            return [true];
        },
        onSelect: function (date) {
            $.get('/service/item-prices', {
                start: date,
                id: $(this).data('id')
            }, function (data) {
                if (data.success) {
                    var second = $('#date-to'),
                        start = moment(date, 'DD.MM.YYYY'),
                        end = moment(date, 'DD.MM.YYYY').add(data.item.minimum_stay, 'days'),
                        diff = end.diff(start, 'days');
                    $('*[data-action="live-minimum-days"]').html(data.item.minimum_stay_formatted);
                    $('#price').html(data.item.user_price_formatted);
                    $('.price-for').show();
                    $('#days').html(0);
                    $('#pay').html('');

                    $(second).removeAttr('disabled').datepicker({
                        minDate: diff,
                        dateFormat: 'dd.mm.yy',
                        numberOfMonths: 2,
                        defaultDate: date,
                        beforeShowDay: function (date) {
                            if (isAllow(moment(date)) == true) {
                                return [false]
                            }
                            return [true];
                        },
                        onSelect: function (date) {
                            end = moment(date, 'DD.MM.YYYY');
                            var _start = moment($('#date-from').val(), 'DD.MM.YYYY'),
                                period_is_correct = true;
                            diff = end.diff(_start, 'days');
                            if (diff < data.item.minimum_stay) {
                                alert('Минимальный период бронирования ' + data.item.minimum_stay_formatted)
                                return false;
                            }
                            for (var i = 1; i <= diff; i++) {
                                if (isAllow(_start.add(1, 'days')) == true) {
                                    period_is_correct = false;
                                    console.log(period_is_correct)
                                }
                            }

                            if (period_is_correct == true) {
                                $('#days').html(diff);
                                $('#pay').html('= ' + formatPrice(data.item.user_price * diff)
                                    //+ ' ' + data.item.user_currency
                                )
                            } else {
                                alert('Невозможно забронировать выбранный период');
                                $('#days').html(0);
                                $('#pay').html('');
                            }
                        },
                        onClose: function () {
                        }
                    });
                    $(second).val('');
                }

            }, 'json')
        },
        onClose: function date() {
            var date1 = $('#date-from').datepicker('getDate');
            if (date1) {

            }

            return false;
        }
    });

    $.datepicker.setDefaults($.datepicker.regional["ru"]);
    // Custom Select
    $('#guests').selectmenu({
        appendTo: '#guests-wrapper'
    });

    //Show more
    $(".more").click(function () {
        $(".facilities .hid").animate({height: "show"}, 1000);
        $(this).hide('slow');
    });
    $(".read-next").click(function () {
        $(this).hide('slow').parent().find('.hid').animate({height: "show"}, 200);
    });
    $('.add-review').click(function () {
        $(this).hide();
        $('.feedback-people').show();
    });
    //scroll body
    $(document).ready(function () {
        $('a[href^="#"]').click(function () {
            var el = $(this).attr('href');
            $('html,body').animate({
                scrollTop: $(el).offset().top
            }, 500);
            return false;
        });
    });
    //leave reviews
    $('.feedbacking').click(function () {
        $(this).hide();
        $('.feedback-people').slideDown(200);
    });

    $('.feedback-people button').unbind('click');

    $('body').on('click', '*[data-action="add_review"]', function () {
        $.ajax({
            url: '/add/review',
            data: $('form[action="/add/review"]').serialize(),
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                alert(data.msg);
            },
            error: function (e, h) {
                var err = [];
                for (var i in e.responseJSON) {
                    err.push(e.responseJSON[i]);
                }
                alert(err.join("\n"))
                $.get('/captcha', {}, function (url) {
                    $('img.capcha').attr('src', url);
                })
            }
        })

        return false;
    })
});

$(window).bind('load resize', function () {
    if ($(window).width() > 991) {
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
            } else {
                $('.wrapper-calc').removeClass('posit').css('margin-top', '');
            }
        });
    } else {
        $('.top-nav-fix .top-line').slideUp(200);
        $('.wrapper-calc').removeClass('fix');
    }
});

function initMap() {

    var div = $('#map').parent(),
        coordinates = $(div).data('coordinates').split(','),
        address = $(div).data('address'),
        country = $(div).data('country'),
        title = $(div).data('title')
    //Positon

    var LatLng = {lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])};
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
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>' +
        '<div id="bodyContent">' +
        '<p>' + address +
        '<h2>' + country + '</h2></p>' +
        '</div>' +
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
