import {Component, Input} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {TableBaseDataComponent} from './table.base-data.component';
import {SortItem} from '../../../core/services/page/SortItem';

@Component({
    selector: 'app-table-raw-data',
    templateUrl: './table.raw-data.html',
    providers: []
})

export class TableRawDataComponent extends TableBaseDataComponent {
    get content(): string {
        return this.row[this.settings.prop];
    }
}