import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class SidebarService {

    private toggleRightSidebarSource = new Subject<boolean>();
    private toggleCompactLeftSidebarSource = new Subject<boolean>();
    private toggleCompactLeftSidebarMobileSource = new Subject<boolean>();

    public toggleRightSidebarEvent$ = this.toggleRightSidebarSource.asObservable();
    public toggleCompactLeftSidebarEvent$ = this.toggleCompactLeftSidebarSource.asObservable();
    public toggleCompactLeftSidebarMobileEvent$ = this.toggleCompactLeftSidebarMobileSource.asObservable();

    public toggleRightSidebar() {
        this.toggleRightSidebarSource.next();
    }
    public toggleCompactLeftSidebar() {
        this.toggleCompactLeftSidebarSource.next();
    }
    public toggleCompactLeftSidebarMobile() {
        this.toggleCompactLeftSidebarMobileSource.next();
    }


}
