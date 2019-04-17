
class Dropdown {
  constructor(element) {
    
    this.element = element;
    
    this.button = this.element.querySelector('.dropdown-button');
    
    this.content = this.element.querySelector('.dropdown-content');
    this.content.addEventListener('mouseenter', () => clearTimeout(this.timer));  // If they're hovering in the menu, don't auto-close it on them.
    this.content.addEventListener('mouseleave', () => this.setupAutoClose(1000)); // If they move away from the menu, auto-close it shortly after.

    this.button.addEventListener('click', this.toggleContent);
    this.open = false;
    this.timer = {};
  }

  toggleContent = () => {
    if (!this.open) {
      this.animOpen();
      this.setupAutoClose(3500);
    } else {
      this.animClose();
      clearTimeout(this.timer);
    }
  }

  setupAutoClose(t) {
    this.timer = setTimeout(this.animClose, t);
  }

  animOpen = () => {
    TweenMax.set(this.content, { 
      height: "auto",
      display: 'flex'
    });
    TweenMax.from(this.content, 0.4, {
      height: 0,
    });
    this.open = true;
  }

  animClose = () => {
    TweenMax.to(this.content, 0.25, {
      height: 0,
      display: 'none',
    });
    this.open = false;
  }
}


// Nothing to do here, just study what the code is doing and move on to the Dropdown class
document.querySelectorAll('.dropdown').forEach(dropdown => new Dropdown(dropdown));