import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {SidebarService} from './../../../services/sidebar.service';

@Component({
    selector: 'header',
    templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {
    public isCollapsedNotifyAndSearch = false;
    public isCollapsedComments = false;
    public isCollapsedSettings = false;
    public isCollapsedNotifications = false;
    public isCollapsedSocial = false;

    public isToggleOprionsButtonActive = false;

    constructor(private sidebarService:SidebarService) {
    }

    public ngOnInit() {
        /* Hide on outside click */

        $(document).mouseup(function (e) {
            let container = $('.templateoptions, .sidebarright, .toggle-button-second');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.removeClass('opened');
                $('.templateoptions').show();
                $('.toggle-button-second').removeClass('active');
            }
        });
    }

  


    public toggleOptions() {
        this.sidebarService.toggleRightSidebar();
        this.isToggleOprionsButtonActive = !this.isToggleOprionsButtonActive;
    }

    public toggleCompactSidebarDesktop() {
        this.sidebarService.toggleCompactLeftSidebar();
    }

    public toggleCompactSidebarMobile() {
        this.sidebarService.toggleCompactLeftSidebarMobile();
    }

}