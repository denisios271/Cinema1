export default class LocalStorage {
    /**
     * Converts data to json and saves in local storage.
     * 
     * @param key Local storage's key
     * @param value Value to save - can be anything.
     */
    static save(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Loads and returns saved data.
     * If data not found - returns null
     * 
     * @param {string} key Key in the local storage.
     * @returns {T|null} Saved data or null if not found
     */
    static load<T = any>(key: string): T|null {
        const data: string = localStorage.getItem(key);
        if (!data || data === 'undefined') {
            return null;
        }
        const parsedData: any = JSON.parse(data);
        if (parsedData.savedDate || parsedData.storeDaysCount) {
            this.remove(key);
            return null;
        }
        return parsedData;
    }

    /**
     * Removes item from localStorage
     * 
     * @param key Unique key for data in local storage
     */
    static remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Force cleans storage
     * Updates lastCleaning in storage
     */
    static cleanStorageIfNecessary(): void {
        let lastCleaningTime = this.load<number>('lastCleaning');
        let day = 86400000; // 24 hours, 86400000 mins, 86400 secs, 86400000 ms
        if (lastCleaningTime && lastCleaningTime > Date.now() - day) {
            // do nothing - we don't need to do anything because user has no old data
            return;
        }
        this.forceCleanStorage();
        this.save('lastCleaning', Date.now());
    }

    /**
     * Ok, well, we don't want to log out user, so we have to save his token
     */
    static forceCleanStorage(): void {
        const authToken = this.load<string>('access_token');
        localStorage.clear();
        this.save('access_token', authToken);
    }
}