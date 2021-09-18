import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {Observable, of} from 'rxjs';
import {INavData} from '@coreui/angular';
import {selectSidebarItems} from '../../store/sidebar/sidebar.selectors';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
  navItems$: Observable<INavData[]> = of([{}]);
  sidebarMinimized: boolean = false;

  constructor(private store: Store<State>) { }

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.navItems$ = this.store.select(selectSidebarItems);
  }
}
