import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {TableComponent} from './table/table.component';
import {TableBodyComponent} from './table/body/table.body.component';
import {TableHeadComponent} from './table/head/table.head.component';
import {TableRowComponent} from './table/row/table.row.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {TableDataComponent} from './table/td/table.data.component';
import {DataContainerDirective} from './table/data-container.directive';
import {TableRawDataComponent} from './table/data-components/table.raw-data.component';
import {TableItemsDataComponent} from './table/data-components/table.items-data.component';
import {TableHeadBaseComponent} from './table/head/elements/table.head.base.component';
import {TableHeadSortableComponent} from './table/head/elements/table.head.sortable.component';

@NgModule({
    imports: [
        CommonModule,
        NgbPaginationModule,
        FormsModule
    ],

    providers: [],

    declarations: [
        TableComponent,
        TableBodyComponent,
        TableHeadComponent,
        TableRowComponent,
        TableDataComponent,
        DataContainerDirective,
        TableRawDataComponent,
        TableItemsDataComponent,
        TableHeadBaseComponent,
        TableHeadSortableComponent,

        SearchBarComponent
    ],

    exports: [
        CommonModule,
        TableComponent,
        FormsModule,
        SearchBarComponent
    ],

    entryComponents: [
        TableRawDataComponent,
        TableItemsDataComponent,
        TableHeadBaseComponent,
        TableHeadSortableComponent
    ],

    bootstrap: []
})
export class SharedModule {

}