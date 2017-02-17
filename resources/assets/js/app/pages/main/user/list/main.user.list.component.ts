import {Component} from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'app-main-user-list',
    templateUrl: './main.user.list.html'
})
export class UserListComponent {
    public constructor() {
        console.log('component constructed')
    }

}