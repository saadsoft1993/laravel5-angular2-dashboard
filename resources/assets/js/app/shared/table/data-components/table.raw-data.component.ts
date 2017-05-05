import {Component} from '@angular/core';
import {TableBaseDataComponent} from './table.base-data.component';

@Component({
    selector: 'app-table-raw-data',
    templateUrl: './table.raw-data.html',
    providers: []
})

export class TableRawDataComponent extends TableBaseDataComponent {
    get content(): string {
        return this.model[this.settings.prop];
    }
}