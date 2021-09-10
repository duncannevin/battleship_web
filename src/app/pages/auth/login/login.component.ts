import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../../store";
import {LoginUser} from "../../../store/user/user.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  }

  constructor(private fb: FormBuilder, private store: Store<State>) { }
}
