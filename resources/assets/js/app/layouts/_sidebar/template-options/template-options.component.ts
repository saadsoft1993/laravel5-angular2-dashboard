import {Component} from '@angular/core';
import {SidebarService} from './../../../services/sidebar.service';
import {Subscription} from 'rxjs/Subscription'
import * as $ from 'jquery';

@Component({
    selector: 'template-options',
    templateUrl: './template-options.html'
})
export class TemplateOptionsComponent {

    private toggleRightSubscription: Subscription;
    public isOpenTemplateOptions = false;
    public isOpenTemplateOptionsButton = true;

    constructor(private sidebarService: SidebarService) {
    }

    public ngOnInit() {
        this.toggleRightSubscription = this.sidebarService.toggleRightSidebarEvent$
            .subscribe(() => {
                this.closeOptions();
            });

    }

    public ngOnDestroy() {
        this.toggleRightSubscription.unsubscribe();
    }

    private closeOptions() {
        this.isOpenTemplateOptionsButton = !this.isOpenTemplateOptionsButton;
        this.isOpenTemplateOptions = false;
    }

    public templateOptionsToggle() {
        this.isOpenTemplateOptions = !this.isOpenTemplateOptions;
    }

    public setTemplateOption(event) {
        let body = $('body');
        let fixedHeaderCheckbox = '.templateoptions input[name="fixed-header"]';
        let fixedSidebarCheckbox = '.templateoptions input[name="fixed-header"]';
        let fixedHeaderClass = 'fixed-header';
        let fixedFooterClass = 'fixed-header';
        if ($(body).hasClass(fixedFooterClass)) {
            $(body).removeClass(fixedFooterClass);
        }
        let setting: string = $(event.currentTarget).attr('name');
        if ($(body).hasClass(setting)) {
            $(body).removeClass(setting);
            if (setting == 'compact-sidebar') {
                $('.slimscroll-grid, .slimscroll-bar').removeClass('invisible');
                this.sidebarIfActive();
            }
            if (setting == fixedHeaderClass) {
                $(body).removeClass('fixed-sidebar');
                $(fixedSidebarCheckbox).prop('checked', false);
            }
            if (setting == 'boxed-wrapper') {
                $(fixedHeaderCheckbox).parent().parent().removeClass('disabled');
                $(fixedSidebarCheckbox).parent().parent().removeClass('disabled');
            }
        } else {
            $(body).addClass(setting);
            if (setting == 'compact-sidebar') {
                $('.sitebarleft li.with-sub').find('>ul').slideUp();
                $('.slimscroll-grid, .slimscroll-bar').addClass('invisible');
            }
            $('.slimscroll-grid').css('opacity', 100);
            $('.slimscroll-bar').css('opacity', 100);
            if (setting == 'fixed-sidebar') {
                $(body).addClass(fixedHeaderClass);
                $(fixedHeaderCheckbox).prop('checked', true);
            }
            if (setting == 'boxed-wrapper') {
                $(body).removeClass(fixedHeaderClass);
                $(fixedHeaderCheckbox).prop('checked', false);
                $(fixedHeaderCheckbox).parent().parent().addClass('disabled');
                $(body).removeClass('fixed-sidebar');
                $(fixedSidebarCheckbox).prop('checked', false);
                $(fixedSidebarCheckbox).parent().parent().addClass('disabled');
                $(body).removeClass('static');
                $('.templateoptions input[name="static"]').prop('checked', false);
            }
            if (setting == 'static') {
                $(body).removeClass(fixedHeaderClass);
                $(fixedHeaderCheckbox).prop('checked', false);
                $(fixedHeaderCheckbox).parent().parent().removeClass('disabled');
                $(body).removeClass('fixed-sidebar');
                $(fixedSidebarCheckbox).prop('checked', false);
                $(fixedSidebarCheckbox).parent().parent().removeClass('disabled');
                $(body).removeClass('boxed-wrapper');
                $('.templateoptions input[name="boxed-wrapper"]').prop('checked', false);
            }
        }
    }


    public setTemplateSkin(event) {
        let body = $('body');
        let darkMenuButton = $('.toggle-button-second.dark');
        let lightMenuButton = $('.toggle-button-second.light');
        let darkMenuButtonSecond = $('.sidebar-toggle-second.dark');
        let lightMenuButtonSecond = $('.sidebar-toggle-second.light');
        console.log(lightMenuButtonSecond);
        let setting = $(event.currentTarget).val();
        $(body).removeClass(function (index, css) {
            return (css.match(/(^|\s)skin-\S+/g) || []).join(' ');
        });

        $(body).addClass(setting);
        if (setting == 'skin-default' || setting == 'skin-2' || setting == 'skin-3' || setting == 'skin-6') {
            $('.header .navbar').removeClass('navbar-dark').addClass('navbar-light');
        } else {
            $('.header .navbar').removeClass('navbar-light').addClass('navbar-dark');
        }

        if (setting == 'skin-3' || setting == 'skin-2' || setting == 'skin-6' || setting == 'skin-1') {
            $(darkMenuButton).removeClass('dark').addClass('light');
            $(darkMenuButtonSecond).removeClass('dark').addClass('light');
        } else {
            $(lightMenuButton).removeClass('light').addClass('dark');
            $(lightMenuButtonSecond).removeClass('light').addClass('dark');
        }

        if (setting == 'skin-default' || setting == 'skin-2' || setting == 'skin-3' || setting == 'skin-6') {
            $(darkMenuButton).removeClass('dark').addClass('light');
            $(darkMenuButtonSecond).removeClass('dark').addClass('light');
        } else {
            $(lightMenuButton).removeClass('light').addClass('dark');
            $(lightMenuButtonSecond).removeClass('light').addClass('dark');
        }

        if (setting == 'skin-default' || setting == 'skin-2' || setting == 'skin-6') {
            $('.sitebarleft .custom-scroll').removeClass('custom-scroll-dark').addClass('custom-scroll-light');
            $('.sitebarleft .progress-widget').removeClass('progress-widget-dark').addClass('progress-widget-light');
        } else {
            $('.sitebarleft .custom-scroll').removeClass('custom-scroll-light').addClass('custom-scroll-dark');
            $('.sitebarleft .progress-widget').removeClass('progress-widget-light').addClass('progress-widget-dark');
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