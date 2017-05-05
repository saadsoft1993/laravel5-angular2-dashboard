import {Observable} from 'rxjs';
import {SortItem} from './SortItem';

export class GetDataParams {
    page: number;
    tag: string;
    perPage?: number;
    sort?: SortItem;
    query?: string;

    constructor(data: any) {
        this.page = data.page;
        this.tag = data.tag;
        this.perPage = data.perPage;
        this.sort = data.sort;
        this.query = data.query;
    }

    getQueryData() {

        let data: any = {
            page: this.page,
            perPage: this.perPage,
            query: this.query
        };
        if (this.sort) {
            data.orderBy = this.sort.prop;
            data.orderDir = this.sort.getDir();
        }
        return {params: data};
    }
}

export interface GetData {
    (params: GetDataParams): Observable<any[]>
}
