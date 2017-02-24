import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {GetData} from '../../../services/page.service';


@Component({
    // moduleId: module.id,
    selector: 'app-user-list',
    templateUrl: './user.list.html'
})
export class UserListComponent {
    readonly columns: any[] = [
        {prop: 'name', title: 'Name'},
        {prop: 'email', title: 'Email'},
        {prop: 'created_at', title: 'Created at'}
    ];

    readonly pageTag: string = 'page';

    readonly tableData: GetData = (page: number) => this.userService.getAll(page);

    public constructor(private userService: UserService) {
    }

    public ngOnInit() {
    }
}