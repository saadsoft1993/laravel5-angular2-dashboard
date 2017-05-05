import {Component, Input} from '@angular/core';
import {ErrorHandlerService} from '../../core/services/error-handler.service';
import {GetData} from '../../core/services/page/GetData';
import {PageMeta} from '../../core/services/page/PageMeta';
import {PageSource} from '../../core/services/page/PageSource';
import {PageService} from '../../core/services/page/page.service';
import {SortItem} from '../../core/services/page/SortItem';
import {ColumnSettings} from './helpers/ColumnSettings';
import {Model} from '../../core/Model';

@Component({
    selector: 'app-table',
    templateUrl: './table.html',
    providers: []
})

export class TableComponent {

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
    @Input() public pageTag = '';

    /**
     * Service used to retrieve data
     */
    @Input() public pageService: PageService;

    private meta: PageMeta;
    private dataSource: PageSource;
    private models: [Model];

    constructor(private errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.dataSource = this.pageService.createObject(this.pageTag);
        this.meta = this.dataSource.getMeta();
        this.dataSource.getDataSource().subscribe(data => this.models = data, err => this.errorHandler.handle(err, 'Error'));
        this.onPage();
    }

    onPage(page?: number) {
        this.dataSource.getPage(page);
    }

    onSort(sortItem: SortItem) {
        this.dataSource.getSorted(sortItem);
    }

    onSearch(query: string) {
        this.dataSource.getSearch(query);
    }
}