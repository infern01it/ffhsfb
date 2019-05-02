$(function() {
  window.mainSlider = function(globalOptions) {
    var mainSliderParent = $('.home-slider');
    var mainSlider = $('.home-slider__slick');
    var mainSliderItem = $('.home-slider__item');
    var mainSliderLoaderLine = $('.home-slider__loader-line');
  
    $(document).ready(function() {
      mainSliderParent.css('opacity', 1);
    });
    
    if(mainSlider.length) {
      mainSlider.slick( $.extend({
        infinite: true,
        dots: false,
        arrows: false,
        fade: true,
        pauseOnHover: false
      }, globalOptions) );

      if( globalOptions.autoplay && typeof globalOptions.autoplaySpeed !== 'undefined' ) {
        mainSlider.on('afterChange', function() {
          loaderLineAnimation();
        });
        mainSlider.on('init', function() {
          loaderLineAnimation();
        });
      }

      function loaderLineAnimation() {
        mainSliderLoaderLine.css('transition', 'none');
        mainSliderLoaderLine.css('width', '0%');
        setTimeout(function() {
          mainSliderLoaderLine.css('transition', 'all ' + globalOptions.autoplaySpeed/1000+'s' + ' linear');
          mainSliderLoaderLine.css('width', '100%');
        }, 1);
      }
    }
  }
});
