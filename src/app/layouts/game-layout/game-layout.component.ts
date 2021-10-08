import {Component, OnInit} from '@angular/core';

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

  ngOnInit(): void {
  }

  constructor() { }
}
