import {Observable} from 'rxjs';
import {SortItem} from './SortItem';

export interface GetDataParams {
    page: number,
    perPage?: number,
    sort?: SortItem,
    query?: string
}

export interface GetData {
    (params: GetDataParams): Observable<any[]>
}
