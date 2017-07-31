$(document).ready(function() {
  $('.full').hide();
  $('.det-title').hide();
  $('.details').click(function(e) {
    e.preventDefault();
    var details = $('.details');
    details.text() == 'Details' ? details.text('X') : details.text('Details');
    $('.det-title').slideToggle();
    $('.full').slideToggle();
    $('html, body').animate({
        scrollTop: $('.det-title').offset().top
    }, 500);
  })
})
