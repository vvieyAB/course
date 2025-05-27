/**
 * Offline Storage Service
 * 
 * This module provides functions for storing and retrieving data from IndexedDB
 * to support offline functionality for the Bitcoin Quest application.
 */

// Database name and version
const DB_NAME = 'bitcoin-quest-offline';
const DB_VERSION = 1;

// Store names
const STORE_USER_PROGRESS = 'user-progress';
const STORE_PENDING_UPDATES = 'pending-updates';
const STORE_CONTENT_CACHE = 'content-cache';

/**
 * Opens a connection to the IndexedDB database
 */
export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => {
      console.error('Error opening offline database');
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains(STORE_USER_PROGRESS)) {
        db.createObjectStore(STORE_USER_PROGRESS, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(STORE_PENDING_UPDATES)) {
        db.createObjectStore(STORE_PENDING_UPDATES, { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains(STORE_CONTENT_CACHE)) {
        db.createObjectStore(STORE_CONTENT_CACHE, { keyPath: 'key' });
      }
    };
  });
}

/**
 * Interface for user progress data
 */
export interface UserProgressData {
  id: string;
  userId: string;
  realmProgress: {
    realmId: number;
    completed: boolean;
    missionsCompleted: number[];
    lastUpdated: string;
  }[];
  missionProgress: {
    missionId: number;
    progress: number;
    completed: boolean;
    lastUpdated: string;
  }[];
}

/**
 * Interface for pending update requests
 */
export interface PendingUpdate {
  id?: number;
  url: string;
  method: string;
  data: any;
  timestamp: number;
}

/**
 * Interface for cached content data
 */
export interface ContentCache {
  key: string;
  data: any;
  timestamp: number;
}

/**
 * Saves user progress to IndexedDB
 */
export async function saveUserProgress(progress: UserProgressData): Promise<void> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_USER_PROGRESS, 'readwrite');
    const store = transaction.objectStore(STORE_USER_PROGRESS);
    
    const request = store.put(progress);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve();
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Gets user progress from IndexedDB
 */
export async function getUserProgress(userId: string): Promise<UserProgressData | null> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_USER_PROGRESS, 'readonly');
    const store = transaction.objectStore(STORE_USER_PROGRESS);
    
    const request = store.get(userId);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result || null);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Adds a pending update to be processed when online
 */
export async function addPendingUpdate(update: Omit<PendingUpdate, 'id'>): Promise<void> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PENDING_UPDATES, 'readwrite');
    const store = transaction.objectStore(STORE_PENDING_UPDATES);
    
    const request = store.add(update);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve();
      
      // If we're online, trigger a sync
      if (navigator.onLine && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then(registration => {
            // Use the background sync API if available
            if ('sync' in registration) {
              (registration as any).sync.register('sync-user-progress')
                .catch((err: Error) => console.error('Sync registration failed:', err));
            } else {
              // Manual sync fallback if background sync is not available
              console.log('Background Sync API not available, using manual sync');
              // We could implement manual sync here, but leaving it for now
            }
          });
      }
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Gets all pending updates
 */
export async function getPendingUpdates(): Promise<PendingUpdate[]> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PENDING_UPDATES, 'readonly');
    const store = transaction.objectStore(STORE_PENDING_UPDATES);
    
    const request = store.getAll();
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Saves content to the cache
 */
export async function cacheContent(key: string, data: any): Promise<void> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CONTENT_CACHE, 'readwrite');
    const store = transaction.objectStore(STORE_CONTENT_CACHE);
    
    const item: ContentCache = {
      key,
      data,
      timestamp: Date.now()
    };
    
    const request = store.put(item);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve();
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Gets content from the cache
 */
export async function getCachedContent<T>(key: string): Promise<T | null> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CONTENT_CACHE, 'readonly');
    const store = transaction.objectStore(STORE_CONTENT_CACHE);
    
    const request = store.get(key);
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.data as T);
      } else {
        resolve(null);
      }
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Gets all cached content
 */
export async function getAllCachedContent(): Promise<ContentCache[]> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CONTENT_CACHE, 'readonly');
    const store = transaction.objectStore(STORE_CONTENT_CACHE);
    
    const request = store.getAll();
    
    request.onerror = () => {
      reject(request.error);
    };
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

/**
 * Checks if the application is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Registers online/offline event listeners
 */
export function registerNetworkListeners(
  onlineCallback: () => void,
  offlineCallback: () => void
): void {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
}

/**
 * Unregisters online/offline event listeners
 */
export function unregisterNetworkListeners(
  onlineCallback: () => void,
  offlineCallback: () => void
): void {
  window.removeEventListener('online', onlineCallback);
  window.removeEventListener('offline', offlineCallback);
}

/**
 * Clears all offline storage
 */
export async function clearOfflineStorage(): Promise<void> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [STORE_USER_PROGRESS, STORE_PENDING_UPDATES, STORE_CONTENT_CACHE],
      'readwrite'
    );
    
    let completed = 0;
    const totalStores = 3;
    
    function checkComplete() {
      completed++;
      if (completed === totalStores) {
        resolve();
        db.close();
      }
    }
    
    // Clear User Progress
    const userProgressStore = transaction.objectStore(STORE_USER_PROGRESS);
    const clearUserProgress = userProgressStore.clear();
    clearUserProgress.onsuccess = checkComplete;
    clearUserProgress.onerror = () => reject(clearUserProgress.error);
    
    // Clear Pending Updates
    const pendingUpdatesStore = transaction.objectStore(STORE_PENDING_UPDATES);
    const clearPendingUpdates = pendingUpdatesStore.clear();
    clearPendingUpdates.onsuccess = checkComplete;
    clearPendingUpdates.onerror = () => reject(clearPendingUpdates.error);
    
    // Clear Content Cache
    const contentCacheStore = transaction.objectStore(STORE_CONTENT_CACHE);
    const clearContentCache = contentCacheStore.clear();
    clearContentCache.onsuccess = checkComplete;
    clearContentCache.onerror = () => reject(clearContentCache.error);
    
    transaction.onerror = () => {
      reject(transaction.error);
    };
  });
}