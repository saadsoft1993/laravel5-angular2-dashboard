import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {StateService} from 'ui-router-ng2';
export class PageMeta {
    public page: number;
    public total: number;
    public perPage: number;

    public set(meta: any) {
        this.perPage = meta.per_page;
        this.total = meta.total;
        this.page = meta.current_page;
    }
}

export class PageSource {
    private items: any;
    private meta: PageMeta = new PageMeta;

    constructor(private tag: string, private getData: GetData, private state: StateService, private pageUrl: boolean) {
        this.items = new Subject<number>().mergeMap(page => this.getData(page)).share();
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
        this.items.next(page);
    }

    getMeta() {
        return this.meta;
    }

    public getDataSource(): Observable<any> {
        return this.items;
    }
}


export interface GetData {
    (page: number, perPage?: number): Observable<any[]>
}

@Injectable()
export class PageService {

    constructor(private state: StateService) {
    }

    getObject(tag: string, getData: GetData, pageUrl: boolean) {
        return new PageSource(tag, getData, this.state, pageUrl);
    }
}