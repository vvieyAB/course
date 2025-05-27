
/**
 * Simple State Management System
 * Provides reactive state management without external dependencies
 */

class StateManager {
  constructor() {
    this.state = {};
    this.subscribers = {};
  }

  // Set state value and notify subscribers
  setState(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    
    if (this.subscribers[key] && oldValue !== value) {
      this.subscribers[key].forEach(callback => callback(value, oldValue));
    }
  }

  // Get state value
  getState(key) {
    return this.state[key];
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.subscribers[key].indexOf(callback);
      if (index > -1) {
        this.subscribers[key].splice(index, 1);
      }
    };
  }

  // Update multiple state values at once
  updateState(updates) {
    Object.entries(updates).forEach(([key, value]) => {
      this.setState(key, value);
    });
  }

  // Reset state
  resetState() {
    this.state = {};
    Object.keys(this.subscribers).forEach(key => {
      this.subscribers[key].forEach(callback => callback(undefined));
    });
  }
}

// Global state instance
const appState = new StateManager();

// Initialize default state
appState.updateState({
  currentPage: 'home',
  user: null,
  theme: localStorage.getItem('theme') || 'light',
  progress: {
    currentRealm: 1,
    completedMissions: [],
    totalScore: 0
  },
  loading: false,
  error: null
});

// Export for use in other modules
window.AppState = appState;

export default appState;
