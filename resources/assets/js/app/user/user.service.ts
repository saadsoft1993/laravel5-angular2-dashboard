import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {GetDataParams} from '../core/services/page/GetData';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
    constructor(private restangular: Restangular) {
    }

    public getAll(params: GetDataParams): Observable<any> {
        let obj: any = {page: params.page};

        if (params.sort && !params.sort.isDefault()) {
            obj.orderBy = params.sort.prop;
            obj.orderDir = params.sort.getDir();
        }

        if (params.query) {
            obj.query = params.query;
        }

        return this.all()
            .getList(obj)
            .map(data => data.data);
    }

    private all() {
        return this.restangular.all('users');
    }
}
