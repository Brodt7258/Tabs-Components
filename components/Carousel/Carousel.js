class Carousel {
  constructor (element) {
    this.element = element;
    this.slides = [...this.element.querySelectorAll('.slide-wrapper .slide')]
      .reduce((obj, e) => {
        obj[e.dataset.slide] = new Slide(e);
        return obj;
      }, {});
    this.slideQuantity = Object.keys(this.slides).length;

    this.slideButtons = this.element.querySelectorAll('.slide-buttons button')
    this.slideButtons.forEach(e => e.addEventListener('click', () => this[e.dataset.dir]()));
    
    this.selectedSlide  = 1;
  }

  left = () => {
    this.slides[this.selectedSlide].deselect('left');

    this.selectedSlide <= 1 ? this.selectedSlide = this.slideQuantity : this.selectedSlide--;
    
    this.slides[this.selectedSlide].select('right');
  }

  right = () => {
    this.slides[this.selectedSlide].deselect('right');

    this.selectedSlide >= this.slideQuantity ? this.selectedSlide = 1 : this.selectedSlide++;

    this.slides[this.selectedSlide].select('left');
  }
}

class Slide {
  constructor (element) {
    this.element = element;
    this.slideIndex = parseInt(this.element.dataset.slide);
  }

  select = (dir) => {
    this.element.classList.add('slide-selected');
    TweenMax.set(this.element, {
      className: '-=slide-hidden',
    });
    TweenMax.fromTo(this.element, 0.6, {
      [dir]: '200%'
    }, {
      [dir]: '0%',
      ease: Elastic.easeOut.config(0.3, 0.4),
      onComplete: () => {
        this.element.style.cssText = '';
      }
    });
  }

  deselect = (dir) => {
    this.element.classList.remove('slide-selected');
    TweenMax.to(this.element, 0.5, {
      [dir]: '200%',
      ease: Power4.easeOut,
      onComplete: () => {
        this.element.style.cssText = '';
        this.element.classList.add('slide-hidden');
      }
    });
  }
}

console.log(new Carousel(document.body.querySelector('section.carousel')));