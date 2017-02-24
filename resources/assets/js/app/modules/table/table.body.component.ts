import {Component, Input} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';

@Component({
    selector: '[app-table-body]',
    templateUrl: './table.body.html',
    providers: []
})

export class TableBodyComponent<T> {
    @Input() columnData: ColumnData[];
    @Input() rows: T[];
}
