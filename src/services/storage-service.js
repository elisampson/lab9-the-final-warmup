/**
 * Handles all localStorage operations for the TODO app.
 */
export class StorageService {
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
  }

  // Save data to localStorage
  save(key, data) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.setItem(fullKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save "${key}" to localStorage:`, error);
    }
  }

  // Load data from localStorage
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const storedValue = localStorage.getItem(fullKey);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Failed to load "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  // Remove one stored key
  remove(key) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`Failed to remove "${key}" from localStorage:`, error);
    }
  }

  // Clear all keys for this app
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error(`Failed to clear localStorage for "${this.storageKey}":`, error);
    }
  }
}
