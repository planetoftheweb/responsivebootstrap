$(function() {

  "use strict";

  var topoffset = 50; //variable for menu height
  var slideqty = $('#featured .item').length;
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#featured .item').eq(randSlide).addClass('active');

  //replace IMG inside carousels with a background image
  $('#featured .item img').each(function() {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#featured') {
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }


  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#featured') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });


  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Automatically generate carousel indicators
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  });

});
