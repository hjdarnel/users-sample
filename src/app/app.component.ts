import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Users Sample App';
    isIframe = false;
    sideNavOpen = false;

    @ViewChild(MatExpansionPanel) mangementPanel: MatExpansionPanel;

    constructor() {}
    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    }

    toggleSideNav(): void {
        this.sideNavOpen = !this.sideNavOpen;
    }

    onSideNavClosedStart(): void {
        this.mangementPanel.close();
    }
}
