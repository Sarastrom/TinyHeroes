$(document).ready(function () {
    $('.navbar-default .navbar-nav > li.dropdown').hover(function () {
        $('ul.dropdown-menu', this).stop(true, true).delay(200).slideDown('slow');
        $(this).addClass('open');
    }, function () {
        $('ul.dropdown-menu', this).stop(true, true).delay(200).slideUp('slow');
        $(this).removeClass('open');
    });
});

$(document).ready(function () {
    $('.dropdown-toggle').click(function () {
        var location = $(this).attr('href');
        window.location.href = location;
        return false;
    });
});

// $(document).ready(function () {
//     $('ul.nav li.dropdown').hover(function () {
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
//     }, function () {
//         $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
//     });
// });
