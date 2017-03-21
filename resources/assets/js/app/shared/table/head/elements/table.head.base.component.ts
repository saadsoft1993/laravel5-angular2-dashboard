import {Component, Input, EventEmitter} from '@angular/core';
import {ColumnSettings} from '../../helpers/ColumnSettings';
import {SortItem} from '../../../../core/services/page/SortItem';

@Component({
    selector: 'app-table-head-base',
    templateUrl: './table.head.base.html',
    providers: []
})
export class TableHeadBaseComponent {
    settings: ColumnSettings;
    sortEmitter:EventEmitter<SortItem>
}