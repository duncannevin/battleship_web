import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user.model';
import {LoginForm} from '../../models/login-form.model';
import {RegisterForm} from '../../models/register-form.model';
import {Error} from '../../models/error.model';

enum UserActionTypes {
  registerUser = '[User] Register user',
  loginUser = '[User] Login user',
  getUserDetails = '[User] Get user details',
  loadUserSuccess = '[User] Load user success',
  loadUserFailure = '[User] Load user failure',
  logoutUser = '[User] Logout user',
  resetUser = '[User] Reset user'
}

export const getUserDetails = createAction(UserActionTypes.getUserDetails, props<{ user: User }>());
export const registerUser = createAction(UserActionTypes.registerUser, props<{ registerForm: RegisterForm }>());
export const loginUser = createAction(UserActionTypes.loginUser, props<{ loginForm: LoginForm }>());
export const logoutUser = createAction(UserActionTypes.logoutUser);

export const loadUserSuccess = createAction(UserActionTypes.loadUserSuccess, props<{ user: User }>());
export const loadUserFailure = createAction(UserActionTypes.loadUserFailure, props<{ error: Error }>());
export const resetUser = createAction(UserActionTypes.resetUser);
