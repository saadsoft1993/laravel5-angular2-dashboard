import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';
import {SortItem} from '../../services/page/SortItem';

@Component({
    selector: '[app-table-head]',
    templateUrl: './table.head.html',
    providers: []
})

export class TableHeadComponent {
    @Input() columnData: ColumnData[];
    @Output() sort: EventEmitter<SortItem> = new EventEmitter();

    ngOnInit() {
        for(let col of this.columnData) {
            col.setEmitter(this.sort);
        }
    }
}
