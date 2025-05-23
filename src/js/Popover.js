export default class Popover {
    constructor(element) {
      this.element = element;
      this.popover = null;
      this.title = element.getAttribute('data-popover-title');
      this.content = element.getAttribute('data-popover-content');
      this.isVisible = false;
      
      this.init();
    }
    
    init() {
      this.popover = document.createElement('div');
      this.popover.className = 'popover';
      
      const header = document.createElement('div');
      header.className = 'popover-header';
      header.textContent = this.title;
      
      const body = document.createElement('div');
      body.className = 'popover-body';
      body.textContent = this.content;
      
      const arrow = document.createElement('div');
      arrow.className = 'popover-arrow';
      
      this.popover.appendChild(header);
      this.popover.appendChild(body);
      this.popover.appendChild(arrow);
      
      document.body.appendChild(this.popover);
      
      this.element.addEventListener('click', (e) => this.toggle(e));
      document.addEventListener('click', (e) => this.handleDocumentClick(e));
    }
    
    toggle(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isVisible ? this.hide() : this.show();
    }
    
    show() {
      if (this.isVisible) return;
      
      this.popover.style.display = 'block';
  
      const rect = this.element.getBoundingClientRect();
      const popoverHeight = this.popover.offsetHeight;
      
      this.popover.style.top = `${window.scrollY + rect.top - popoverHeight - 5}px`;
      this.popover.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
      
      this.isVisible = true;
    }
    
    hide() {
      if (!this.isVisible) return;
      this.popover.style.display = 'none';
      this.isVisible = false;
    }
    
    handleDocumentClick(event) {
      if (this.isVisible && 
          !this.element.contains(event.target) && 
          !this.popover.contains(event.target)) {
        this.hide();
      }
    }
    
    destroy() {
      this.element.removeEventListener('click', this.toggle);
      document.removeEventListener('click', this.handleDocumentClick);
      if (this.popover.parentNode) {
        document.body.removeChild(this.popover);
      }
    }
  }