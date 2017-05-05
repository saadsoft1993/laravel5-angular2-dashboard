import {Component, Input} from '@angular/core';
import {ColumnSettings} from '../helpers/ColumnSettings';
import {PageService} from '../../../core/services/page/page.service';

@Component({
    selector: '[app-table-body]',
    templateUrl: './table.body.html',
    providers: []
})

export class TableBodyComponent<T> {
    @Input() columnSettings: ColumnSettings[];
    @Input() models: T[];
    @Input() service:PageService;
}
