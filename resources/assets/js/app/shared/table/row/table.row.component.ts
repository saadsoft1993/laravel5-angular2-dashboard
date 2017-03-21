import {Component, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {TableDataComponent} from '../td/table.data.component';

@Component({
    selector: '[app-table-row]',
    templateUrl: './table.row.html',
    providers: []
})

export class TableRowComponent<T> {
    @Input() columnSettings: ColumnSettings[];
    @Input() row: T;
}