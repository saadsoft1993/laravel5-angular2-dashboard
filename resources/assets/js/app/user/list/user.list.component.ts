import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {ColumnData} from '../../shared/table/helpers/ColumnData';
import {GetData} from '../../core/services/page/GetData';
import {SortItem} from '../../core/services/page/SortItem';

@Component({
    // moduleId: module.id,
    selector: 'app-user-list',
    templateUrl: './user.list.html'
})
export class UserListComponent {
    readonly columns: ColumnData[] = [
        new ColumnData('id', 'ID'),
        new ColumnData('name', 'Name'),
        new ColumnData('email', 'Email'),
        new ColumnData('created_at', 'Created at').sortable(false)
    ];

    readonly tableData: GetData = (page: number, perPage?:number, sort?:SortItem) => this.userService.getAll(page, sort);

    public constructor(private userService: UserService) {
    }
}