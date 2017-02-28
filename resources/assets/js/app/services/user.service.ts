import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {SortItem} from './page/SortItem';

@Injectable()
export class UserService {
    constructor(private restangular: Restangular) {
    }

    public getAll(page: number, sort: SortItem) {
        let obj:any = {page: page};
        if(sort && !sort.isDefault()) {
            obj.orderBy = sort.prop;
            obj.orderDir= sort.getDir();
        }
        return this.all()
            .getList(obj)
            .map(data => data.data);
    }

    private all() {
        return this.restangular.all('users');
    }
}
