
// Theme Management System
export class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = ['light', 'dark'];
        this.storageKey = 'bitcoin-journey-theme';
        
        this.themeToggle = null;
        this.mediaQuery = null;
    }
    
    async init() {
        // Get saved theme or detect system preference
        this.currentTheme = this.getSavedTheme() || this.getSystemTheme();
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Set up theme toggle button
        this.setupThemeToggle();
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
        
        console.log(`Theme initialized: ${this.currentTheme}`);
    }
    
    getSavedTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        } catch (error) {
            console.warn('Could not access localStorage for theme:', error);
            return null;
        }
    }
    
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    applyTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Unknown theme: ${theme}. Falling back to light.`);
            theme = 'light';
        }
        
        // Update document attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        this.updateThemeToggleIcon(theme);
        
        // Save to localStorage
        this.saveTheme(theme);
        
        // Update current theme
        this.currentTheme = theme;
        
        // Emit theme change event
        this.emit('theme:changed', theme);
    }
    
    saveTheme(theme) {
        try {
            localStorage.setItem(this.storageKey, theme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }
    
    setupThemeToggle() {
        this.themeToggle = document.getElementById('theme-toggle');
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggle();
            });
            
            // Set initial icon
            this.updateThemeToggleIcon(this.currentTheme);
        }
    }
    
    updateThemeToggleIcon(theme) {
        if (!this.themeToggle) return;
        
        const icon = this.themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Update aria-label
        this.themeToggle.setAttribute('aria-label', 
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
    
    setupSystemThemeListener() {
        if (window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            this.mediaQuery.addEventListener('change', (e) => {
                // Only apply system theme if user hasn't manually set a preference
                if (!this.getSavedTheme()) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                }
            });
        }
    }
    
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Add a subtle animation to indicate the change
        this.animateThemeChange();
    }
    
    animateThemeChange() {
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }
    
    setTheme(theme) {
        if (this.themes.includes(theme)) {
            this.applyTheme(theme);
            return true;
        }
        return false;
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getAvailableThemes() {
        return [...this.themes];
    }
    
    isDarkMode() {
        return this.currentTheme === 'dark';
    }
    
    isLightMode() {
        return this.currentTheme === 'light';
    }
    
    emit(event, data) {
        if (window.app && window.app.eventBus) {
            window.app.eventBus.emit(event, data);
        }
    }
    
    destroy() {
        if (this.themeToggle) {
            this.themeToggle.removeEventListener('click', this.toggle);
        }
        
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.setupSystemThemeListener);
        }
    }
}
