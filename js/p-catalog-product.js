$(function() {
	var classNameBig = 'product-priview-slider-big';
	var sliderBig = $('.'+classNameBig+'__slider');
	// var sliderBigPrev = $('.'+classNameBig+'__prev');
	// var sliderBigNext = $('.'+classNameBig+'__next');
	var sliderBigItem = $('.'+classNameBig+'__item');

	var classNameSmall = 'product-priview-slider-small';
	var sliderSmall = $('.'+classNameSmall+'__slider');

	if( sliderBig.length ) {
		sliderBig.slick({
			asNavFor: '.'+classNameSmall+'__slider',
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			speed: 500,
			fade: true,
			cssEase: 'linear'
		});

		if( sliderBigItem.length ) {
			var handler = function() {
				$('.product-popup').switchPopup('open');
				sliderPopup.slick('slickGoTo', $(this).index());
			}

			if( $(this).width() > 1000 ) {
				sliderBigItem.on('click', handler);
			}

			$(window).on('resize', function() {
				if( $(this).width() <= 1000 ) {
					sliderBigItem.unbind('click', handler);
				} else {
					sliderBigItem.on('click', handler);
				}
			});
		}
	}

	if( sliderSmall.length ) {
		sliderSmall.slick({
			asNavFor: '.'+classNameBig+'__slider',
			lazyLoad: 'ondemand',
			slidesToShow: 6,
			slidesToScroll: 1,
			focusOnSelect: true,
			dots: false,
			arrows: false,
			infinite: true,
			swipe: true,
			swipeToSlide: true,
			variableWidth: true
		});
	}

	// Слайдер в попапе
	$('.product-popup').switchPopup({
		btnClass: 'js-tgl-product-popup'
	});

	var sliderPopup = window.initSliderPopup('b-photo-slider');
});
