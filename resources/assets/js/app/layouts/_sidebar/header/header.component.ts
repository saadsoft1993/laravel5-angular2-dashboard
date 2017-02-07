import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'header',
    templateUrl: './header.html'
})
export class HeaderComponent {
    opts:any;
    container:any;
    public isCollapsedNotifyAndSearch = false;
    public isCollapsedComments = false;
    public isCollapsedSettings = false;
    public isCollapsedNotifications = false;
    public isCollapsedSocial = false;

    constructor() {
    }

    ngOnInit() {
        this.matchMedia();

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

    public toggleOptions(event) {
        let templateoptions = $('.templateoptions');
        $(templateoptions).toggle();
        $(templateoptions).removeClass('opened');
        $(event.currentTarget).toggleClass('active');
        $('.sidebarright').toggleClass('opened');
    }


    public toggleCompactSidebarDesktop() {
        let body = $('body');
        let compact = 'compact-sidebar';
        let simScrollClasses = '.slimscroll-grid, .slimscroll-bar';
        if ($(body).hasClass(compact)) {
            $(body).removeClass(compact);
            $(simScrollClasses).removeClass("invisible");
            this.sidebarIfActive();
        } else {
            $(body).addClass(compact);
            $('.sitebarleft li.with-sub').find('>ul').slideUp();
            $(simScrollClasses).addClass("invisible");

        }
    }

    public toggleCompactSidebarMobile() {
        let body = $('body');
        let isOpenSitebarLeft = 'sitebarleft-opened';
        if ($(body).hasClass(isOpenSitebarLeft)) {
            $(body).removeClass(isOpenSitebarLeft);
        } else {
            $(body).addClass(isOpenSitebarLeft);
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

    private matchMedia() {
        if (matchMedia) {
            let mq = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
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
}