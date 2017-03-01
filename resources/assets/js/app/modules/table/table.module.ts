import {NgModule}      from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {TableHeadComponent} from './table.head.component';
import {TableBodyComponent} from './table.body.component';
import {TableRowComponent} from './table.row.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {PageService} from '../paginator/page.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbPaginationModule,
        RouterModule
    ],

    declarations: [
        TableComponent,
        TableHeadComponent,
        TableBodyComponent,
        TableRowComponent
    ],

    exports: [
      TableComponent
    ],

    providers: [
        PageService
    ],

    bootstrap: [
    ]
})
export class TableModule {

}