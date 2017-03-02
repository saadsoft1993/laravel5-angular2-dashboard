import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {TableComponent} from './table/table.component';
import {TableBodyComponent} from './table/table.body.component';
import {TableHeadComponent} from './table/table.head.component';
import {TableRowComponent} from './table/table.row.component';
import {SearchBarComponent} from './search-bar/search-bar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbPaginationModule,
        FormsModule
    ],

    providers: [
    ],

    declarations: [
        TableComponent,
        TableBodyComponent,
        TableHeadComponent,
        TableRowComponent,

        SearchBarComponent
    ],

    exports: [
        CommonModule,
        TableComponent,
        FormsModule,
        SearchBarComponent
    ],

    bootstrap: [

    ]
})
export class SharedModule {

}