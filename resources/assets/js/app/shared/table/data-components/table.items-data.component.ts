import {Component} from '@angular/core';
import {TableBaseDataComponent} from './table.base-data.component';

@Component({
    selector: 'app-table-items-data',
    templateUrl: './table.items-data.html',
    providers: []
})

export class TableItemsDataComponent extends TableBaseDataComponent {
    remove() {
        this.row.remove();
    }

    edit() {
        console.log(this.row);
    }
}