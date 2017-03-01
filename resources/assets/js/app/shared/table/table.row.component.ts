import {Component, Input} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';

@Component({
    selector: '[app-table-row]',
    templateUrl: './table.row.html',
    providers: []
})

export class TableRowComponent<T> {
    @Input() columnData: ColumnData[];
    @Input() row: T;

    public getElements() {
        let elems: string[] = [];
        for (let elem of this.columnData) {
            elems.push(this.row[elem.prop]);
        }
        return elems;
    }
}