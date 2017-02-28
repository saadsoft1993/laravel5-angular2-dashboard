import {EventEmitter} from '@angular/core';
import {SortItem} from '../../../services/page/SortItem';

export class ColumnData {
    public isSortable: boolean = true;

    private sortItem: SortItem = new SortItem(this.prop);
    private emitter: EventEmitter<SortItem>;

    constructor(public prop: string, public title: string) {
    }

    sortable(isSortable: boolean) {
        this.isSortable = isSortable;
        return this;
    }

    toggleSort() {
        if (this.isSortable) {
            this.sortItem.next();
            this.emitter.emit(this.sortItem)
        }
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

    setEmitter(emitter: EventEmitter<SortItem>) {
        this.emitter = emitter;
        emitter.subscribe((sortItem: SortItem) => {
            if (sortItem != this.sortItem) {
                this.sortItem.reset();
            }
        });
    }
}