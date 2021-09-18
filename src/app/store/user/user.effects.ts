import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../index';
import {UserService} from '../../services/user.service';
import * as UserActions from './user.actions';
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {LocalStorageService, STORAGE_KEYS} from '../../services/local-storage.service';
import {User} from '../../models/user.model';
import {loadUserFailure, loadUserSuccess} from './user.actions';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(UserActions.loginUser),
        exhaustMap((action) => (
          this.userService.login(action.loginForm)
            .pipe(
              this.setUser()
            )
        ))
      ));

  registerUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(UserActions.registerUser),
        exhaustMap((action) => {
          return this.userService.register(action.registerForm)
            .pipe(
              this.setUser()
            );
        })
      ));

  getUserDetails$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(UserActions.getUserDetails),
        mergeMap((action) => {
          return this.userService.getUserDetails(action.user)
            .pipe(
              this.setUser()
            )
        })
      )
  );

  private setUser() {
    return (source: Observable<User>): Observable<Action> => {
      return source.pipe(
        tap((user) => (this.localStorage.setItem<User>(STORAGE_KEYS.USER, user))),
        map((user) => (loadUserSuccess({ user })),
        catchError((error) => of(loadUserFailure( { error }))))
      );
    }
  }

  constructor(private actions$: Actions, private store: Store<State>, private userService: UserService, private localStorage: LocalStorageService) {
  }
}
