import { Injectable } from '@angular/core';

export enum STORAGE_KEYS {
  USER = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T|null {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  constructor() { }
}
