import {Subject, Observable} from 'rxjs';
import {SortItem} from './SortItem';
import {GetData, GetDataParams} from './GetData';
import {PageMeta} from './PageMeta';
import {Router} from '@angular/router';

export class PageSource {
    private items: any;
    private sortSource: any;
    private searchSource: any;
    private meta: PageMeta = new PageMeta;
    private sort: SortItem;
    private pageStream = new Subject<number>();
    private query: string;

    constructor(private tag: string, private getData: GetData) {
        this.sortSource = new Subject<SortItem>()
            .debounceTime(100)
            .map(sortItem => {
                this.sort = sortItem;
                return this.getParams();
            });

        this.searchSource = new Subject<string>()
            .debounceTime(300)
            .map(query => {
                this.query = query;
                return this.getParams();
            });

        this.items = this.pageStream
            .map(page => {
                this.meta.page = page;
                return this.getParams();
            })
            .merge(this.sortSource, this.searchSource)
            .mergeMap(params => this.getData(params))
            .share();
    }

    private getParams(): GetDataParams {
        return new GetDataParams({tag: this.tag, sort: this.sort, page: this.meta.page, query: this.query});
    }

    setMeta(data: any) {
        this.meta.set(data);
    }

    getPage(page: number) {
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
