import {Component, Input} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';
import {ErrorHandler} from '../../services/error-handler.service';
import {PageService, GetData, PageMeta} from '../../services/page.service';
import {StateService} from 'ui-router-ng2';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    providers: []
})

export class TableComponent<T> {
    @Input() public css_class: string = 'table table-striped';
    @Input() public columns: ColumnData[];
    @Input() public pageTag: string;
    @Input() public getData: GetData;
    public meta: PageMeta;
    private dataSource;
    private rows: T[];

    constructor(private errorHandler: ErrorHandler, private pageService: PageService, private state:StateService) {
    }

    ngOnInit() {
        this.dataSource = this.pageService.addObject(this.pageTag, this.getData);
        this.meta = this.dataSource.getMeta();
        this.dataSource.getDataSource().subscribe(data => this.rows = data, err => this.errorHandler.handle(err, 'Error'))
    }

    onPage(page) {

        if(!this.meta.total) {
            page = this.state.params[this.pageTag] || 1
        }
        this.dataSource.getPage(page);
    }
}