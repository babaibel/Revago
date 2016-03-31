$(document).ready(function() {

    $(function () {

        if(!$('.popup-modal').length) return;

        $('.popup-modal').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username',
            closeBtnInside: true
        });

        
    });

});

$(document).ready(function() {

     $(function () {

        $('.placement-type').click(function(){
            $(this).addClass('active');
            $('.placement-type').not(this).removeClass('active');
        });
     
    });

});