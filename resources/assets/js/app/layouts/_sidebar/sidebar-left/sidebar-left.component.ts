import {Component, OnInit, OnDestroy} from '@angular/core';
import * as $ from 'jquery';
import {SidebarService} from './../../../services/sidebar.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'sidebar-left',
    templateUrl: './sidebar-left.html'
})
export class SidebarLeftComponent implements OnInit, OnDestroy{
    private toggleCompactSubscription:Subscription;
    private toggleCompactOnMobileSubscription:Subscription;

    constructor(private sidebarService:SidebarService) {
    }

    public ngOnInit() {
        this.matchMedia();
        this.toggleCompactSubscription = this.sidebarService.toggleCompactLeftSidebarEvent$
            .subscribe(() => {
                this.toggleCompact();
            })
        this.toggleCompactOnMobileSubscription = this.sidebarService.toggleCompactLeftSidebarMobileEvent$
            .subscribe(() => {
                this.toggleCompactOnMobile();
            })
    }

    public ngOnDestroy() {
        this.toggleCompactSubscription.unsubscribe();
    }

    public toggleCompact() {
        let body = $('body');
        let compact = 'compact-sidebar';
        let simScrollClasses = '.slimscroll-grid, .slimscroll-bar';
        if ($(body).hasClass(compact)) {
            $(body).removeClass(compact);
            $(simScrollClasses).removeClass('invisible');
            this.sidebarIfActive();
        } else {
            $(body).addClass(compact);
            $('.sitebarleft li.with-sub').find('>ul').slideUp();
            $(simScrollClasses).addClass('invisible');
        }
    }

    public toggleCompactOnMobile(){
        let body = $('body');
        let isOpenSitebarLeft = 'sitebarleft-opened';
        if ($(body).hasClass(isOpenSitebarLeft)) {
            $(body).removeClass(isOpenSitebarLeft);
        } else {
            $(body).addClass(isOpenSitebarLeft);
        }
    }

    public openSubmenu(event) {
        let element = event.currentTarget;
        if (!$('body').hasClass('compact-sidebar')) {
            if ($(element).parent().hasClass('active')) {
                $(element).parent().removeClass('active');
                $(element).parent().find('>ul').slideUp();
            } else {
                if (!$(element).parent().parent().closest('.with-sub').length) {
                    $('.sitebarleft li.with-sub').removeClass('active').find('>ul').slideUp();
                }
                $(element).parent().addClass('active');
                $(element).parent().find('>ul').slideDown();
            }
        }
    }
    private matchMedia() {
        if (matchMedia) {
            let mq = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
            mq.addListener(this.widthChangeCompact);
            this.widthChangeCompact(mq);
        }
    }

    private widthChangeCompact(mq) {
        let body = $('body');
        if (mq.matches) {
            $(body).addClass('compact-sidebar');
            $('.sitebarleft li.with-sub').find('>ul').slideUp();
        } else {
            $(body).removeClass('compact-sidebar');
            this.sidebarIfActive();
        }
    }

    private sidebarIfActive() {
        let url;
        let element;
        $('.sitebarleft ul > li:not(.with-sub)').removeClass('active');
        url = window.location;
        element = $('.sitebarleft ul > li > a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        });
        element.parent().addClass('active');

        $('.sitebarleft li.with-sub').removeClass('active').find('>ul').hide();
        url = window.location;
        element = $('.sitebarleft ul li ul li a').filter(function () {
            return this.href == url || url.href.indexOf(this.href) == 0;
        });
        element.parent().addClass('active');
        element.parent().parent().parent().addClass('active');

        if (!$('body').hasClass('compact-sidebar')) {
            element.parent().parent().slideDown();
        }
    }
}