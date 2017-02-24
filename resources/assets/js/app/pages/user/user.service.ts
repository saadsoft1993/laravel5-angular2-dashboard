import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';

@Injectable()
export class UserService {
    constructor(private restangular: Restangular) {
    }

    public getAll(page: number) {
        return this.all()
            .getList({page: page})
            .map(data => data.data);
    }

    private all() {
        return this.restangular.all('users');
    }
}
