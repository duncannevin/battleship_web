import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {LoginUser, RegisterUser} from '../../../store/user/user.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password1: ['', [Validators.required]],
    password2: ['', [Validators.required, this.validatePasswordMatch]]
  });

  ngOnInit(): void {
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

  constructor(private fb: FormBuilder, private store: Store<State>) {
  }
}
