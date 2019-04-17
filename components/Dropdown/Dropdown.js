// class Dropdown {
//   constructor(element) {
    
//     // Assign this.element to the dropdown element
//     this.element = element;
    
//     // Get the element with the ".dropdown-button" class found in the dropdown element (look at the HTML for context)
//     this.button = this.element.querySelector('.dropdown-button');
    
//     // assign the reference to the ".dropdown-content" class found in the dropdown element
//     this.content = this.element.querySelector('.dropdown-content');
    
//     // Add a click handler to the button reference and call the toggleContent method.
//     this.button.addEventListener('click', () => this.toggleContent());
//   }

//   toggleContent() {
//     // Toggle the ".dropdown-hidden" class off and on
//     this.content.classList.toggle('dropdown-hidden');
//   }
// }


// // Nothing to do here, just study what the code is doing and move on to the Dropdown class
// document.querySelectorAll('.dropdown').forEach(dropdown => new Dropdown(dropdown));


class Dropdown {
  constructor(element) {
    
    // Assign this.element to the dropdown element
    this.element = element;
    
    // Get the element with the ".dropdown-button" class found in the dropdown element (look at the HTML for context)
    this.button = this.element.querySelector('.dropdown-button');
    
    // assign the reference to the ".dropdown-content" class found in the dropdown element
    this.content = this.element.querySelector('.dropdown-content');
    
    // Add a click handler to the button reference and call the toggleContent method.
    this.button.addEventListener('click', this.toggleContent());
  }

  toggleContent() {
    let open = false;

    return () => {
      if (open) {
        TweenMax.to(this.content, 0.25, {
          height: 0,
          display: 'none',
          onComplete: () => {
            this.content.style.cssText = '';
            this.content.classList.add('dropdown-hidden');
          }
        });
      } else {
        TweenMax.set(this.content, { height: "auto", display: 'flex' });
        TweenMax.from(this.content, 0.4, {
          height: 0,
          onComplete: () => {
            this.content.style.cssText = '';                  // There's probably no legitimate need for this?
            this.content.classList.remove('dropdown-hidden'); // I just feel better cleaning up GSAP's residule inline styles.
          }
        });
      }
      open = !open;
    };
  }
}


// Nothing to do here, just study what the code is doing and move on to the Dropdown class
document.querySelectorAll('.dropdown').forEach(dropdown => new Dropdown(dropdown));