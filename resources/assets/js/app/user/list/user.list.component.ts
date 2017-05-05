import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {GetData} from '../../core/services/page/GetData';
import {ColumnSettings} from '../../shared/table/helpers/ColumnSettings';
import {TableHeadSortableComponent} from '../../shared/table/head/elements/table.head.sortable.component';
import {TableRawDataComponent} from '../../shared/table/data-components/table.raw-data.component';
import {TableHeadBaseComponent} from '../../shared/table/head/elements/table.head.base.component';
import {TableEscapedDataComponent} from './table.escaped-data.component';
import {TableItemsDataComponent} from '../../shared/table/data-components/table.items-data.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.html'
})
export class UserListComponent {
    public constructor(public userService: UserService) {
    }

    readonly columns: ColumnSettings[] = [
        {
            title: 'ID',
            prop: 'id',
            headComponent: TableHeadSortableComponent,
            bodyComponent: TableRawDataComponent
        },
        {
            title: 'Name',
            prop: 'name',
            headComponent: TableHeadSortableComponent,
            bodyComponent: TableRawDataComponent
        },
        {
            title: 'Email',
            prop: 'email',
            headComponent: TableHeadBaseComponent,
            bodyComponent: TableEscapedDataComponent
        },
        {
            title: 'Created at',
            prop: 'created_at',
            headComponent: TableHeadSortableComponent,
            bodyComponent: TableRawDataComponent
        },
        {title: 'Actions', headComponent: TableHeadBaseComponent, bodyComponent: TableItemsDataComponent},
    ];
}