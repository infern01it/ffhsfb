$(function() {
	// Аккордион
	$('.b-accordion__title, .b-accordion__btn').on('click', function() {
		var $parent = $(this).parents('.b-accordion__item');
		if( !$parent.hasClass('active') ) {
			$parent.addClass('active');
			$parent.children('.b-accordion__body').slideDown(400);
		} else {
			$parent.removeClass('active');
			$parent.children('.b-accordion__body').slideUp(400);
		}
		$('.b-accordion').trigger('toggle');
	});
});
