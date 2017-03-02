import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {Observable} from 'rxjs';
import {User} from '../../user/user.model';

@Injectable()
export class RegisterService {
    constructor(private restangular: Restangular) {
    }

    public register(user: User): Observable<any> {
        return this.all()
            .post(user)
            .map(response => response.body ? response.json() : true)
            .catch(error => Observable.throw(error.json()));
    }

    private all() {
        return this.restangular.all('register');
    }
}
