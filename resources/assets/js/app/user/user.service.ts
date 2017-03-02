import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {GetDataParams} from '../core/services/page/GetData';
import {Observable} from 'rxjs';
import {User} from './user.model';

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

    public create(user: User) {
        return this.all()
            .post(user)
            .map(response => response.body ? response.json() : true)
            .catch(error => Observable.throw(error.json()));

    }

    private all() {
        return this.restangular.all('users');
    }
}
