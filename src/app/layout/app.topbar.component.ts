import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Sidebar } from 'primeng/sidebar';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public router: Router) { }

    @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
}
