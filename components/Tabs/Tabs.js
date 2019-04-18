class Tabs {
  constructor (element) {
    this.element = element;

    //Instaniate TabItems and TabLinks, place each instance onto an object to easily reference later.
    this.tabItems = [...this.element.querySelectorAll('.tabs-items .tabs-item')]
        .reduce((obj, e) => {
          obj[e.dataset.tab] = new TabItem(e);
          return obj;
        }, {});
    console.log(this.tabItems);

    this.tabLinks = [...this.element.querySelectorAll('.tabs-links .tabs-link')]
      .reduce((obj, e) => {
        obj[e.dataset.tab] = new TabLink(e);
        return obj;
      }, {});
    console.log(this.tabLinks);

    Object.values(this.tabLinks).forEach(e => e.element.addEventListener('click', this.select));

    this.selectedTab = 1;
  }

  select = (e) => {
    const link = this.tabLinks[e.target.dataset.tab],
          content = this.tabItems[link.tabIndex];

    const oldLink = this.tabLinks[this.selectedTab],
          oldContent = this.tabItems[this.selectedTab];

    if (link.tabIndex === this.selectedTab) return; // Guard clause.  Do nothing if already on the selected tab
    
    const transitionDirection = getDir(oldContent, content);

    oldLink.deselect(); // Deselect the previous choice
    oldContent.deselect(transitionDirection);

    link.select();    // Select the new choice
    content.select(transitionDirection);

    this.selectedTab = link.tabIndex; // Update the current choice
  }
}

class TabLink {
  constructor(element) {
    this.element = element;
    this.tabIndex = parseInt(this.element.dataset.tab);
  };

  select = () => {
    this.element.classList.add('tabs-link-selected');
  }

  deselect () {
    this.element.classList.remove('tabs-link-selected');
  }
}

class TabItem {
  constructor(element) {
    this.element = element;
    this.tabIndex = parseInt(this.element.dataset.tab);
  }

  select(dir) {
    TweenMax.set(this.element, {
      className: '-=tabs-item-hidden'
    });
    TweenMax.fromTo(this.element, 0.65,{
      [dir]: '100%'
    }, {
      className: '+=tabs-item-selected',
      [dir]: '12.5%',  //`${(100 - ((this.element.offsetWidth / this.element.parentNode.offsetWidth) * 100)) / 2}%`
                      // If for some reason I didn't know its width in percent ahead of time?  Probably not needed too often.
      onComplete: () => { this.element.style.cssText = ''; }
    });
                 
  }

  deselect = (dir) => {
    TweenMax.to(this.element, 0.65, { 
      className: '-=tabs-item-selected',
      [dir]: '-100%',
      onComplete: () => {
        this.element.classList.add('tabs-item-hidden');
        this.element.style.cssText = '';
      }
    });
  }
}

new Tabs(document.querySelector('.tabs'));

const getDir = (start, end) => start.tabIndex < end.tabIndex ? 'left' : 'right' ;