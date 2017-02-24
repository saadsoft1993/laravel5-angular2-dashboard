import {Component, Input} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';

@Component({
    selector: '[app-table-head]',
    templateUrl: './table.head.html',
    providers: []
})

export class TableHeadComponent {
    @Input() columnData: ColumnData[];

    constructor() {
    }

    ngOnInit() {
    }
}
