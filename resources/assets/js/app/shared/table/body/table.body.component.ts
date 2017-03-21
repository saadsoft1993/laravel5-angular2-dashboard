import {Component, Input} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';

@Component({
    selector: '[app-table-body]',
    templateUrl: './table.body.html',
    providers: []
})

export class TableBodyComponent<T> {
    @Input() columnSettings: ColumnSettings[];
    @Input() rows: T[];
}
