
/**
 * Utility Functions
 * Common helper functions used throughout the application
 */

// DOM manipulation utilities
export const DOM = {
  // Query selector with error handling
  $(selector, context = document) {
    const element = context.querySelector(selector);
    if (!element && process.env.NODE_ENV === 'development') {
      console.warn(`Element not found: ${selector}`);
    }
    return element;
  },

  // Query all with array return
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  // Create element with attributes and content
  create(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      element.innerHTML = content;
    }

    return element;
  },

  // Remove element safely
  remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  // Toggle class utility
  toggleClass(element, className, force) {
    if (!element) return;
    return element.classList.toggle(className, force);
  }
};

// Storage utilities
export const Storage = {
  // Local storage with JSON support
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage.set error:', error);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage.get error:', error);
      return defaultValue;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage.remove error:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage.clear error:', error);
      return false;
    }
  }
};

// Animation utilities
export const Animation = {
  // Fade in element
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  },

  // Fade out element
  fadeOut(element, duration = 300) {
    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      element.style.opacity = initialOpacity * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    requestAnimationFrame(animate);
  },

  // Slide up animation
  slideUp(element, duration = 300) {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      const translateY = 20 * (1 - progress);
      element.style.transform = `translateY(${translateY}px)`;
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }
};

// Form utilities
export const Form = {
  // Serialize form data to object
  serialize(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    return data;
  },

  // Validate form with custom rules
  validate(form, rules = {}) {
    const errors = {};
    const data = this.serialize(form);
    
    Object.entries(rules).forEach(([field, validators]) => {
      const value = data[field];
      
      validators.forEach(validator => {
        if (typeof validator === 'function') {
          const error = validator(value, data);
          if (error) {
            if (!errors[field]) errors[field] = [];
            errors[field].push(error);
          }
        }
      });
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      data
    };
  }
};

// Debounce utility
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format utilities
export const Format = {
  // Format date
  date(date, options = {}) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(new Date(date));
  },

  // Format number
  number(num, options = {}) {
    return new Intl.NumberFormat('en-US', options).format(num);
  },

  // Format currency
  currency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },

  // Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Truncate text
  truncate(str, length = 100, suffix = '...') {
    return str.length > length ? str.substring(0, length) + suffix : str;
  }
};

// URL utilities
export const URL = {
  // Parse query parameters
  parseQuery(search = window.location.search) {
    const params = new URLSearchParams(search);
    const result = {};
    for (let [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  },

  // Build query string
  buildQuery(params) {
    return new URLSearchParams(params).toString();
  },

  // Update URL without reload
  updateURL(path, state = {}) {
    window.history.pushState(state, '', path);
  }
};

// Device detection
export const Device = {
  isMobile: () => window.innerWidth < 768,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: () => window.innerWidth >= 1024,
  
  // Touch device detection
  isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

// Export all utilities
export default {
  DOM,
  Storage,
  Animation,
  Form,
  Format,
  URL,
  Device,
  debounce,
  throttle
};
