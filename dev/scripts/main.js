const app = {};

const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    65: "a",
    66: "b"
};

const konamiCode = [
    "up",
    "up",
    "down",
    "down",
    "left",
    "right",
    "left",
    "right",
    "b",
    "a"
];

let konamiCodePosition = 0;

// Compile all the functions to load.

app.init = () => {
    app.smoothScroll();
    app.portfolioExampleSlider();
    app.portfolioClickSlider();
    app.displayTopButton();
    app.konamiCodeActivator();
}

app.konamiCodeActivator = () => {
    document.addEventListener('keydown', function(e) {
        const key = allowedKeys[e.keyCode];
        let requiredKey = konamiCode[konamiCodePosition]
    
        if (key === requiredKey) {
            konamiCodePosition++;
    
            if (konamiCodePosition === konamiCode.length) {
                app.activateEasterEgg();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });
}

app.activateEasterEgg = () => {
    const audio = new Audio('../../media/easteregg.mp3');
    audio.play();
    console.log('cheater');
}

const windowWidth = $(window).width();

app.displayTopButton = () => {
    if (windowWidth > 414) {
        window.onscroll = function() {
            scrollFunction();
        };
    
        function scrollFunction() {
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                $(".top-link").css('display', 'block').css('position', 'fixed').css('bottom', '75px').css('right', '10%');
            } else {
                $(".top-link").css('display', 'none');
            }
        }
    }
}

// Smooth Scrolling

app.smoothScroll = () => {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
            ) {
            // Figure out element to scroll to
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                // Callback after animation
                // Must change focus!
                    const $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
}

// Set the portfolio previews to slide on hover.

app.portfolioExampleSlider = () => {
    if (windowWidth > 414) {
        $(`.portfolio-section__grid__box`).on(`mouseover`, `.portfolio-slider`, function() {
            $(this).css(`transform`, `translateX(-100%)`);
        });
    
        // Roll them back when you leave the container.
    
        $(`.portfolio-section__grid__box`).on(`mouseleave`, `.portfolio-slider`, function() {
            $(this).css(`transform`, `translateX(0)`);
        });
    }
}

// Set the portfolio description to slide in on click.

app.portfolioClickSlider = () => {
    $(`.portfolio-clicker`).on(`click`, function(e) {
        e.preventDefault();

        // Grab and create the class.
        const portfolioName = $(this).attr(`id`);
        const $portfolioClass = `.portfolio-${portfolioName}`;

        //  Check to see if the viewport is larger than mobile. if it is, the item should slide from the left.
        if (windowWidth > 414) {
            // Remove the class of the previous piece clicked, and send it back to the left.
            $(`.show`).removeClass(`show`).css('transform', `translateX(0)`);
    
            // Check to see if the initial state is still viewable, and slide it to the left if it is.
            if (!$(`.portfolio-first-screen`).css('transform', 'translateX(-100%)')) {
                $(`.portfolio-first-screen`).css('transform', 'translateX(-100%)');
            }
    
            // Move the clicked piece to the right.
            $($portfolioClass).addClass(`show`).css('transform', 'translateX(100%)');
        // If it is mobile, then the item should slide from the top.
        } else {
            $(`.show`)
                .removeClass(`show`)
                .css("transform", `translateY(0)`);
            if (!$(`.portfolio-first-screen`).css("transform", "translateY(-250%)")) {
                $(`.portfolio-first-screen`).css("transform", "translateY(-250%)");
            }
            $($portfolioClass)
                .addClass(`show`)
                .css("transform", "translateY(250%)");
        }
    });
}

// Run the damn thing

$(app.init);