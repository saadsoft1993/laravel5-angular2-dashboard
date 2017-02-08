import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject'

@Injectable()
export class SidebarService {

    private toggleRightSidebarSource = new Subject<boolean>();
    private toggleCompactLeftSidebarSource = new Subject<boolean>();

    public toggleRightSidebarEvent$ = this.toggleRightSidebarSource.asObservable();
    public toggleCompactLeftSidebarEvent$ = this.toggleCompactLeftSidebarSource.asObservable();

    public toggleRightSidebar() {
        this.toggleRightSidebarSource.next();
    }
    public toggleCompactLeftSidebar() {
        this.toggleCompactLeftSidebarSource.next();
    }
}
