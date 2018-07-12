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
    app.portfolioExampleSlider();
    app.portfolioClickSlider();
    app.displayTopButton();
    app.konamiCodeActivator();
    app.chooseCity();
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
    var cities = ["toronto", "stlouis", "seoul", "qingdao"];
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

// Set the portfolio previews to slide on hover.

app.portfolioExampleSlider = function () {
    if (windowWidth > 414) {
        $(".portfolio-section__grid__box").on("mouseover", ".portfolio-slider", function () {
            $(this).css("transform", "translateX(-100%)");
        });

        // Roll them back when you leave the container.

        $(".portfolio-section__grid__box").on("mouseleave", ".portfolio-slider", function () {
            $(this).css("transform", "translateX(0)");
        });
    }
};

// Set the portfolio description to slide in on click.

app.portfolioClickSlider = function () {
    $(".portfolio-clicker").on("click", function (e) {
        e.preventDefault();

        // Grab and create the class.
        var portfolioName = $(this).attr("id");
        var $portfolioClass = ".portfolio-" + portfolioName;

        //  Check to see if the viewport is larger than mobile. if it is, the item should slide from the left.
        if (windowWidth > 414) {
            // Remove the class of the previous piece clicked, and send it back to the left.
            $(".show").removeClass("show").css('transform', "translateX(0)");

            // Check to see if the initial state is still viewable, and slide it to the left if it is.
            if (!$(".portfolio-first-screen").css('transform', 'translateX(-100%)')) {
                $(".portfolio-first-screen").css('transform', 'translateX(-100%)');
            }

            // Move the clicked piece to the right.
            $($portfolioClass).addClass("show").css('transform', 'translateX(100%)');
            // If it is mobile, then the item should slide from the top.
        } else {
            $(".show").removeClass("show").css("transform", "translateY(0)");
            if (!$(".portfolio-first-screen").css("transform", "translateY(-250%)")) {
                $(".portfolio-first-screen").css("transform", "translateY(-250%)");
            }
            $($portfolioClass).addClass("show").css("transform", "translateY(250%)");
        }
    });
};

// Run the damn thing

$(app.init);