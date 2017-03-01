import {Observable} from 'rxjs';
import {SortItem} from './SortItem';

export interface GetData {
    (page: number, perPage?: number, sort?: SortItem): Observable<any[]>
}
