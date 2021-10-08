import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {LocalStorageService, STORAGE_KEYS} from '../services/local-storage.service';
import {User} from '../models/user.model';
import * as UserActions from '../store/user/user.actions';
import {catchError, map} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    const existingUser = this.localStorage.getItem<User>(STORAGE_KEYS.USER);

    if (!existingUser) {
      this.router.navigate(['/auth/register']);
      return of(false);
    }

    this.store.dispatch(UserActions.getUserDetails({ user: existingUser }));

    return this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      map(() => true),
      catchError(() => of(!!this.router.navigate(['/auth/register'])))
    );
  }

  constructor(private actions$: Actions, private router: Router, private store: Store<State>, private localStorage: LocalStorageService) {
  }
}
