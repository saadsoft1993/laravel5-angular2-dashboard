import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {CrudService} from '../core/services/crud.service';
import {PageService} from '../core/services/page/page.service';
import {User} from './user.model';

@Injectable()
export class UserService extends CrudService {
    protected readonly url: string = 'users';

    constructor(http: Http, protected router: Router) {
        super(http, router);
    }

    protected makeModel(data:any):User {
        return new User().load(data);
    }
}
