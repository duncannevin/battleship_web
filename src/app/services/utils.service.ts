import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  match<T>(v1: T, v2: T): boolean {
    return v1 === v2;
  }

  constructor() { }
}
