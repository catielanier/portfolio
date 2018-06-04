'use strict';

var app = {};

// Compile all the functions to load.

app.init = function () {
    app.smoothScroll();
    app.portfolioExampleSlider();
    app.portfolioClickSlider();
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
    $('.portfolio-section__grid__box').on('mouseover', '.portfolio-slider', function () {
        $(this).css('transform', 'translateX(-100%)');
    });

    // Roll them back when you leave the container.

    $('.portfolio-section__grid__box').on('mouseleave', '.portfolio-slider', function () {
        $(this).css('transform', 'translateX(0)');
    });
};

// Set the portfolio description to slide in on click.

app.portfolioClickSlider = function () {
    $('.portfolio-clicker').on('click', function (e) {
        e.preventDefault();

        // Grab and create the class.
        var portfolioName = $(this).attr('id');
        var $portfolioClass = '.portfolio-' + portfolioName;

        // Remove the class of the previous piece clicked, and send it back to the left.
        $('.show').removeClass('show').css('transform', 'translateX(0)');

        // Check to see if the initial state is still viewable, and slide it to the left if it is.
        if (!$('.portfolio-first-screen').css('transform', 'translateX(-100%)')) {
            $('.portfolio-first-screen').css('transform', 'translateX(-100%)');
        }

        // Move the clicked piece to the right.
        $($portfolioClass).addClass('show').css('transform', 'translateX(100%)');
    });
};

// Run the damn thing

$(app.init);