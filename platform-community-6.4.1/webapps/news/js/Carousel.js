(function($) {
  var Carousel = {
    slideIndex: 0,
    slides: document.getElementsByClassName('carouselItems'),

    showSlides: function() {
      Carousel.getNextSlide();
      setTimeout(Carousel.showSlides, 15000);

      const nextItemsArrow = document.querySelector('.nextItems');
      if (nextItemsArrow) {
        nextItemsArrow.onclick = function() {
          Carousel.getNextSlide();
        };
      }

      const previousItemsArrow = document.querySelector('.prevItems');
      if (previousItemsArrow) {
        previousItemsArrow.onclick = function() {
          Carousel.getPrevSlide();
        };
      }

    },

    getNextSlide: function() {
      let i;
      let sliderLength = this.slides.length;
      if (this.slides.length % 2 == 1) {
        sliderLength += 1;
      }
      this.slideIndex=this.slideIndex+2;
      for (i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = 'none';
      }
      if (this.slideIndex > sliderLength) {
        this.slideIndex = 2;
      }
      if (this.slides.length > 0) {
        if (this.slides.length - this.slideIndex >= 0){
          this.slides[this.slideIndex-1].style.display = 'block';
          this.slides[this.slideIndex-2].style.display = 'block';
        } else {
          this.slides[this.slideIndex-2].style.display = 'block';
        }
      }
    },

    getPrevSlide: function() {
      let i;
      const slides = document.getElementsByClassName('carouselItems');

      let sliderLength = this.slides.length;
      if (this.slides.length % 2 == 1) {
        sliderLength += 1;
      }
      this.slideIndex = this.slideIndex - 2;
      if (this.slideIndex == 0) {
        this.slideIndex = sliderLength;
      }

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }

      if (slides.length > 0) {
        if (this.slides.length - this.slideIndex >= 0){
          this.slides[this.slideIndex-1].style.display = 'block';
          this.slides[this.slideIndex-2].style.display = 'block';
        } else {
          this.slides[this.slideIndex-2].style.display = 'block';
        }
      }
    }
  };
  return Carousel;
})($);