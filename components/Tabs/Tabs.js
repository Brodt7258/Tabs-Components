class Tabs {
  constructor (element) {
    this.element = element;

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

    this.selectedTab = 0;
  }

  select = (e) => {
    console.log(e.target.dataset.tab);
    const link = this.tabLinks[e.target.dataset.tab];
    console.log(link);
    this.selectedTab = link.tabIndex;

    const content = this.tabItems[link.tabIndex];
    console.log(content);
    console.log(this.selectedTab);
  }
}

class TabLink {
  constructor(element) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    // Get the custom data attribute on the Link
    this.data = element.dataset;
    this.tabIndex = this.data.tab;
    // Using the custom data attribute get the associated Item element
    //this.itemElement = document.body.querySelector(`div.tabs-item[data-tab='${this.data.tab}']`);
    // Using the Item element, create a new instance of the TabItem class
    //this.tabItem = new TabItem(this.itemElement);
    //this.tabItem = tabItem;
    // Add a click event listener on this instance, calling the select method on click
    //this.element.addEventListener('click', () => this.select());
  };

  select = () => {
    // Get all of the elements with the tabs-link class
    // const links;
    const links = document.body.querySelectorAll('.tabs-link');
    // Using a loop or the forEach method remove the 'tabs-link-selected' class from all of the links
    // Array.from(links).forEach();
    links.forEach(e => e.classList.remove('tabs-link-selected'));
    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add('tabs-link-selected');
    // Call the select method on the item associated with this link
    this.tabItem.select();
  }
}

class TabItem {
  constructor(element) {
    // Assign this.element to the passed in element
    this.element = element;
    this.tabIndex = this.element.dataset.tab;
  }

  select() {
    // Select all ".tabs-item" elements from the DOM
    const items = this.element.parentNode.querySelectorAll('.tabs-item');
    // Remove the class "tabs-item-selected" from each element
    items.forEach(e => e.classList.remove('tabs-item-selected'));
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add('tabs-item-selected');
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/

new Tabs(document.querySelector('.tabs'));