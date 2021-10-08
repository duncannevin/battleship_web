import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "../models/login-form.model";
import {environment} from '../../environments/environment';
import {RegisterForm} from "../models/register-form.model";
import {map} from 'rxjs/operators';

const authLocation: string = `${environment.apiLocation}/auth`;

class UserLocations {
  LOGIN: string = `${authLocation}/auth/login`;
  REGISTER: string = `${authLocation}/auth/register`;
  GET_DETAILS: string = `${authLocation}/users`;
}

export const USER_LOCATIONS = new UserLocations();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(loginForm: LoginForm): Observable<User> {
    return this.http.post<User>(USER_LOCATIONS.LOGIN, loginForm);
  }

  register(registerForm: RegisterForm): Observable<User> {
    return this.http.post<User>(USER_LOCATIONS.REGISTER, registerForm);
  }

  getUserDetails(user: User) {
    return this.http.get<User>(USER_LOCATIONS.GET_DETAILS, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).pipe(
      map((updatedUser) => ({ ...updatedUser, token: user.token }))
    );
  }

  constructor(private http: HttpClient) { }
}
