import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../index';
import {UserService} from '../../services/user.service';
import {
  GetUserDetails,
  LoadUserFailure,
  LoadUserSuccess,
  LoginUser,
  RegisterUser,
  UserAction,
  UserActionTypes
} from './user.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {LocalStorageService, STORAGE_KEYS} from '../../services/local-storage.service';
import {User} from '../../models/user.model';

@Injectable()
export class UserEffects {
  loginUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<LoginUser>(UserActionTypes.loginUser),
        mergeMap((action: UserAction) => {
          if (!action.payload || !action.payload.login) {
            throw new Error('[getUserDetails] Invalid payload');
          }

          return this.userService.login(action.payload.login)
            .pipe(
              this.setUser()
            )
        })
      ));

  registerUser$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<RegisterUser>(UserActionTypes.registerUser),
        mergeMap((action) => {
          if (!action.payload || !action.payload.register) {
            throw new Error('[loginUser$] Invalid payload');
          }

          return this.userService.register(action.payload.register)
            .pipe(
              this.setUser()
            );
        })
      ));

  getUserDetails$ = createEffect(
    () => this.actions$
      .pipe(
        ofType<GetUserDetails>(UserActionTypes.getUserDetails),
        mergeMap((action) => {
          if (!action.payload || !action.payload.user) {
            throw new Error('[getUserDetails] Invalid payload');
          }

          return this.userService.getUserDetails(action.payload.user)
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
        map((user) => (new LoadUserSuccess({user}))),
        catchError((error) => of(new LoadUserFailure({error})))
      );
    }
  }

  constructor(private actions$: Actions, private store: Store<State>, private userService: UserService, private localStorage: LocalStorageService) {
  }
}
