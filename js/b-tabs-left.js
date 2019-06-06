$(function() {
	// Табы
	$('.b-tabs-left__btn').on('click', function() {
		$parent = $(this).parent();

		if( !$parent.hasClass('active') ) {
			var n = $parent.index();
			$('.b-tabs-left__h-item').removeClass('active');
			$('.b-tabs-left__b-item').removeClass('active');
			$parent.addClass('active');
			$($('.b-tabs-left__b-item').get(n)).addClass('active');
		}
	});

	$('.b-tabs-left__select-radio input[type="radio"]').on('change', function() {
		var n = $(this).parent().index();
		$('.b-tabs-left__h-item').removeClass('active');
		$('.b-tabs-left__b-item').removeClass('active');
		$($('.b-tabs-left__h-item').get(n)).addClass('active');
		$($('.b-tabs-left__b-item').get(n)).addClass('active');
	});
});
