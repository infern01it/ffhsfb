$(function() {
	$allBtn = $('.b-card-navs__btn');
	$allCard = $('.fl-all');

	$allBtn.on('click', function() {
		var filter = $(this).data('filter');
		if( !$(this).hasClass('active') ) {
			if( filter === 'fl-all' ) {
				$allBtn.removeClass('active');
			} else {
				if( $allBtn.eq(0).hasClass('active') ) {
					$allBtn.eq(0).removeClass('active');
				}
			}
			$(this).addClass('active');
		} else {
			if( filter === 'fl-all' ) {
				$allBtn.removeClass('active');
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		}
		if( $allBtn.filter('.active').length === $allBtn.length - 1 ) {
			$allBtn.removeClass('active');
			$allBtn.eq(0).addClass('active');
		}
		updateCards();
	});

	function updateCards() {
		$allCard.css('display', 'none');
		$allBtn.each(function(id, btn) {
			if( $(btn).hasClass('active') ) {
				if( id === 0 ) {
					$allCard.css('display', 'block');
				} else {
					var filter = $(btn).data('filter');
					$allCard.filter('.'+filter).css('display', 'block');
				}
			}
			
		});
	}
});
