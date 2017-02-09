import {Component, OnInit, OnDestroy} from '@angular/core';
import * as $ from 'jquery';
import {SidebarService} from './../../../services/sidebar.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'sidebar-right',
    templateUrl: './sidebar-right.html'
})
export class SidebarRightComponent implements OnInit, OnDestroy {

    private toggleRightSubscription:Subscription;
    public isOpenRightSidebar = false;

    constructor(private sidebarService:SidebarService) {
    }

    public ngOnInit() {
        this.toggleRightSubscription = this.sidebarService.toggleRightSidebarEvent$
            .subscribe((click) => {
                this.toggleRightSidebar();
            })
    }

    public ngOnDestroy() {
        this.toggleRightSubscription.unsubscribe();
    }

    public toggleRightSidebar() {
        this.isOpenRightSidebar = !this.isOpenRightSidebar;
    }
}