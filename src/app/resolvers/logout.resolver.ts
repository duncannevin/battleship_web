import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {logoutUser, resetUser} from '../store/user/user.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutResolver implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const logout$ = this.actions$.pipe(ofType(logoutUser.type));

    this.store.dispatch(logoutUser());

    return logout$.pipe(map(() => {
      console.log('resolved');
      return true;
    }));
  }

  constructor(private store: Store<State>, private actions$: Actions) {
  }
}
