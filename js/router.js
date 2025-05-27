/**
 * Client-side Router
 * Handles navigation and page rendering
 */

import eventBus from './eventbus.js';

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.currentPage = null;
        this.container = null;

        this.init();
    }

    init() {
        this.container = document.getElementById('app');
        this.setupEventListeners();
        this.handleRoute();
    }

    setupEventListeners() {
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle initial load
        window.addEventListener('load', () => {
            this.handleRoute();
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigate(href);
            }
        });

        // Listen for programmatic navigation
        eventBus.on('navigate', (route) => {
            this.navigate(route);
        });
    }

    register(path, pageClass) {
        this.routes.set(path, pageClass);
    }

    navigate(path) {
        if (path.startsWith('#')) {
            path = path.substring(1);
        }

        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        window.location.hash = path;
    }

    async handleRoute() {
        let path = window.location.hash.substring(1) || '/';

        // Clean up path
        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        // Remove trailing slash except for root
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        console.log('Routing to:', path);

        // Update navigation active state
        this.updateNavigation(path);

        // Find matching route
        const routeInfo = this.matchRoute(path);

        if (routeInfo) {
            await this.loadPage(routeInfo.pageClass, routeInfo.params);
        } else {
            await this.loadNotFound();
        }

        // Update current route
        this.currentRoute = path;

        // Emit route change event
        eventBus.emit('route-changed', { path, params: routeInfo?.params });
    }

    matchRoute(path) {
        // Direct match first
        if (this.routes.has(path)) {
            return { pageClass: this.routes.get(path), params: {} };
        }

        // Pattern matching for dynamic routes
        for (const [pattern, pageClass] of this.routes) {
            const params = this.matchPattern(pattern, path);
            if (params !== null) {
                return { pageClass, params };
            }
        }

        return null;
    }

    matchPattern(pattern, path) {
        // Convert pattern to regex
        const paramNames = [];
        const regexPattern = pattern.replace(/:([^/]+)/g, (match, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexPattern}$`);
        const match = path.match(regex);

        if (match) {
            const params = {};
            paramNames.forEach((name, index) => {
                params[name] = match[index + 1];
            });
            return params;
        }

        return null;
    }

    async loadPage(PageClass, params = {}) {
        try {
            // Show loading if page takes time to load
            this.showLoading();

            // Cleanup current page
            if (this.currentPage && typeof this.currentPage.unmount === 'function') {
                this.currentPage.unmount();
            }

            // Clear container
            this.container.innerHTML = '';

            // Create new page instance
            this.currentPage = new PageClass(this.container);

            // Pass params to page if it accepts them
            if (typeof this.currentPage.setParams === 'function') {
                this.currentPage.setParams(params);
            }

            // Hide loading
            this.hideLoading();

            // Scroll to top
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Error loading page:', error);
            this.loadError(error);
        }
    }

    async loadNotFound() {
        this.container.innerHTML = `
            <div class="not-found-page">
                <div class="not-found-content">
                    <h1>🤔 Oops! Path Not Found</h1>
                    <p>The realm you're looking for doesn't exist in Asha's journey.</p>
                    <div class="not-found-actions">
                        <button class="btn btn-primary" onclick="window.location.hash = '#/'">
                            Return Home
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.hash = '#/realms'">
                            Explore Realms
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async loadError(error) {
        this.container.innerHTML = `
            <div class="error-page">
                <div class="error-content">
                    <h1>⚠️ Something Went Wrong</h1>
                    <p>We encountered an error while loading this page.</p>
                    <details>
                        <summary>Error Details</summary>
                        <pre>${error.message}</pre>
                    </details>
                    <div class="error-actions">
                        <button class="btn btn-primary" onclick="window.location.reload()">
                            Try Again
                        </button>
                        <button class="btn btn-secondary" onclick="window.location.hash = '#/'">
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showLoading() {
        const loadingElement = document.getElementById('loading-screen');
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingElement = document.getElementById('loading-screen');
        if (loadingElement) {
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 100);
        }
    }

    updateNavigation(currentPath) {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href) {
                const linkPath = href.substring(1) || '/';

                // Exact match or parent path match
                if (linkPath === currentPath || 
                    (linkPath !== '/' && currentPath.startsWith(linkPath))) {
                    link.classList.add('active');
                }
            }
        });
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    getCurrentPage() {
        return this.currentPage;
    }
}

// Create and export router instance
const router = new Router();

export default router;