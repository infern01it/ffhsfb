$(function() {
	window.initSliderPopup = function(className) {
		var slider = $('.'+className+'__slick');
		var sliderItem = $('.'+className+'__item');
		var sliderPrev = $('.'+className+'__arrow_left');
		var sliderNext = $('.'+className+'__arrow_right');

		if( slider.length ) {
			slider.slick({
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				speed: 500,
				cssEase: 'linear',
				centerMode: true,
				variableWidth: true,
				infinite: false
			});
		}

		if(slider.length && sliderPrev.length) {
			sliderPrev.on('click', function() {
				slider.slick('slickPrev');
			});
		}

		if(slider.length && sliderNext.length) {
			sliderNext.on('click', function() {
				slider.slick('slickNext');
			});
		}

		updateSliderArrows();
		slider.on('afterChange', function() {
			updateSliderArrows();
		});

		function updateSliderArrows() {
			if(slider.length && sliderPrev.length) sliderPrev.css('display', sliderItem.first().hasClass('slick-current') ? 'none' : 'flex');
			if(slider.length && sliderNext.length) sliderNext.css('display', sliderItem.last().hasClass('slick-current') ? 'none' : 'flex');
		}

		return slider;
	}
});
