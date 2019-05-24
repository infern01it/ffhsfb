$(function() {
	// Масонри на гридах
	function resizeGridItem($item) {
		var $grid = $('.product-specifications__grid');
		rowHeight = parseInt($grid.css('grid-auto-rows'));
		rowGap = parseInt($grid.css('grid-row-gap'));
		rowSpan = Math.ceil(($item.children()[0].getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
		$item[0].style.gridRowEnd = "span "+rowSpan;
	}

	function resizeAllGridItems() {
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
});
