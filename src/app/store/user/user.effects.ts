import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {State} from '../index';
import {UserService} from '../../services/user.service';
import {LoadUserFailure, LoadUserSuccess, UserAction, UserActionTypes} from './user.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LocalStorageService, STORAGE_KEYS} from '../../services/local-storage.service';
import {User} from '../../models/user.model';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UserAction>(UserActionTypes.loginUser),
        mergeMap((action) => {
          if (!action.payload || !action.payload.login) {
            throw new Error('[loginUser$] Invalid payload');
          }

          return this.userService.login(action.payload.login)
            .pipe(
              tap((user) => (this.localStorage.setItem<User>(STORAGE_KEYS.USER, user))),
              map((user) => (new LoadUserSuccess({user}))),
              catchError((error) => of(new LoadUserFailure({error})))
            );
        })
      ));

  registerUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UserAction>(UserActionTypes.registerUser),
        mergeMap((action) => {
          if (!action.payload || !action.payload.register) {
            throw new Error('[loginUser$] Invalid payload');
          }

          return this.userService.register(action.payload.register)
            .pipe(
              tap((user) => (this.localStorage.setItem<User>(STORAGE_KEYS.USER, user))),
              map((user) => (new LoadUserSuccess({user}))),
              catchError((error) => of(new LoadUserFailure({error})))
            );
        })
      ));

  getUserDetails$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<UserAction>(UserActionTypes.getUserDetails),
        mergeMap((action) => {
          if (!action.payload || !action.payload.user) {
            throw new Error('[getUserDetails] Invalid payload');
          }

          return this.userService.getUserDetails(action.payload.user)
            .pipe(
              tap((user) => (this.localStorage.setItem<User>(STORAGE_KEYS.USER, user))),
              map((user) => (new LoadUserSuccess({ user }))),
              catchError((error) => of(new LoadUserFailure({ error })))
            )
        })
      )
  );

  constructor(private actions$: Actions, private store: Store<State>, private userService: UserService, private localStorage: LocalStorageService) {
  }
}
