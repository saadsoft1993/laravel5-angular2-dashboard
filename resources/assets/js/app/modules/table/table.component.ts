import {Component, Input} from '@angular/core';
import {ColumnData} from './helpers/ColumnData';
import {ErrorHandler} from '../../services/error-handler.service';
import {PageService, GetData, PageMeta, PageSource} from '../../services/page/page.service';
import {StateService} from 'ui-router-ng2';
import {SortItem} from '../../services/page/SortItem';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    providers: []
})

export class TableComponent<T> {

    /**
     * class of the <table> element
     * @type {string}
     */
    @Input() public css_class: string = 'table table-striped';

    /**
     * Array of table columns
     */
    @Input() public columns: ColumnData[];

    /**
     * URL parameter
     */
    @Input() public pageTag?: string;

    /**
     * Callback used to retrieve data
     */
    @Input() public getData: GetData;

    /**
     *
     * @type {boolean}
     */
    @Input() public pageUrl: boolean = false;

    private meta: PageMeta;
    private dataSource: PageSource;
    private rows: T[];

    constructor(private errorHandler: ErrorHandler, private pageService: PageService, private state: StateService) {
    }

    ngOnInit() {
        this.dataSource = this.pageService.getObject(this.pageTag, this.getData, this.pageUrl);
        this.meta = this.dataSource.getMeta();
        this.dataSource.getDataSource().subscribe(data => this.rows = data, err => this.errorHandler.handle(err, 'Error'))
    }

    onPage(page) {
        if (!this.meta.total && this.pageUrl) {
            page = this.state.params[this.pageTag] || 1
        }
        page = page || 1;
        this.dataSource.getPage(page);
    }

    onSort(sortItem: SortItem) {
        this.dataSource.getSorted(sortItem);
    }
}