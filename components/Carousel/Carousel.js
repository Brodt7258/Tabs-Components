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
      .forEach(e => e.addEventListener('click', this[e.dataset.dir]));
    
    this.selectedSlide  = 1;

    this.sildeProgress = new SildeProgress(
      this.element.querySelector('ul.slide-progress'),
      Object.keys(this.slides),
      this.selectedSlide,
      this.goTo
    );
  }

  // So, these two methods are awful and should be rolled into a single, less-redundant method.
  // They felt clever when I initially wrote them. Then they grew. Now they're almost identical.
  left = () => {
    this.slides[this.selectedSlide].deselect('left');
    this.sildeProgress.progressTiles[this.selectedSlide].deselect();

    this.selectedSlide <= 1 ? this.selectedSlide = this.slideQuantity : this.selectedSlide--;
    this.slides[this.selectedSlide].select('right');

    this.sildeProgress.progressTiles[this.selectedSlide].select();
    this.sildeProgress.progressTracker.slide(this.sildeProgress.progressTiles[this.selectedSlide].element);
  }

  right = () => {
    this.slides[this.selectedSlide].deselect('right');
    this.sildeProgress.progressTiles[this.selectedSlide].deselect();

    this.selectedSlide >= this.slideQuantity ? this.selectedSlide = 1 : this.selectedSlide++;
    this.slides[this.selectedSlide].select('left');

    this.sildeProgress.progressTiles[this.selectedSlide].select();
    this.sildeProgress.progressTracker.slide(this.sildeProgress.progressTiles[this.selectedSlide].element);
  }

  goTo = (e) => {
    const dirs = e < this.selectedSlide ? ['left', 'right'] : ['right', 'left'];

    this.slides[this.selectedSlide].deselect(dirs[0]);
    this.sildeProgress.progressTiles[this.selectedSlide].deselect();

    this.selectedSlide = e;

    this.slides[this.selectedSlide].select(dirs[1]);
    this.sildeProgress.progressTiles[this.selectedSlide].select();

    this.sildeProgress.progressTracker.slide(this.sildeProgress.progressTiles[this.selectedSlide].element);
  }
}

class SildeProgress {
  constructor (element, slides, selected, onClick) {
    this.element = element;
    this.element.innerHTML = slides.map((e) => `<li class="progress-tile" data-slide=${e}></li>`).join('');

    this.progressTiles = [...this.element.querySelectorAll('li.progress-tile')]
      .reduce((obj, e) => {
        obj[e.dataset.slide] = new ProgressTile(e);
        return obj;
      }, {})
    Object.values(this.progressTiles)
      .forEach(e => e.element.addEventListener('click', () => onClick(e.element.dataset.slide)));
    
    const tracker = document.createElement('div');
    tracker.classList.add('progress-tracker');
    this.element.appendChild(tracker);
    this.progressTracker = new ProgressTracker(tracker, this.progressTiles[selected].element);
  }
}

class ProgressTracker { // Almost exactly TabLinkBacker in Tabs.js.  Refer to comments there.
  constructor (element, { offsetWidth, offsetHeight, offsetLeft, offsetTop }) {
    this.element = element;

    this.width = offsetWidth;
    this.height = offsetHeight;
    this.xPos = offsetLeft;
    this.yPos = offsetTop;

    this.element.style.cssText = `
      width: ${this.width}px;
      height: ${this.height + 1}px;
      left: ${this.xPos}px;
      top: ${this.yPos - 1}px
    `;
  }

  slide = ({ offsetWidth, offsetHeight, offsetLeft, offsetTop }) => {
    this.width = offsetWidth;
    this.height = offsetHeight;
    this.xPos = offsetLeft;
    this.yPos = offsetTop;

    TweenMax.to(this.element, 0.4, {
      width: this.width,
      height: this.height + 1,
      left: this.xPos,
      top: this.yPos - 1,
      ease: Elastic.easeOut.config(0.5, 0.5)
    });
    TweenMax.to(this.element, 0.2, {
      borderRadius: '100%',
    });
    TweenMax.to(this.element, 0.2, {
      borderRadius: '1rem',
      delay: 0.2
    });
  }
}

class ProgressTile { // Basically TabLink.  Atrophied down to just toggling a css class.
  constructor (element) {
    this.element = element;
  }

  select = () => {
    this.element.classList.add('progress-tile-selected');
  }

  deselect () {
    this.element.classList.remove('progress-tile-selected');
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
      ease: Power3.easeOut,
      onComplete: () => {
        this.element.style.cssText = '';
        this.element.classList.add('slide-hidden');
      }
    });
  }
}

new Carousel(document.body.querySelector('section.carousel'));

// So, this is (very nearly) spaghetti at this point. If you read all of it, I am so sorry.
// Looking forward to React, I know how much it helps organization as the app becomes more complex.
// I appreciate the work of css library authors far more after this project.