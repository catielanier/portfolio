"use strict";

var app = {};

var allowedKeys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  65: "a",
  66: "b"
};

var konamiCode = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];

var konamiCodePosition = 0;

// Compile all the functions to load.

app.init = function () {
  app.changeLanguage();
  app.smoothScroll();
  app.displayTopButton();
  app.konamiCodeActivator();
  app.chooseCity();
  app.disableForm();
  AOS.init();
};

app.konamiCodeActivator = function () {
  document.addEventListener('keydown', function (e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];

    if (key === requiredKey) {
      konamiCodePosition++;

      if (konamiCodePosition === konamiCode.length()) {
        app.activateEasterEgg();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
};

app.changeLanguage = function () {
  var $language = $("#language");
  $language.on("change", function () {
    var language = $language.val();
    if (language === "en") {
      window.location.href = "../";
    } else {
      window.location.href = "../" + language + "/";
    }
  });
};

app.activateEasterEgg = function () {
  var audio = new Audio('../../media/easteregg.mp3');
  audio.play();
};

app.chooseCity = function () {
  var cities = ["toronto", "stlouis", "seoul", "qingdao", "tokyo", "fukuoka"];
  var randomCity = cities[Math.floor(Math.random() * cities.length)];
  app.changeHero(randomCity);
};

app.changeHero = function (city) {
  var $header = $("header");
  $header.css("background", "linear-gradient(to bottom, rgba(1,31,75,0.7), rgba(1,31,75,0.7)), url('../../img/" + city + "bg.jpg')").css("background-size", "cover");
};

var windowWidth = $(window).width();

app.displayTopButton = function () {
  if (windowWidth > 414) {
    var scrollFunction = function scrollFunction() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $(".top-link").css('display', 'block').css('position', 'fixed').css('bottom', '75px').css('right', '10%');
      } else {
        $(".top-link").css('display', 'none');
      }
    };

    window.onscroll = function () {
      scrollFunction();
    };
  }
};

// Smooth Scrolling

app.smoothScroll = function () {
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
};

// Disable the form if there are numbers within the name field, to prevent these trash emails with no body from sending.

app.disableForm = function () {
  var re = /^[A-Za-z]+$/;
  $("#fullName").on('change', function (e) {
    if (!re.test($("#fullName").val())) {
      $("input[type=submit]").prop('disabled');
    }
  });
};

// Run the damn thing

$(app.init);