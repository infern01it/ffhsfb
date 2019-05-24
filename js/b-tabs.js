$(function() {
	// Табы
	$('.b-tabs__btn').on('click', function() {
		$parent = $(this).parent();

		if( !$parent.hasClass('active') ) {
			var n = $parent.index();
			$('.b-tabs__h-item').removeClass('active');
			$('.b-tabs__b-item').removeClass('active');
			$parent.addClass('active');
			$($('.b-tabs__b-item').get(n)).addClass('active');
		}
	});
});
