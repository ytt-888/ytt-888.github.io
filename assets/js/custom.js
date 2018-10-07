////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;

$(document).ready(function($) {
    "use strict";
	
	$('.navbar-nav .nav-link').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});

//  "img" into "background-image" transfer

    $("[data-background-image]").each(function() {
        $(this).css("background-image", "url("+ $(this).attr("data-background-image") +")" );
    });

    $(".background--image, .img-into-bg").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

//  Custom background color

    $("[data-background-color]").each(function() {
        $(this).css("background-color", $(this).attr("data-background-color")  );
    });

//  Parallax Background Image

    $("[data-parallax='scroll']").each(function() {
        var speed = $(this).attr("data-parallax-speed");
        var $this = $(this);
        var isVisible;
        var backgroundPosition;

        $this.isInViewport(function(status) {
            if (status === "entered") {
                isVisible = 1;
                var position;

                $(window).scroll(function () {
                    if( isVisible === 1 ){
                        position = $(window).scrollTop() - $this.offset().top;
                        backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window).height()+$this.height()))*100);
                        if( $this.find(".parallax-element").hasClass("background--image") ){
                            $this.find(".background--image.parallax-element").css("background-position-y", (position/speed) + "px");
                        }
                        else {
                            $this.find(".parallax-element").css("transform", "translateY(" +(position/speed)+ "px)");
                        }
                    }
                });
            }
            if (status === "leaved"){
                isVisible = 0;
            }
        });
    });

    // Particles effect in the "background" class

    $(".background--particles").particleground({
        density: 15000,
        lineWidth: 0.2,
        lineColor: "#515151",
        dotColor: "#313131",
        parallax: false,
        proximity: 200
    });

    // Owl Carousel

    var $owlCarousel = $(".owl-carousel");

    if( $owlCarousel.length ){
        $owlCarousel.each(function() {

            var items = parseInt( $(this).attr("data-owl-items"), 10);
            if( !items ) items = 1;

            var nav = parseInt( $(this).attr("data-owl-nav"), 2);
            if( !nav ) nav = 0;

            var dots = parseInt( $(this).attr("data-owl-dots"), 2);
            if( !dots ) dots = 0;

            var center = parseInt( $(this).attr("data-owl-center"), 2);
            if( !center ) center = 0;

            var loop = parseInt( $(this).attr("data-owl-loop"), 2);
            if( !loop ) loop = 0;

            var margin = parseInt( $(this).attr("data-owl-margin"), 2);
            if( !margin ) margin = 0;

            var autoWidth = parseInt( $(this).attr("data-owl-auto-width"), 2);
            if( !autoWidth ) autoWidth = 0;

            var navContainer = $(this).attr("data-owl-nav-container");
            if( !navContainer ) navContainer = 0;

            var autoplay = $(this).attr("data-owl-autoplay");
            if( !autoplay ) autoplay = 0;

            var fadeOut = $(this).attr("data-owl-fadeout");
            if( !fadeOut ) fadeOut = 0;
            else fadeOut = "fadeOut";

            if( $("body").hasClass("rtl") ) var rtl = true;
            else rtl = false;

            if( items === 1 ){
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplaySpeed: 2000,
                    autoplay: autoplay,
                    autoheight: 1,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    autoHeight: true,
                    rtl: rtl,
                    navText: []
                });
            }
            else {
                $(this).owlCarousel({
                    navContainer: navContainer,
                    animateOut: fadeOut,
                    autoplaySpeed: 2000,
                    autoplay: autoplay,
                    autoheight: items,
                    center: center,
                    loop: loop,
                    margin: margin,
                    autoWidth: autoWidth,
                    items: 1,
                    nav: nav,
                    dots: dots,
                    autoHeight: true,
                    rtl: rtl,
                    navText: [],
                    responsive: {
                        1199: {
                            items: items
                        },
                        992: {
                            items: 3
                        },
                        768: {
                            items: 2
                        },
                        0: {
                            items: 1
                        }
                    }
                });
            }

            if( $(this).find(".owl-item").length === 1 ){
                $(this).find(".owl-nav").css( { "opacity": 0,"pointer-events": "none"} );
            }

        });
    }

    // Loading effect

    Pace.on("done", function() {
        $("#hero h1 .hero__title").each(function(i) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass("in");
            }, i* 100);
        });
        setTimeout(function () {
            $(".loading-screen").css("display", "none");
        }, 4000);

    });

    // Text carousel of H1 heading in hero section

    $(".text-carousel").Morphext({
        animation: "bounceIn",
        separator: ",",
        speed: 5000
    });

    // Reveal text effect after is in viewport

    $(".reveal:not(.in)").each(function(i) {
        var $this = $(this);
        $this.isInViewport(function(status) {
            if (status === "entered") {
                setTimeout(function () {
                    $this.addClass("in");
                }, i* 50);
            }
        });
    });

    // Magnific images popup

    $(".popup-image").magnificPopup({
        type:'image',
        fixedContentPos: false,
        gallery: { enabled:true },
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            // This prevents pushing the entire page to the right after opening Magnific popup image
            open: function() {
                $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
            },
            close: function() {
                $(".page-wrapper, .navbar-nav").css("margin-right", 0);
            }
        }
    });

    // Magnific Video Popup

    if ($(".video-popup").length > 0) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }
	
	//  Form Validation

    $(".form .btn[type='submit']").on("click", function(e){		
        var button = $(this);
        var form = $(this).closest("form");
        button.prepend("<div class='status'></div>");		
        form.validate({
            submitHandler: function() {
                $.post("assets/php/email.php", form.serialize(),  function(response) {
				console.log(response);
                    button.find(".status").append(response);
                    form.addClass("submitted");
                });
                return false;
            }
        });
    });

    heroHeight();

});

// On RESIZE actions

$(window).on("resize", function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

// On RESIZE actions

$(window).on("scroll", function(){
    if ( $(window).scrollTop() > 0 ) {
        $(".navbar").addClass("bg-black")
    }
    else {
        $(".navbar").removeClass("bg-black")
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing(){
    heroHeight();
}

// Set Hero height

function heroHeight(){
    $("#hero").height( $(window).height() );
}

// Smooth Scroll

$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on("click", function(event) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex','-1');
                        $target.focus();
                    }
                });
            }
        }
    });

// Return scrollbar width

function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}
