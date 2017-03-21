import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SortItem} from '../../../../core/services/page/SortItem';
import {TableHeadBaseComponent} from './table.head.base.component';
import {ColumnSettings} from '../../helpers/ColumnSettings';

@Component({
    selector: 'app-table-head-sortable',
    templateUrl: './table.head.sortable.html',
    providers: []
})
export class TableHeadSortableComponent extends TableHeadBaseComponent {
    settings: ColumnSettings;
    sortEmitter: EventEmitter<SortItem>;
    sortItem: SortItem;

    ngOnInit() {
        this.sortItem = new SortItem(this.settings.prop);
        this.sortEmitter.subscribe((sortItem: SortItem) => {
            if (sortItem != this.sortItem) {
                this.sortItem.reset();
            }
        });
    }

    isAsc(): boolean {
        return this.sortItem.isAsc();
    }

    isDesc(): boolean {
        return this.sortItem.isDesc();
    }

    isDefault(): boolean {
        return this.sortItem.isDefault();
    }

    onClick() {
        this.sortItem.next();
        this.sortEmitter.emit(this.sortItem)
    }
}