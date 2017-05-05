import {Component, Input} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {PageService} from '../../../core/services/page/page.service';
import {Model} from '../../../core/Model';

@Component({
    selector: '[app-table-row]',
    templateUrl: './table.row.html',
    providers: []
})

export class TableRowComponent<T> {
    @Input() columnSettings: ColumnSettings[];
    @Input() model: Model;
    @Input() service:PageService;
}