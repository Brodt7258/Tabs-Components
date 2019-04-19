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
    this.slides[this.selectedSlide].deselect();

    this.selectedSlide <= 1 ? this.selectedSlide = this.slideQuantity : this.selectedSlide--;
    
    this.slides[this.selectedSlide].select();
  }

  right = () => {
    this.slides[this.selectedSlide].deselect();

    this.selectedSlide >= this.slideQuantity ? this.selectedSlide = 1 : this.selectedSlide++;

    this.slides[this.selectedSlide].select();
  }
}

class Slide {
  constructor (element) {
    this.element = element;
    this.slideIndex = parseInt(this.element.dataset.slide);
  }

  select = () => {
    this.element.classList.add('slide-selected');
    this.element.classList.remove('slide-hidden');
  }

  deselect = () => {
    this.element.classList.add('slide-hidden');
    this.element.classList.remove('slide-selected');
  }
}

console.log(new Carousel(document.body.querySelector('section.carousel')));