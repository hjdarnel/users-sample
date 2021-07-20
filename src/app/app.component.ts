import { Component, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Users Sample App';
  isIframe = false;
  sideNavOpen = false;

  constructor() {}
  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
  }

  toggleSideNav(): void {
    this.sideNavOpen = !this.sideNavOpen;
  }
}
