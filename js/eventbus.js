
// Event Bus for Component Communication
export class EventBus {
    constructor() {
        this.events = new Map();
        this.maxListeners = 100;
    }
    
    on(event, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const listeners = this.events.get(event);
        
        // Check max listeners
        if (listeners.length >= this.maxListeners) {
            console.warn(`Maximum listeners (${this.maxListeners}) exceeded for event: ${event}`);
        }
        
        listeners.push(callback);
        
        // Return unsubscribe function
        return () => this.off(event, callback);
    }
    
    once(event, callback) {
        const unsubscribe = this.on(event, (...args) => {
            unsubscribe();
            callback(...args);
        });
        return unsubscribe;
    }
    
    off(event, callback) {
        if (!this.events.has(event)) {
            return false;
        }
        
        const listeners = this.events.get(event);
        const index = listeners.indexOf(callback);
        
        if (index !== -1) {
            listeners.splice(index, 1);
            
            // Clean up empty event arrays
            if (listeners.length === 0) {
                this.events.delete(event);
            }
            
            return true;
        }
        
        return false;
    }
    
    emit(event, ...args) {
        if (!this.events.has(event)) {
            return false;
        }
        
        const listeners = this.events.get(event).slice(); // Copy to avoid modification during iteration
        
        for (const callback of listeners) {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in event listener for "${event}":`, error);
            }
        }
        
        return true;
    }
    
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
    
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }
    
    eventNames() {
        return Array.from(this.events.keys());
    }
    
    setMaxListeners(n) {
        this.maxListeners = n;
    }
    
    getMaxListeners() {
        return this.maxListeners;
    }
}
