import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {loadUserSuccess, logoutUser, resetUser} from '../../store/user/user.actions';
import {Observable, Subscription} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  logoutUser$: Observable<any>;
  logoutUserSub: Subscription;
  sidebarMinimized: boolean = false;

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

  ngOnInit(): void {
    this.logoutUser$ = this.actions$
      .pipe(ofType(resetUser.type));

    this.logoutUserSub = this.logoutUser$.subscribe(() => {
      this.router.navigate(['/'])
    });
  }

  ngOnDestroy() {
    this.destroySubs();
  }

  constructor(private store: Store<State>, private actions$: Actions, private router: Router) { }

  private destroySubs() {
    this.logoutUserSub.unsubscribe();
  }
}
