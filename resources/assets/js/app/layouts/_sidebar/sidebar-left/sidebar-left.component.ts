import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'sidebar-left',
    templateUrl: './sidebar-left.html'
})
export class SidebarLeftComponent {
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
}