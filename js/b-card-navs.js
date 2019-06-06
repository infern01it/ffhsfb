;(function($) {
	'use strict';
	var CardNavs = window.CardNavs || {};

	CardNavs = (function() {
		function CardNavs(element, settings) {
			var _ = this;
			
			_.$allBtns = $(element).children('.b-card-navs__btn');
			_.$allCards = $('.' + settings.allCardClass);
			_.allCardClass = settings.allCardClass;
			_.allTypeCards = {};

			_.init();
		}
		return CardNavs;
	}());

	CardNavs.prototype.init = function() {
		var _ = this;

		_.$allBtns.on('click', function() {
			var filter = $(this).data('filter');
			if( !$(this).hasClass('active') ) {
				if( filter === _.allCardClass ) {
					_.$allBtns.removeClass('active');
				} else {
					if( _.$allBtns.eq(0).hasClass('active') ) {
						_.$allBtns.eq(0).removeClass('active');
					}
				}
				$(this).addClass('active');
			} else {
				if( filter === _.allCardClass ) {
					_.$allBtns.removeClass('active');
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			}
			if( _.$allBtns.filter('.active').length === _.$allBtns.length - 1 ) {
				_.$allBtns.removeClass('active');
				_.$allBtns.eq(0).addClass('active');
			}
			if( _.$allBtns.filter('.active').length === 0 ) {
				_.$allBtns.eq(0).addClass('active');
			}
			_.updateCards();
		});

		_.$allBtns.each(function(id, btn) {
			_.allTypeCards[$(btn).data('filter')] = false;
		});

		_.$allCards.each(function(id, card) {
			for( var type in _.allTypeCards ) {
				if( !_.allTypeCards[type] ) {
					_.allTypeCards[type] = $(card).hasClass(type);
				}
			}
		});

		for( var type in _.allTypeCards ) {
			if( !_.allTypeCards[type] ) {
				_.$allBtns.filter('[data-filter="'+ type +'"]').css('display', 'none');
			}
		}
	}

	CardNavs.prototype.updateCards = function() {
		var _ = this;

		_.$allCards.css('display', 'none');
		_.$allBtns.each(function(id, btn) {
			if( $(btn).hasClass('active') ) {
				if( id === 0 ) {
					_.$allCards.css('display', 'block');
				} else {
					var filter = $(btn).data('filter');
					_.$allCards.filter('.'+filter).css('display', 'block');
				}
			}
		});
	}

	CardNavs.prototype.appendCards = function() {
		var _ = this;

		_.$allCards = $('.' + _.allCardClass);
	}

	$.fn.cardNavs = function() {
		var _ = this,
				opt = arguments[0],
				args = Array.prototype.slice.call(arguments, 1),
				l = _.length,
				i,
				ret;

		for (i = 0; i < l; i++) {
			if (typeof opt == 'object' || typeof opt == 'undefined') {
				_[i].cardNavs = new CardNavs(_[i], opt);
			} else {
				ret = _[i].cardNavs[opt].apply(_[i].cardNavs, args);
			}
			if (typeof ret != 'undefined') return ret;
		}
		return _;
	};
})(jQuery);

$(function() {
	$('.b-card-navs').cardNavs({
		allCardClass: 'fl-all'
	});

	// Если нужно обновить доступные фильтры, то необходимо вызвать $('.b-card-navs').cardNavs('appendCards');
});
