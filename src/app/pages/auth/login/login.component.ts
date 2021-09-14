import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {LoginUser, UserActionTypes} from '../../../store/user/user.actions';
import {Actions, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loadUserSuccessSub: Subscription;
  submitted: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  doLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginUser({login: this.loginForm.value}));
    }
  }

  ngOnInit(): void {
    this.loadUserSuccessSub = this.actions$
      .pipe(ofType(UserActionTypes.loadUserSuccess))
      .subscribe((user: User) => {
        this.router.navigate(['/game'])
        this.loadUserSuccessSub.unsubscribe();
      })
  }

  ngOnDestroy() {
    this.loadUserSuccessSub.unsubscribe();
  }

  constructor(private router: Router, private actions$: Actions, private fb: FormBuilder, private store: Store<State>) {
  }
}
