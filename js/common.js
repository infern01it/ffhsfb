$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on("DOMNodeInserted", function() {
		imgSvg();
	});
	
	$('.header__menu').switchPopup({
		btnClass: 'js-tgl-menu',
		time: 200
	});

	$('.popup-callback').switchPopup({
		btnClass: 'js-tgl-callback',
		time: 200
	});

	$('.popup-thx').switchPopup({
		btnClass: 'js-tgl-thx',
		time: 200
	});
	
	// Выпадающие пункты меню
	function openMnu(obj, closeAll) {
		if(typeof closeAll === 'undefined' || closeAll) {
			var allObj = obj.parent('ul').children('li.is-parent').not(obj);
			closeMnu(allObj);
		}

		if( obj[0].timerId ) clearTimeout( obj[0].timerId );

		obj.addClass('display');
		setTimeout(function() {
			obj.addClass('visible');
		}, 1);
	}

	function closeMnu(obj) {
		obj.each(function(id, element) {
			if( $(element).hasClass('visible') ) {
				$(element).removeClass('visible');
				element.timerId = setTimeout(function() {
					$(element).removeClass('display');
					element.timerId = 0;
				}, 200);
			}
		});
	}

	$('.submenu-block__item.active').each(function(id, el) {
		$(el).children().addClass('active');
	});

	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	if(typeof supportsTouch == 'undefined' || !supportsTouch) {
		$('.header-menu .is-parent').on({
			'mouseenter': function() {
				openMnu($(this), false);
			},
			'mouseleave': function() {
				closeMnu($(this), false);
			}
		});
	} else {
		$('.header-menu .is-parent > .navigation-blocks__arrow').on('click', function () {
			var obj = $(this).parent();
			if(!obj.hasClass('display')) {
				openMnu(obj, false);
			} else {
				closeMnu(obj, false);
			}
		});
	}
	
	// Крестик - бургер && кнопка поиска в шапке
	$('.header-burger, .header-search-tgl-btn').on('click', function() {
		if(!$(this).hasClass('open')) {
			$(this).removeClass('close');
			$(this).addClass('open');
		} else {
			$(this).removeClass('open');
			$(this).addClass('close');
		}
	});

	$('.header-menu__search-form').switchPopup({
		time: 200
	});

	$('.header-search-tgl-btn').on('click', function() {
		if( !$('.header-menu__search-form').hasClass('display') ) {
			$('.header-menu__search-form').switchPopup('open');
			$('.header-menu').addClass('open-search');
		} else {
			$('.header-menu__search-form').switchPopup('close');
			$('.header-menu').removeClass('open-search');
		}
	});

	/* Обработка форм (отключение возможности отправки при неактивном инпуте) */
	$('form').each(function(id, form) {
		var $checkboxes = $(form).find('input[type="checkbox"]');
		var $submit = $(form).find('button[type="submit"]');
		var $politconf;
		$checkboxes.each(function(id, checkbox) {
			if( checkbox.id.toLowerCase().indexOf('politconf') !== -1 ) $politconf = $(checkbox);
		});

		if( $politconf && $politconf.length && $submit && $submit.length ) {
			$submit.attr('disabled', !$politconf[0].checked);
			$politconf.on('change', function() {
				$submit.attr('disabled', !$politconf[0].checked);
			});
		}
	});

	/* Плагин воспроизведения видео в лайтбоксе */
	if( $(".js-video-play").length ) {
		$(".js-video-play").modalVideo();
	}

	
	/* Выпадающий список (радиокнопки замаскированные под select) */
	// Открытие выпадашки по клику на нее
	$(document).on('click', '.formselect-radio__value, .formselect-radio__arrow', function() {
		var $parent = $(this).parent('.formselect-radio');
		if(!$parent.hasClass('form-wraper_disabled')) {
			$parent.toggleClass('open');
		}
	});
	// Закрытие выпадашки по клику вне нее
	$(document).on('click', function(event) {
		var $formselectRadioAll = $('.formselect-radio.open');
		var $formselectRadio = $(event.target).closest('.formselect-radio.open');
		if( $formselectRadio.length ) { // Если клик внутри formselect-radio
			if( $formselectRadioAll.length > 1 ) // Если было открыто больше 1 formselect-radio
				$formselectRadioAll.not($formselectRadio).removeClass('open'); // Закрытие всех formselect-radio кроме только что открытого
			return;
		}
		$formselectRadioAll.removeClass('open');
		event.stopPropagation();
	});
	// Меняет value выпадашки
	function updateSelectRadioValue(input) {
		var $parent = $(input).parents('.formselect-radio');
		var $value = $parent.children('.formselect-radio__value');
		var $input = $parent.children('.formselect-radio__input');
		var text = $(input).next('label').text();
		$value.children().text(text);
		$input.val(text);
		$value.attr('title', text);
		return $parent;
	}
	// Обработка инпутов внутри выпадашки
	$(document).on('change', '.formselect-radio__item input', function() {
		var $parent = updateSelectRadioValue(this);
		$parent.removeClass('open');
	});
	$(document).on('click', '.formselect-radio__item input:checked', function() {
		var $parent = updateSelectRadioValue(this);
		$parent.removeClass('open');
	});
	// Устанавливает value после загрузки страницы
	$(document).ready(function() {
		$('.formselect-radio__item input:checked').each(function(id, input) {
			updateSelectRadioValue(input);
		});
	});
});

