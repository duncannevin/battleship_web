import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthLayoutComponent} from "../../layouts/auth-layout/auth-layout.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LogoutResolver} from '../../resolvers/logout.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        data: {
          title: 'login',
        },
        component: LoginComponent
      },
      {
        path: 'register',
        data: {
          title: 'register'
        },
        component: RegisterComponent
      },
      {
        path: 'logout',
        data: {
          title: 'logout'
        },
        resolve: {
          logout: LogoutResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
