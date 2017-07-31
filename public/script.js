$(document).ready(function() {
  $('.full').hide();
  $('.details').on('click', function() {
    $('.full').toggle();
    $('html, body').animate({
        scrollTop: $('.full').offset().top
    }, 500);
  })
})
