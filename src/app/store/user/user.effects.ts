import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {State} from '../index';
import {UserService} from '../../services/user.service';
import {LoadUserFailure, LoadUserSuccess, UserAction, UserActionTypes} from './user.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

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
              map((user) => (new LoadUserSuccess({user}))),
              catchError((error) => of(new LoadUserFailure({error})))
            );
        })
      ));

  constructor(private actions$: Actions, private store: Store<State>, private userService: UserService) {
  }
}
