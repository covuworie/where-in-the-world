import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// Based on https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
export class LocalStorageService {
  private constructor() {}

  static setItemWithExpiry(key: string, value: string, ttl: number) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getOrRemoveExpiredItem(key: string) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item: { value: string; expiry: number } = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return JSON.parse(item.value);
  }
}
