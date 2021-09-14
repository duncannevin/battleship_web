import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterUser, UserActionTypes} from '../../../store/user/user.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  loadUserSuccessSub: Subscription;
  submitted: boolean = false;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required]],
    password2: ['', [Validators.required, this.validatePasswordMatch]]
  });

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

  doRegister() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.store.dispatch(new RegisterUser({register: this.registerForm.value}));
    }
  }

  validatePasswordMatch(control: FormControl) {
    if (!control.root || !control.parent) {
      return null;
    }

    const root = control.root as FormGroup;
    const password1 = root.get('password1')?.value;
    const password2 = control.value;

    if (password1 === password2) {
      return null;
    }

    return 'passwords do not match';
  }

  constructor(private actions$: Actions, private router: Router, private fb: FormBuilder, private store: Store<State>) {
  }
}
