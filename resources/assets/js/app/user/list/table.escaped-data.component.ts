import {Component} from '@angular/core';
import {TableRawDataComponent} from '../../shared/table/data-components/table.raw-data.component';

@Component({
    selector: 'app-table-raw-data',
    templateUrl: './table.escaped-data.html',
    providers: []
})

export class TableEscapedDataComponent extends TableRawDataComponent {
}