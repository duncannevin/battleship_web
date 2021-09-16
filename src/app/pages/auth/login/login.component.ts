import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {LoginUser, UserActionTypes} from '../../../store/user/user.actions';
import {Actions, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loadUserSuccess$: Observable<User>;
  loadUserFailure$: Observable<any>;
  loadUserSuccessSub: Subscription;
  loadUserFailureSub: Subscription;

  submitted: boolean = false;
  loginForm: FormGroup;

  doLogin() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(new LoginUser({login: this.loginForm.value}));
    }
  }

  ngOnInit(): void {
    this.setupForm();
    this.setupStreams();
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.loadUserSuccessSub.unsubscribe();
    this.loadUserFailureSub.unsubscribe();
  }

  constructor(private router: Router, private actions$: Actions, private fb: FormBuilder, private store: Store<State>) {
  }

  private setupForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }, {});
  }

  private setupStreams() {
    this.loadUserSuccess$ = this.actions$
      .pipe(ofType(UserActionTypes.loadUserSuccess));

    this.loadUserFailure$ = this.actions$
      .pipe(ofType(UserActionTypes.loadUserFailure));
  }

  private setupSubscriptions() {
    this.loadUserSuccessSub = this.loadUserSuccess$.subscribe((user: User) => {
      this.router.navigate(['/game']);
      this.loadUserSuccessSub.unsubscribe();
    });

    this.loadUserFailureSub = this.loadUserFailure$.subscribe((error: any) => {
      console.log('load user error', error)
    });
  }
}
