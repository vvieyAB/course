
/**
 * Reusable UI Components
 * Pure JavaScript components for common UI elements
 */

import { DOM, Animation } from './utils.js';
import appState from './state.js';

// Base Component class
class Component {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...this.defaultOptions, ...options };
    this.init();
  }

  get defaultOptions() {
    return {};
  }

  init() {
    // Override in subclasses
  }

  destroy() {
    // Override in subclasses
  }
}

// Modal Component
export class Modal extends Component {
  get defaultOptions() {
    return {
      closeOnOverlay: true,
      closeOnEscape: true,
      showCloseButton: true
    };
  }

  init() {
    this.overlay = DOM.create('div', { className: 'modal-overlay' });
    this.content = DOM.create('div', { className: 'modal-content' });
    
    if (this.options.showCloseButton) {
      this.closeBtn = DOM.create('button', { 
        className: 'btn btn-secondary modal-close',
        'aria-label': 'Close modal'
      }, '×');
      this.content.appendChild(this.closeBtn);
    }

    this.content.appendChild(this.element);
    this.overlay.appendChild(this.content);
    document.body.appendChild(this.overlay);

    this.bindEvents();
  }

  bindEvents() {
    if (this.options.closeOnOverlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    if (this.options.closeOnEscape) {
      this.escapeHandler = (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };
      document.addEventListener('keydown', this.escapeHandler);
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
  }

  open() {
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.previousFocus = document.activeElement;
    this.content.focus();
  }

  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }

    setTimeout(() => {
      this.destroy();
    }, 300);
  }

  destroy() {
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    DOM.remove(this.overlay);
  }
}

// Toast Notification Component
export class Toast {
  constructor(message, type = 'info', duration = 5000) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.init();
  }

  init() {
    this.element = DOM.create('div', {
      className: `toast toast-${this.type}`,
      role: 'alert',
      'aria-live': 'polite'
    }, `
      <span class="toast-message">${this.message}</span>
      <button class="toast-close" aria-label="Close notification">×</button>
    `);

    this.container = DOM.$('.toast-container') || this.createContainer();
    this.container.appendChild(this.element);

    this.bindEvents();
    this.show();
  }

  createContainer() {
    const container = DOM.create('div', { className: 'toast-container' });
    document.body.appendChild(container);
    return container;
  }

  bindEvents() {
    const closeBtn = DOM.$('.toast-close', this.element);
    closeBtn.addEventListener('click', () => this.close());

    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration);
    }
  }

  show() {
    Animation.slideUp(this.element);
  }

  close() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    Animation.fadeOut(this.element, 200);
    setTimeout(() => {
      DOM.remove(this.element);
    }, 200);
  }
}

// Tabs Component
export class Tabs extends Component {
  init() {
    this.tabList = DOM.$('[role="tablist"]', this.element);
    this.tabs = DOM.$$('[role="tab"]', this.element);
    this.panels = DOM.$$('[role="tabpanel"]', this.element);
    
    this.bindEvents();
    this.activateTab(0);
  }

  bindEvents() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.activateTab(index);
      });

      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const direction = e.key === 'ArrowLeft' ? -1 : 1;
          const nextIndex = (index + direction + this.tabs.length) % this.tabs.length;
          this.activateTab(nextIndex);
          this.tabs[nextIndex].focus();
        }
      });
    });
  }

  activateTab(index) {
    this.tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', isActive);
      tab.classList.toggle('active', isActive);
    });

    this.panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.hidden = !isActive;
      panel.classList.toggle('active', isActive);
    });
  }
}

// Progress Bar Component
export class ProgressBar extends Component {
  get defaultOptions() {
    return {
      value: 0,
      max: 100,
      animated: true
    };
  }

  init() {
    this.bar = DOM.$('.progress-fill', this.element);
    this.element.setAttribute('role', 'progressbar');
    this.update(this.options.value);
  }

  update(value) {
    this.value = Math.max(0, Math.min(value, this.options.max));
    const percentage = (this.value / this.options.max) * 100;
    
    this.element.setAttribute('aria-valuenow', this.value);
    this.element.setAttribute('aria-valuemax', this.options.max);
    
    if (this.options.animated) {
      this.bar.style.transition = 'width 0.3s ease';
    }
    
    this.bar.style.width = `${percentage}%`;
  }

  setValue(value) {
    this.update(value);
  }

  increment(amount = 1) {
    this.update(this.value + amount);
  }
}

// Accordion Component
export class Accordion extends Component {
  init() {
    this.items = DOM.$$('.accordion-item', this.element);
    this.bindEvents();
  }

  bindEvents() {
    this.items.forEach(item => {
      const button = DOM.$('.accordion-button', item);
      const content = DOM.$('.accordion-content', item);
      
      button.addEventListener('click', () => {
        this.toggleItem(item);
      });

      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleItem(item);
        }
      });
    });
  }

  toggleItem(item) {
    const button = DOM.$('.accordion-button', item);
    const content = DOM.$('.accordion-content', item);
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Close other items if single-select
    if (!isExpanded && this.options.single) {
      this.items.forEach(otherItem => {
        if (otherItem !== item) {
          this.closeItem(otherItem);
        }
      });
    }
    
    if (isExpanded) {
      this.closeItem(item);
    } else {
      this.openItem(item);
    }
  }

  openItem(item) {
    const button = DOM.$('.accordion-button', item);
    const content = DOM.$('.accordion-content', item);
    
    button.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
    item.classList.add('active');
  }

  closeItem(item) {
    const button = DOM.$('.accordion-button', item);
    const content = DOM.$('.accordion-content', item);
    
    button.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '';
    item.classList.remove('active');
  }
}

// Quiz Component
export class Quiz extends Component {
  get defaultOptions() {
    return {
      showProgress: true,
      allowRetry: true,
      shuffleQuestions: false
    };
  }

  init() {
    this.questions = this.options.questions || [];
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    
    if (this.options.shuffleQuestions) {
      this.shuffleArray(this.questions);
    }
    
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="quiz-container">
        ${this.options.showProgress ? this.renderProgress() : ''}
        <div class="quiz-content">
          ${this.renderQuestion()}
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderProgress() {
    const progress = ((this.currentQuestion / this.questions.length) * 100);
    return `
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <span class="progress-text">${this.currentQuestion + 1} of ${this.questions.length}</span>
      </div>
    `;
  }

  renderQuestion() {
    const question = this.questions[this.currentQuestion];
    if (!question) return this.renderResults();
    
    return `
      <div class="quiz-question">
        <h3>${question.question}</h3>
        <div class="quiz-options">
          ${question.options.map((option, index) => `
            <label class="quiz-option">
              <input type="radio" name="answer" value="${index}">
              <span>${option}</span>
            </label>
          `).join('')}
        </div>
        <div class="quiz-actions">
          <button class="btn btn-primary quiz-submit" disabled>Submit Answer</button>
        </div>
      </div>
    `;
  }

  renderResults() {
    const percentage = Math.round((this.score / this.questions.length) * 100);
    return `
      <div class="quiz-results">
        <h3>Quiz Complete!</h3>
        <div class="score">
          <span class="score-number">${this.score}</span>
          <span class="score-total">/ ${this.questions.length}</span>
          <span class="score-percentage">(${percentage}%)</span>
        </div>
        ${this.options.allowRetry ? `
          <button class="btn btn-secondary quiz-retry">Try Again</button>
        ` : ''}
      </div>
    `;
  }

  bindEvents() {
    const submitBtn = DOM.$('.quiz-submit', this.element);
    const options = DOM.$$('input[name="answer"]', this.element);
    const retryBtn = DOM.$('.quiz-retry', this.element);
    
    if (options.length) {
      options.forEach(option => {
        option.addEventListener('change', () => {
          submitBtn.disabled = false;
        });
      });
    }
    
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.submitAnswer());
    }
    
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.restart());
    }
  }

  submitAnswer() {
    const selected = DOM.$('input[name="answer"]:checked', this.element);
    if (!selected) return;
    
    const answerIndex = parseInt(selected.value);
    const question = this.questions[this.currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    this.answers.push({
      questionIndex: this.currentQuestion,
      answer: answerIndex,
      correct: isCorrect
    });
    
    if (isCorrect) {
      this.score++;
    }
    
    this.currentQuestion++;
    
    setTimeout(() => {
      this.render();
    }, 500);
  }

  restart() {
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.render();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

// Initialize components on DOM ready
function initComponents() {
  // Auto-initialize components with data attributes
  DOM.$$('[data-component="modal"]').forEach(el => new Modal(el));
  DOM.$$('[data-component="tabs"]').forEach(el => new Tabs(el));
  DOM.$$('[data-component="accordion"]').forEach(el => new Accordion(el));
  DOM.$$('[data-component="progress"]').forEach(el => new ProgressBar(el));
}

// Export component classes and initialization
export {
  Component,
  Modal,
  Toast,
  Tabs,
  ProgressBar,
  Accordion,
  Quiz,
  initComponents
};

export default {
  Modal,
  Toast,
  Tabs,
  ProgressBar,
  Accordion,
  Quiz,
  initComponents
};
