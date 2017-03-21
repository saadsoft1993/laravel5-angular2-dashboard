import {Type} from '@angular/core/src/type';
import {TableBaseDataComponent} from '../data-components/table.base-data.component';
import {TableHeadBaseComponent} from '../head/elements/table.head.base.component';
import {SortItem} from '../../../core/services/page/SortItem';
import {EventEmitter} from '@angular/core';
export interface ColumnSettings {
    readonly headComponent: Type<TableHeadBaseComponent>;
    readonly bodyComponent: Type<TableBaseDataComponent>;

    readonly title: string;
    readonly prop?: string;
    sortEmitter?: EventEmitter<SortItem>;
}