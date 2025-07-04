(function() {
	'use strict';

	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	/*----------------------------------------
		Modern Enhancements
	----------------------------------------*/
	
	// Scroll Progress Indicator
	var scrollProgress = function() {
		$(window).on('scroll', function() {
			var scrollTop = $(window).scrollTop();
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var scrollPercent = (scrollTop) / (docHeight - winHeight);
			var scrollPercentRounded = Math.round(scrollPercent * 100);
			$('.scroll-progress').css('width', scrollPercentRounded + '%');
		});
	};

	// Enhanced Scroll Animations
	var enhancedScrollAnimations = function() {
		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		});

		// Observe elements for scroll animations
		$('.site-section, .resume-item, .skill-item, .certificate-item').each(function() {
			$(this).addClass('animate-on-scroll');
			observer.observe(this);
		});
	};

	// Typing Animation for Hero Text
	var typingAnimation = function() {
		if ($('.site-hero h1 strong').length > 0) {
			var text = $('.site-hero h1 strong').text();
			$('.site-hero h1 strong').text('');
			var i = 0;
			
			function typeWriter() {
				if (i < text.length) {
					$('.site-hero h1 strong').text($('.site-hero h1 strong').text() + text.charAt(i));
					i++;
					setTimeout(typeWriter, 100);
				}
			}
			
			setTimeout(typeWriter, 1000);
		}
	};

	// Parallax Effect for Hero Background
	var parallaxHero = function() {
		$(window).on('scroll', function() {
			var scrolled = $(window).scrollTop();
			var parallaxSpeed = 0.5;
			$('.site-hero').css('transform', 'translateY(' + (scrolled * parallaxSpeed) + 'px)');
		});
	};

	// Enhanced Page Loader
	var pageLoader = function() {
		// Create loader if it doesn't exist
		if ($('.page-loader').length === 0) {
			$('body').prepend('<div class="page-loader"><div class="loader"></div></div>');
		}

		$(window).on('load', function() {
			setTimeout(function() {
				$('.page-loader').addClass('fade-out');
				setTimeout(function() {
					$('.page-loader').remove();
				}, 500);
			}, 800);
		});
	};

	// Smooth Hover Effects for Cards
	var cardHoverEffects = function() {
		$('.resume-item, .skill-item, .certificate-item').on('mouseenter', function() {
			$(this).find('img').addClass('hover-effect');
		}).on('mouseleave', function() {
			$(this).find('img').removeClass('hover-effect');
		});
	};

	// Dynamic Background Particles
	var createParticles = function() {
		if ($('.site-hero').length > 0) {
			var particles = '';
			for (var i = 0; i < 50; i++) {
				var size = Math.random() * 3 + 1;
				var duration = Math.random() * 20 + 10;
				var delay = Math.random() * 20;
				var left = Math.random() * 100;
				
				particles += '<div class="particle" style="' +
					'width: ' + size + 'px; height: ' + size + 'px; ' +
					'left: ' + left + '%; ' +
					'animation-duration: ' + duration + 's; ' +
					'animation-delay: ' + delay + 's;"></div>';
			}
			
			if ($('.particles-container').length === 0) {
				$('.site-hero').append('<div class="particles-container">' + particles + '</div>');
			}
		}
	};


	// navigation
	var OnePageNav = function() {
		var navToggler = $('.navbar-toggler');
		var scrollOffset = 80; // Account for fixed navbar height
		
		// Enhanced smooth scroll with proper offset
		$(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function(e) {
			e.preventDefault();
			var hash = this.hash;
			var targetElement = $(hash);
			
			if (targetElement.length) {
				var scrollPosition = targetElement.offset().top - scrollOffset;
				
				$('html, body').animate({
					scrollTop: scrollPosition
				}, 700, 'easeInOutExpo', function(){
					// Update URL without jumping
					if (history.pushState) {
						history.pushState(null, null, hash);
					}
				});
			}
		});
		
		// Close mobile menu when clicking nav links
		$("#pb-navbar ul li a[href^='#']").on('click', function(e){
			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});

		// Enhanced scrollspy activation
		$(window).on('scroll', function() {
			var scrollPos = $(window).scrollTop() + scrollOffset + 50;
			
			$('#pb-navbar ul li a[href^="#"]').each(function() {
				var currLink = $(this);
				var refElement = $(currLink.attr('href'));
				
				if (refElement.length && 
					refElement.offset().top <= scrollPos && 
					refElement.offset().top + refElement.outerHeight() > scrollPos) {
					
					$('#pb-navbar ul li').removeClass('active');
					currLink.closest('li').addClass('active');
				}
			});
		});
	};
	

	var offCanvasNav = function() {
		// var toggleNav = $('.js-pb_nav-toggle'),
		// 		offcanvasNav = $('.js-pb_offcanvas-nav_v1');
		// if( toggleNav.length > 0 ) {
		// 	toggleNav.click(function(e){
		// 		$(this).toggleClass('active');
		// 		offcanvasNav.addClass('active');
		// 		e.preventDefault();
		// 	});
		// }
		// offcanvasNav.click(function(e){
		// 	if (offcanvasNav.hasClass('active')) {
		// 		offcanvasNav.removeClass('active');
		// 		toggleNav.removeClass('active');
		// 	}
		// 	e.preventDefault();
		// })
	};
	


	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.site-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .site-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn site-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft site-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight site-animated');
							} else {
								el.addClass('fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	var navbarState = function() {

		var lastScrollTop = 0;
		$(window).scroll(function(){

			var $this = $(this),
				 	st = $this.scrollTop(),
				 	navbar = $('.site-navbar');

			if ( st > 200 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if ( navbar.hasClass('scrolled') && st > 300 ) {
		   	if (st > lastScrollTop){
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.removeClass('awake');
		      	// navbar.addClass('sleep');
		      // }
		   	} else {
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.addClass('awake');
		      	// navbar.removeClass('sleep');
		      // }
		   	}
		   	lastScrollTop = st;
		  }

		});



		
	};

	
	
	
	var siteStellar = function() {
		// Only initialize on non-mobile devices for better performance
		if (!isMobile.any()) {
			$(window).stellar({
				responsive: true,
				parallaxBackgrounds: true,
				parallaxElements: true,
				horizontalScrolling: false,
				hideDistantElements: false,
				scrollProperty: 'scroll'
			});
		}
	};
	



	// Page Nav
	var clickMenu = function() {

		$('.navbar-nav a:not([class="external"])').click(function(event){

			var section = $(this).data('nav-section'),
				navbar = $('.navbar-nav');
				if (isMobile.any()) {
					$('.navbar-toggle').click();
				}
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500, 'easeInOutExpo');
			   }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function() {
		var $root = $('html, body');
		var scrollOffset = 80;

		$('.smoothscroll').click(function (e) {
			e.preventDefault();
			var target = $($.attr(this, 'href'));
			
			if (target.length) {
				$root.animate({
					scrollTop: target.offset().top - scrollOffset
				}, 500);
			}
			return false;
		});
	};
	
	var magnificPopupControl = function() {


		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
	};




	var portfolioMasonry = function() {
 $('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
        
        var data = $(this).attr('data-filter');
        $grid.isotope({
          filter: data
        })
      });


      if(document.getElementById("section-portfolio")){
            var $grid = $(".grid").isotope({
              itemSelector: ".all",
              percentPosition: true,
              masonry: {
                columnWidth: ".all"
              }
            })
      };


	};


	$(function(){
		// Initialize enhanced features
		pageLoader();
		scrollProgress();
		enhancedScrollAnimations();
		typingAnimation();
		parallaxHero();
		cardHoverEffects();
		createParticles();

		// Initialize existing features
		OnePageNav();
		offCanvasNav();
		contentWayPoint();
		navbarState();
		siteStellar();
		clickMenu();
		smoothScroll();
		portfolioMasonry();
		
		// Initialize magnificPopup if elements exist
		if ($('.image-popup, .with-caption, .popup-youtube, .popup-vimeo, .popup-gmaps').length > 0) {
			magnificPopupControl();
		}
	});

	


})();

