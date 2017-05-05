import {Component, OnInit} from '@angular/core';
import {TableBaseDataComponent} from './table.base-data.component';
import {CrudService} from '../../../core/services/crud.service';

@Component({
    selector: 'app-table-items-data',
    templateUrl: './table.items-data.html',
    providers: []
})

export class TableItemsDataComponent extends TableBaseDataComponent implements OnInit {

    private crudService:CrudService;

    ngOnInit() {
        this.crudService = this.injector.get(this.model.service);
    }

    // c(a) {
    //     console.log(a);
    // }

    remove() {
        let c = d => console.log(123);
        let e = d => console.log(4434);
        this.crudService.remove(this.model)/*.subscribe(c, e);*/
        // this.crudService.remove(this.model).subscribe((a) => {console.log(a)})
    }

    edit() {

    }
}