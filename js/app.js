
// Main Application Entry Point
import { Router } from './router.js';
import { ThemeManager } from './theme.js';
import { NavigationManager } from './navigation.js';
import { ModalManager } from './modal.js';
import { ToastManager } from './toast.js';
import { SimulationManager } from './simulations.js';
import { ProgressManager } from './progress.js';
import { EventBus } from './eventbus.js';

class App {
    constructor() {
        this.eventBus = new EventBus();
        this.router = new Router();
        this.theme = new ThemeManager();
        this.navigation = new NavigationManager();
        this.modal = new ModalManager();
        this.toast = new ToastManager();
        this.simulation = new SimulationManager();
        this.progress = new ProgressManager();
        
        this.initialized = false;
    }
    
    async init() {
        if (this.initialized) return;
        
        try {
            console.log('Initializing Bitcoin Learning Journey...');
            
            // Initialize core systems
            await this.initializeCore();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize router and load initial route
            await this.router.init();
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            this.initialized = true;
            console.log('Application initialized successfully');
            
            // Emit ready event
            this.eventBus.emit('app:ready');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to load application. Please refresh the page.');
        }
    }
    
    async initializeCore() {
        // Initialize theme system
        await this.theme.init();
        
        // Initialize navigation
        await this.navigation.init();
        
        // Initialize modal system
        await this.modal.init();
        
        // Initialize toast notifications
        await this.toast.init();
        
        // Initialize simulation engine
        await this.simulation.init();
        
        // Initialize progress tracking
        await this.progress.init();
    }
    
    setupEventListeners() {
        // Handle navigation events
        this.eventBus.on('navigate', (data) => {
            this.router.navigate(data.route, data.params);
        });
        
        // Handle theme changes
        this.eventBus.on('theme:changed', (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
        });
        
        // Handle progress updates
        this.eventBus.on('progress:updated', (data) => {
            this.progress.updateProgress(data);
        });
        
        // Handle simulation events
        this.eventBus.on('simulation:completed', (data) => {
            this.progress.markSimulationComplete(data.simulationId);
            this.toast.show('Simulation completed!', 'success');
        });
        
        // Handle errors
        this.eventBus.on('error', (error) => {
            console.error('Application error:', error);
            this.toast.show(error.message || 'An error occurred', 'error');
        });
        
        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Focus management
        document.addEventListener('focusin', this.handleFocusIn.bind(this));
    }
    
    handleResize() {
        // Update layout calculations
        this.eventBus.emit('window:resize', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
    
    handleBeforeUnload(event) {
        // Save progress before leaving
        this.progress.save();
        
        // Check if there are unsaved changes
        if (this.hasUnsavedChanges()) {
            event.preventDefault();
            event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            return event.returnValue;
        }
    }
    
    handleKeydown(event) {
        // Global keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'k':
                    event.preventDefault();
                    this.openCommandPalette();
                    break;
                case '/':
                    event.preventDefault();
                    this.focusSearch();
                    break;
            }
        }
        
        // Escape key handling
        if (event.key === 'Escape') {
            this.modal.closeAll();
        }
    }
    
    handleFocusIn(event) {
        // Update focus ring for keyboard navigation
        if (event.target.matches('button, a, input, textarea, select')) {
            event.target.setAttribute('data-focus-visible', 'true');
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.setAttribute('aria-hidden', 'true');
            }, 300);
        }
    }
    
    showError(message) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">⚠️</div>
                    <h1>Oops! Something went wrong</h1>
                    <p>${message}</p>
                    <button onclick="window.location.reload()" class="btn btn-primary">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
    
    hasUnsavedChanges() {
        // Check if any simulations have unsaved progress
        return this.simulation.hasUnsavedChanges();
    }
    
    openCommandPalette() {
        // Future feature: command palette for quick navigation
        this.toast.show('Command palette coming soon!', 'info');
    }
    
    focusSearch() {
        // Future feature: focus search input
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Public API methods
    navigate(route, params = {}) {
        return this.router.navigate(route, params);
    }
    
    showToast(message, type = 'info') {
        return this.toast.show(message, type);
    }
    
    showModal(content, options = {}) {
        return this.modal.show(content, options);
    }
    
    getProgress() {
        return this.progress.getAll();
    }
    
    // Cleanup method
    destroy() {
        this.eventBus.removeAllListeners();
        this.router.destroy();
        this.theme.destroy();
        this.navigation.destroy();
        this.modal.destroy();
        this.toast.destroy();
        this.simulation.destroy();
        this.progress.destroy();
        
        this.initialized = false;
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    window.app.init();
});

// Handle module loading errors
window.addEventListener('error', (event) => {
    if (event.error && event.error.message.includes('Failed to fetch')) {
        console.error('Module loading error:', event.error);
        document.body.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
                <h1>Module Loading Error</h1>
                <p>Failed to load application modules. Please check your internet connection and refresh the page.</p>
                <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; font-size: 16px;">
                    Refresh Page
                </button>
            </div>
        `;
    }
});

// Export for debugging
window.addEventListener('load', () => {
    if (window.app) {
        console.log('Bitcoin Learning Journey loaded successfully');
        console.log('Available in window.app for debugging');
    }
});
