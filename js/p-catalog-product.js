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

	var sliderPopup = window.initSliderPopup('slider-popup');
	
	// Масонри на гридах
	function resizeGridItem($item){
		var $grid = $('.product-specifications__grid');
		rowHeight = parseInt($grid.css('grid-auto-rows'));
		rowGap = parseInt($grid.css('grid-row-gap'));
		rowSpan = Math.ceil(($item.children()[0].getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
		$item[0].style.gridRowEnd = "span "+rowSpan;
	}

	function resizeAllGridItems(){
		$(".product-specifications__col").each(function(id, el) {
			resizeGridItem($(el));
		});
	}

	resizeAllGridItems();
	$(window).ready(function() {
		resizeAllGridItems();
	});
	$(window).on('resize', function() {
		resizeAllGridItems();
	});

	$('.b-accordion').on('toggle', function() {
		resizeAllGridItems();
	});

	// Табы
	$('.product-tabs__btn').on('click', function() {
		$parent = $(this).parent();

		if( !$parent.hasClass('active') ) {
			var n = $parent.index();
			$('.product-tabs__h-item').removeClass('active');
			$('.product-tabs__b-item').removeClass('active');
			$parent.addClass('active');
			$($('.product-tabs__b-item').get(n)).addClass('active');
		}
	});

});
