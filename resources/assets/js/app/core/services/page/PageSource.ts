import {StateService} from 'ui-router-ng2';
import {Subject, Observable} from 'rxjs';
import {SortItem} from './SortItem';
import {GetData} from './GetData';
import {PageMeta} from './PageMeta';

export class PageSource {
    private items: any;
    private sortSource: any;
    private searchSource: any;
    private meta: PageMeta = new PageMeta;
    private sort: SortItem;
    private pageStream = new Subject<number>();
    private query: string;

    constructor(private tag: string, private getData: GetData, private state: StateService, private pageUrl: boolean) {
        this.sortSource = new Subject<SortItem>()
            .debounceTime(100)
            .map(sortItem => {
                this.sort = sortItem;
                return {sort: sortItem, page: 1, query: this.query};
            });

        this.searchSource = new Subject<string>()
            .map(query => {
                this.query = query;
                return {sort: this.sort, page: 1, query: query}
            });

        this.items = this.pageStream
            .map(page => {
                this.meta.page = page;
                return {sort: this.sort, page: page, query: this.query};
            })
            .merge(this.sortSource, this.searchSource)
            .mergeMap(params => this.getData(params))
            .share();

        this.items.subscribe(data => {
            this.meta.set(data._meta);
            if (this.pageUrl) {
                let params = this.state.params;
                params[this.tag] = this.meta.page;
                this.state.transitionTo(this.state.current, params, {
                    inherit: true,
                    notify: true,
                })
            }
        });
    }

    getPage(page: number) {
        if (!this.meta.total && this.pageUrl) {
            page = this.state.params[this.tag] || 1
        }
        page = page || 1;
        this.pageStream.next(page);
    }

    getSorted(dir: SortItem) {
        this.sortSource.next(dir);
    }

    getSearch(query: string) {
        this.searchSource.next(query);
    }

    getMeta() {
        return this.meta;
    }

    public getDataSource(): Observable<any> {
        return this.items;
    }
}
