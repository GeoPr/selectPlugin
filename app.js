"use strict";
const getSelectTemplate = (items, placeholder) => {
    return `
  <div class="select__body">
    <div
      class="select__current"
      id="current"
      data-type="current"
    >
      ${placeholder ? placeholder : 'default text instead placeholder'}
    </div>
    <div class="select__list">
      ${items.map((item, idx) => {
        return `
          <li 
            class="select__item"
            id="item"
            data-id="${idx + 1}"
          >
            ${item}
          </li>
        `;
    }).join('')}
    </div>
  </div>
  `;
};
class Select {
    constructor(el, options) {
        var _a;
        this.$el = document.querySelector(el);
        this.options = options;
        this.selectedId = (_a = options.selectedId) !== null && _a !== void 0 ? _a : null;
        this.render();
        this.currentEl = this.$el.querySelector('#current');
        this.itemsEls = this.$el.querySelectorAll('#item');
        this.setup();
    }
    render() {
        const { items, placeholder } = this.options;
        this.$el.innerHTML = getSelectTemplate(items, placeholder);
    }
    setup() {
        const clickHandler = this.clickHandler.bind(this);
        this.$el.classList.add('select');
        this.$el.addEventListener('click', clickHandler);
        this.setCurrentText();
        this.setSelectedItemActiveClass();
    }
    setCurrentText() {
        if (this.selectedId) {
            this.currentEl.textContent = this.getCurrentItem.textContent;
        }
    }
    clickHandler(e) {
        const { type } = e.target.dataset;
        if (type !== 'current')
            return;
        this.toggle();
        this.setupItems();
    }
    setupItems() {
        this.itemsEls.forEach(item => item.addEventListener('click', () => {
            this.removeActiveClasses();
            const id = item.getAttribute('data-id');
            item.classList.add('active');
            this.setSelectedId(id);
            this.setCurrentText();
            this.close();
        }));
    }
    get getCurrentItem() {
        return document.querySelector(`[data-id="${this.selectedId}"]`);
    }
    setSelectedId(id) {
        this.selectedId = id;
    }
    setSelectedItemActiveClass() {
        this.getCurrentItem.classList.add('active');
    }
    removeActiveClasses() {
        this.itemsEls.forEach(item => item.classList.remove('active'));
    }
    toggle() {
        this.$el.classList.toggle('active');
    }
    open() {
        this.$el.classList.add('active');
    }
    close() {
        this.$el.classList.remove('active');
    }
    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.remove();
    }
}
const select = new Select('#select', {
    items: ['React', 'Angular', 'Vue', 'Something', 'Hello world', 'Lalalala'],
});
