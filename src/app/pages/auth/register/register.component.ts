import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {
  loadUserFailure,
  loadUserSuccess,
  registerUser
} from '../../../store/user/user.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  loadUserSuccess$: Observable<User>;
  loadUserFailure$: Observable<any>;
  loadUserSuccessSub: Subscription;
  loadUserFailureSub: Subscription;
  submitted: boolean = false;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  });

  doRegister() {
    this.submitted = true;

    if (this.registerForm.valid) {
      const submitForm = this.registerForm.value;
      delete submitForm.password2
      this.store.dispatch(registerUser({ registerForm: submitForm }));
    }
  }

  ngOnInit(): void {
    this.setupStreams();
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.loadUserSuccessSub.unsubscribe();
    this.loadUserFailureSub.unsubscribe();
  }

  constructor(private actions$: Actions, private router: Router, private fb: FormBuilder, private store: Store<State>) {
  }

  private setupStreams() {
    this.loadUserSuccess$ = this.actions$
      .pipe(ofType(loadUserSuccess.type));

    this.loadUserFailure$ = this.actions$
      .pipe(ofType(loadUserFailure.type));
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
