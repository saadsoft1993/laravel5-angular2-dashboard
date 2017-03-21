import {Component, Input, ContentChildren, ViewChildren, QueryList, ViewContainerRef} from '@angular/core';
import {ErrorHandler} from '../../core/services/error-handler.service';
import {StateService} from 'ui-router-ng2';
import {GetData} from '../../core/services/page/GetData';
import {PageMeta} from '../../core/services/page/PageMeta';
import {PageSource} from '../../core/services/page/PageSource';
import {PageService} from '../../core/services/page/page.service';
import {SortItem} from '../../core/services/page/SortItem';
import {ColumnSettings} from './helpers/ColumnSettings';
import {ContentChild, ViewChild} from '@angular/core/src/metadata/di';

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
    @Input() public columns: ColumnSettings[];

    /**
     * URL parameter / PageSource object key in PageService
     */
    @Input() public pageTag: string;

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

        this.dataSource = this.pageService.createObject(this.pageTag, this.getData, this.pageUrl);
        this.meta = this.dataSource.getMeta();
        this.dataSource.getDataSource().subscribe(data => this.rows = data, err => this.errorHandler.handle(err, 'Error'))
        this.onPage();
    }

    onPage(page?:number) {
        this.dataSource.getPage(page);
    }

    onSort(sortItem: SortItem) {
        this.dataSource.getSorted(sortItem);
    }

    onSearch(query:string) {
        this.dataSource.getSearch(query);
    }
}