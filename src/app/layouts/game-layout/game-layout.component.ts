import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {Actions, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
  sidebarMinimized: boolean = false;

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.router.navigate(['/auth/logout']);
  }

  ngOnInit(): void {
  }

  constructor(private store: Store<State>, private actions$: Actions, private router: Router) { }
}
